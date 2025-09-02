// src/pages/admin/AdminFAQ.tsx
import { useState, useEffect } from "react";
import { getAdminFAQs, updateFAQ, createFAQ, deleteFAQ } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AdminFAQ() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "", category: "general" });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getAdminFAQs();
    setFaqs(data);
  };

  const handleEdit = (faq: any) => {
    setEditId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category });
  };

  const handleSave = async () => {
    if (editId) {
      await updateFAQ(editId, formData);
    } else {
      await createFAQ(formData);
    }
    toast({ title: "Sačuvano" });
    setEditId(null);
    setFormData({ question: "", answer: "", category: "general" });
    load();
  };

  const handleAdd = () => {
    setEditId(null);
    setFormData({ question: "", answer: "", category: "general" });
  };

  const handleDelete = async (id: number) => {
    await deleteFAQ(id);
    setFaqs(prev => prev.filter(f => f.id !== id));
    toast({ title: "Obrisano" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <Button onClick={handleAdd}>+ Dodaj pitanje</Button>
      </div>

      <div className="bg-card p-6 rounded-lg border mb-8">
        <h3 className="text-lg font-semibold mb-4">{editId ? "Izmeni pitanje" : "Dodaj novo pitanje"}</h3>
        <div className="space-y-4">
          <Input
            placeholder="Pitanje"
            value={formData.question}
            onChange={e => setFormData({ ...formData, question: e.target.value })}
          />
          <Textarea
            placeholder="Odgovor"
            value={formData.answer}
            onChange={e => setFormData({ ...formData, answer: e.target.value })}
            className="min-h-[100px]"
          />
          <Input
            placeholder="Kategorija (npr. general, pricing)"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          />
          <Button onClick={handleSave} className="w-full">
            {editId ? "Sačuvaj izmene" : "Dodaj pitanje"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map(f => (
          <div key={f.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{f.question}</h4>
                <p className="text-sm text-muted-foreground mt-1">{f.answer}</p>
                <span className="text-xs text-primary mt-2 inline-block">{f.category}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(f)}>Izmeni</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(f.id)}>Obriši</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}