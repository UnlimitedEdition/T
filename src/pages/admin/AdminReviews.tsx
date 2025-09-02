// src/pages/admin/AdminReviews.tsx
import { useState, useEffect } from "react";
import { getAdminReviews, updateReview, deleteReview } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function AdminReviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getAdminReviews();
    setReviews(data);
  };

  const handleToggle = async (id: number, verified: boolean) => {
    await updateReview(id, { verified });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, verified } : r));
    toast({ title: "Recenzija ažurirana" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Obrisati recenziju?")) {
      await deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
      toast({ title: "Recenzija obrisana" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recenzije</h2>
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="border p-4 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="font-medium">{r.customer_name} ★{r.rating}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{r.comment}</p>
              {r.photo_url && (
                <img src={r.photo_url} alt="Review" className="w-20 h-20 object-cover rounded mt-2" />
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Prikaži</span>
                <Switch checked={r.verified} onCheckedChange={(v) => handleToggle(r.id, v)} />
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(r.id)}>
                Obriši
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}