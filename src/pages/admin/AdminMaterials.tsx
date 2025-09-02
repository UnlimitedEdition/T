// src/pages/admin/AdminMaterials.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // 🔥 OBAVEZNO: dodaj ovaj import
import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Upload, X } from "lucide-react";

export default function AdminMaterials() {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_m2: "",
    image: null as File | null,
    image_url: ""
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće učitati materijale.",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Proveri veličinu
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Prevelika slika",
        description: "Slika mora biti manja od 2MB.",
        variant: "destructive"
      });
      return;
    }

    setFormData({ ...formData, image: file });
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!formData.image) return formData.image_url;

    const fileName = `material-${Date.now()}-${formData.image.name}`;
    const { error } = await supabase.storage
      .from('materials')
      .upload(fileName, formData.image);

    if (error) {
      console.error("Upload error:", error);
      toast({
        title: "Greška",
        description: "Nije moguće uploadovati sliku.",
        variant: "destructive"
      });
      return null;
    }

    // ✅ Ispravljen URL – BEZ RAZMAKA!
    const url = `https://qjxljjgmolsbfpjeigbu.supabase.co/storage/v1/object/public/materials/${fileName}`;
    return url;
  };

  const handleSave = async () => {
    const uploadedUrl = await uploadImage();
    if (!uploadedUrl) return;

    const payload = {
      name: formData.name,
      description: formData.description,
      price_per_m2: parseFloat(formData.price_per_m2) || 0,
      image_url: uploadedUrl
    };

    try {
      if (editId) {
        await updateMaterial(editId, payload);
        toast({ title: "Ažurirano" });
      } else {
        await createMaterial(payload);
        toast({ title: "Dodato" });
      }

      setEditId(null);
      setFormData({
        name: "",
        description: "",
        price_per_m2: "",
        image: null,
        image_url: ""
      });
      load();
    } catch (err: any) {
      toast({
        title: "Greška",
        description: err.message || "Nije moguće sačuvati materijal.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (m: any) => {
    setEditId(m.id);
    setFormData({
      name: m.name,
      description: m.description || "",
      price_per_m2: m.price_per_m2.toString(),
      image: null,
      image_url: m.image_url || ""
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Obrisati materijal?")) {
      await deleteMaterial(id);
      toast({ title: "Obrisano" });
      load();
    }
  };

  const handleAdd = () => {
    setEditId(null);
    setFormData({
      name: "",
      description: "",
      price_per_m2: "",
      image: null,
      image_url: ""
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Materijali</h2>
        <Button onClick={handleAdd}>+ Dodaj novi</Button>
      </div>

      <div className="bg-card p-6 rounded-lg border mb-8">
        <h3 className="text-lg font-semibold mb-4">{editId ? "Izmeni materijal" : "Dodaj materijal"}</h3>
        <div className="space-y-4">
          <Input
            placeholder="Naziv"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            placeholder="Opis"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Cena po m²"
            value={formData.price_per_m2}
            onChange={(e) => setFormData({ ...formData, price_per_m2: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Slika</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-accent file:text-foreground
                  hover:file:bg-accent/80"
              />
              {formData.image_url && (
                <div className="relative">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: "", image: null })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center p-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            {editId ? "Sačuvaj izmene" : "Dodaj materijal"}
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Slika</TableHead>
            <TableHead>Naziv</TableHead>
            <TableHead>Cena (RSD/m²)</TableHead>
            <TableHead>Akcije</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((m) => (
            <TableRow key={m.id}>
              <TableCell>
                {m.image_url && (
                  <img
                    src={m.image_url}
                    alt={m.name}
                    className="w-10 h-10 object-cover rounded border"
                  />
                )}
              </TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.price_per_m2}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => handleEdit(m)}>
                  Izmeni
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id)}>
                  Obriši
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}