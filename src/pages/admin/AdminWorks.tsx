// src/pages/admin/AdminWorks.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getWorks, createWork, updateWork, deleteWork, getMaterials, type Material } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AdminWorks() {
  const { toast } = useToast();
  const [works, setWorks] = useState<any[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dimensions: "",
    has_led: false,
    tags: "",
    images: [] as string[],
    material_id: "" // ✅ Dodato
  });

  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    loadWorks();
    loadMaterials();
  }, []);

  const loadWorks = async () => {
    const data = await getWorks();
    setWorks(data);
  };

  const loadMaterials = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće učitati materijale.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (work: any) => {
    setEditId(work.id);
    setFormData({
      title: work.title,
      description: work.description || "",
      dimensions: work.dimensions || "",
      has_led: work.has_led,
      tags: Array.isArray(work.tags) ? work.tags.join(", ") : "",
      images: Array.isArray(work.images) ? work.images : [],
      material_id: work.material_id?.toString() || "" // ✅ Postavi ID
    });
    setFiles([]);
  };

  const handleAddNew = () => {
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      dimensions: "",
      has_led: false,
      tags: "",
      images: [],
      material_id: ""
    });
    setFiles([]);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Obrisati ovaj rad?")) {
      await deleteWork(id);
      toast({ title: "Rad obrisan" });
      loadWorks();
    }
  };

  // Upload fajlova u Supabase Storage
  const uploadFiles = async (): Promise<string[]> => {
    if (files.length === 0) return formData.images;

    setUploading(true);
    const uploadedUrls: string[] = [...formData.images];

    for (const file of files) {
      // ✅ Provera veličine
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Prevelika slika",
          description: `${file.name} je veća od 2MB. Molimo komprimujte sliku.`,
          variant: "destructive"
        });
        continue;
      }

      const fileName = `work-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        toast({
          title: "Greška",
          description: `Nije uspeo upload: ${file.name}`,
          variant: "destructive"
        });
      } else {
        // ✅ Ispravljen URL – BEZ RAZMAKA!
        const url = `https://qjxljjgmolsbfpjeigbu.supabase.co/storage/v1/object/public/gallery-images/${fileName}`;
        uploadedUrls.push(url);
      }
    }

    setUploading(false);
    return uploadedUrls;
  };

  const handleSave = async () => {
    const finalImages = await uploadFiles();
    if (uploading) return;

    // ✅ Proveri da li je izabran materijal
    if (!formData.material_id) {
      toast({
        title: "Greška",
        description: "Molimo izaberite materijal.",
        variant: "destructive"
      });
      return;
    }

    const payload = {
      ...formData,
      has_led: !!formData.has_led,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      images: finalImages,
      material_id: parseInt(formData.material_id) // ✅ Pošalji kao broj
    };

    try {
      if (editId) {
        await updateWork(editId, payload);
        toast({ title: "Rad ažuriran" });
      } else {
        await createWork(payload);
        toast({ title: "Rad dodat" });
      }

      setEditId(null);
      setFormData({
        title: "",
        description: "",
        dimensions: "",
        has_led: false,
        tags: "",
        images: [],
        material_id: ""
      });
      setFiles([]);
      loadWorks();
    } catch (err) {
      toast({
        title: "Greška",
        description: "Nije moguće sačuvati rad.",
        variant: "destructive",
      });
    }
  };

  const removeImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Galerija radova</h2>
        <Button onClick={handleAddNew}>+ Dodaj novi rad</Button>
      </div>

      {/* Forma za dodavanje/izmenu */}
      <div className="bg-card p-6 rounded-lg border mb-8">
        <h3 className="text-lg font-semibold mb-4">{editId ? "Izmeni rad" : "Dodaj novi rad"}</h3>
        <div className="space-y-4">
          <Input
            placeholder="Naslov"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            placeholder="Opis"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Input
            placeholder="Dimenzije (npr. 300x150mm)"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
          />

          {/* ✅ IZBOR MATERIJALA */}
          <div>
            <label className="block text-sm font-medium mb-2">Materijal</label>
            <Select value={formData.material_id} onValueChange={(value) => setFormData({ ...formData, material_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Izaberite materijal" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((m) => (
                  <SelectItem key={m.id} value={m.id.toString()}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="has_led"
              checked={formData.has_led}
              onChange={(e) => setFormData({ ...formData, has_led: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="has_led">LED osvetljenje</label>
          </div>

          <Input
            placeholder="Tagovi (razdvojene zarezom: tabla, led, akril...)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />

          {/* Upload slika */}
          <div>
            <label className="block text-sm font-medium mb-2">Slike za rad</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-accent file:text-foreground
                hover:file:bg-accent/80"
            />
            <p className="text-xs text-muted-foreground mt-1">Možete dodati više slika.</p>
          </div>

          {/* Upload progress */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Slike za upload:</p>
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                  <span>{file.name}</span>
                  <Button type="button" size="xs" variant="ghost" onClick={() => removeFile(i)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Existing images */}
          {formData.images.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploadovane slike:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={url}
                      alt={`Slika ${i + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                      onClick={() => removeImage(url)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="w-full" disabled={uploading}>
            {uploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Upload u toku...
              </>
            ) : editId ? (
              "Sačuvaj izmene"
            ) : (
              "Dodaj rad"
            )}
          </Button>
        </div>
      </div>

      {/* Lista radova */}
      <div className="space-y-4">
        {works.map((work) => {
          const materialName = materials.find(m => m.id === work.material_id)?.name || "Nepoznato";
          return (
            <div key={work.id} className="border p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-medium">{work.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {work.dimensions} • {materialName} • {Array.isArray(work.tags) ? work.tags.join(", ") : work.tags}
                  </p>
                  {work.has_led && <Badge className="mt-1">LED</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(work)}>
                    Izmeni
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(work.id)}>
                    Obriši
                  </Button>
                </div>
              </div>

              {/* Mini preview slika */}
              {work.images && work.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {work.images.slice(0, 3).map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Preview ${i}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))}
                  {work.images.length > 3 && (
                    <div className="w-16 h-16 bg-muted flex items-center justify-center rounded border text-sm">
                      +{work.images.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Dodaj manuelno ako ti fali
const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground ${className}`}>
    {children}
  </span>
);