// src/pages/Galerija.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWorks, type Work } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface GalleryItem {
  id: number;
  title: string;
  images: string[];
  material: string;
  dimensions: string;
  hasLED: boolean;
  category: string;
}

const Galerija = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const filters = [
    { value: "all", label: "Svi radovi" },
    { value: "tabla", label: "Table" },
    { value: "privezak", label: "Privesci" },
    { value: "lesonit-beli", label: "Lesonit beli" },
    { value: "akril", label: "Akril" },
    { value: "metal", label: "Metal" },
    { value: "led", label: "Sa LED" },
  ];

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const worksData = await getWorks();
        const mappedItems = worksData.map((work): GalleryItem => {
          const materialName = work.materials?.name || "Nepoznato";
          const images = Array.isArray(work.images) && work.images.length > 0
            ? work.images
            : ["/api/placeholder/400/300"];

          return {
            id: work.id,
            title: work.title,
            images,
            material: materialName,
            dimensions: work.dimensions || "Nepoznato",
            hasLED: work.has_led,
            category: work.tags?.includes("privezak") ? "privezak" : "tabla"
          };
        });
        setGalleryItems(mappedItems);
      } catch (error) {
        toast({
          title: "Greška",
          description: "Nije moguće učitati galeriju radova.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, [toast]);

  const filteredItems = galleryItems.filter(item => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "led") return item.hasLED;
    if (["lesonit-beli", "akril", "metal"].includes(selectedFilter)) {
      return item.material.toLowerCase().includes(selectedFilter.replace("-", " "));
    }
    return item.category === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <section id="galerija">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Galerija naših radova
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pogledajte našu kolekciju personalizovanih tabli i privezaka
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="transition-all duration-300"
              >
                {filter.value === "all" ? <Filter className="w-4 h-4 mr-2" /> : null}
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="group overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Pogledaj
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {item.material}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.dimensions}
                      </Badge>
                      {item.hasLED && (
                        <Badge variant="default" className="text-xs bg-gradient-accent">
                          LED
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nema rezultata za izabrani filter.</p>
            </div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="premium" size="lg">
              Učitaj još radova
            </Button>
          </div>

          {/* Modal for detailed view */}
          {selectedItem && (
            <div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto">
                <CardContent className="p-6">
                  <div className="aspect-[4/3] mb-4">
                    <img
                      src={selectedItem.images[0]}
                      alt={selectedItem.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
                      }}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">{selectedItem.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Materijal:</span>
                        <div className="font-medium">{selectedItem.material}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Dimenzije:</span>
                        <div className="font-medium">{selectedItem.dimensions}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Kategorija:</span>
                        <div className="font-medium capitalize">{selectedItem.category}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">LED osvetljenje:</span>
                        <div className="font-medium">{selectedItem.hasLED ? "Da" : "Ne"}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Link to={`/konfigurator?workId=${selectedItem.id}`} className="flex-1">
                        <Button variant="hero" className="w-full">
                          Poruči slično
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={() => setSelectedItem(null)}>
                        Zatvori
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Galerija;