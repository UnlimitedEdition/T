import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Home, Building, Thermometer, Droplets } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMaterials, type Material } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Materijali = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };
    loadMaterials();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Učitavanje materijala...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Materijali za vaše table
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Birajte između različitih materijala prema vašim potrebama i estetskim preferencijama
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {materials.map((material) => (
            <Card 
              key={material.id} 
              className={`relative overflow-hidden hover:shadow-elegant transition-all duration-300 ${
                material.popular ? 'ring-2 ring-accent/50' : ''
              }`}
            >
              {material.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-accent text-accent-foreground">
                    Najpopularniji
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground mb-2">
                      {material.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {material.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Material preview */}
                <div className="relative h-32 bg-gradient-wood rounded-lg overflow-hidden">
                  {material.image_url ? (
                    <img
                      src={material.image_url}
                      alt={material.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
                      }}
                    />
                  ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
                  Nema slike
              </div>
            )}
            {/* Debljina */}
            <div className="absolute bottom-2 right-2 bg-background/80 text-xs font-bold px-2 py-1 rounded text-foreground">
              {material.thickness_options[0]}mm
            </div>
          </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Debljina:</span>
                    <div className="font-medium">
                      {material.thickness_options.join(", ")}mm
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cena:</span>
                    <div className="font-bold text-primary">
                      {material.price_per_m2.toLocaleString()} RSD/m²
                    </div>
                  </div>
                </div>

                {/* Usage indicators */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className={`flex items-center space-x-1 ${
                    material.indoor_outdoor.includes('unutrašnja') ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    <Home className="w-4 h-4" />
                    <span>Unutrašnja</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    material.indoor_outdoor.includes('spoljašnja') ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    <Building className="w-4 h-4" />
                    <span>Spoljašnja</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Karakteristike:</span>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="text-foreground">Glatka površina</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="text-foreground">Lako čišćenje</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="text-foreground">Klasičan dizajn</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="text-foreground">Ekonomičan</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant={material.popular ? "hero" : "premium"} 
                  className="w-full"
                  onClick={() => navigate(`/konfigurator?materialId=${material.id}`)}
                >
                  Izaberi {material.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Material comparison note */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-wood/20 border-gold/30">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-4 text-center">
                Potrebna pomoć pri izboru materijala?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <Thermometer className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Spoljašnja upotreba</h4>
                  <p className="text-muted-foreground">Preporučujemo akril ili metal za dugotrajnost</p>
                </div>
                <div className="text-center">
                  <Droplets className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-1">LED osvetljenje</h4>
                  <p className="text-muted-foreground">Akril je najbolji izbor za svetleće table</p>
                </div>
                <div className="text-center">
                  <Home className="w-8 h-8 text-gold mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Unutrašnja upotreba</h4>
                  <p className="text-muted-foreground">Svi materijali su pogodni, lesonit je ekonomičan</p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="accent" onClick={() => navigate("/konfigurator")}>
                  Kontaktiraj nas za savet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Materijali;