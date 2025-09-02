// src/pages/Recenzija.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const Recenzija = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rating || !comment) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva obavezna polja.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl = null;

      // Upload slike ako postoji
      if (photo) {
        const fileName = `review-${Date.now()}-${photo.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reviews')
          .upload(fileName, photo);

        if (uploadError) {
          console.error("Upload greška:", uploadError);
          throw uploadError;
        }

        photoUrl = `https://qjxljjgmolsbfpjeigbu.supabase.co/storage/v1/object/public/reviews/${fileName}`;
      }

      // Sačuvaj recenziju u bazu
      const { error: dbError } = await supabase
        .from('reviews')
        .insert([
          { customer_name: name, rating, comment, photo_url: photoUrl, verified: false }
        ]);

      if (dbError) {
        console.error("Baza greška:", dbError);
        throw dbError;
      }

      toast({
        title: "Hvala na recenziji!",
        description: "Vaša recenzija je uspešno poslata i čeka vašu verifikaciju.",
      });

      // Resetuj formu
      setName("");
      setRating(0);
      setComment("");
      setPhoto(null);
    } catch (error) {
      console.error("Full error:", error);
      toast({
        title: "Greška",
        description: `Došlo je do greške: ${error.message || "Pokušajte ponovo."}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Ocenite naš rad</h1>
        <p className="text-muted-foreground mb-6">
          Vaše mišljenje nam pomaže da poboljšamo usluge. Hvala što delite svoje iskustvo!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Ime i prezime *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vaše ime i prezime"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Ocena *</label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-muted-foreground hover:text-yellow-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Komentar *</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Opisite svoje iskustvo sa našim proizvodima i uslugama..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Slika rada (opcionalno)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Slanje...
              </>
            ) : (
              "Pošalji recenziju"
            )}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Recenzija;