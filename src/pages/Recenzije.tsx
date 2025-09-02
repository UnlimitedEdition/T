import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getReviews, type Review } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Star, Quote, Verified } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Recenzije = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await getReviews(6); // Limit to 6 reviews
        setReviews(reviewsData);
      } catch (error) {
        toast({
          title: "Greška",
          description: "Nije moguće učitati recenzije.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, [toast]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <section className="py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Quote className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Recenzije naših klijenata
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Pročitajte šta kažu naši zadovoljni klijenti o kvalitetu naših proizvoda i usluga
            </p>

            {!isLoading && reviews.length > 0 && (
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-2xl font-bold text-primary">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({reviews.length} recenzij{reviews.length === 1 ? "a" : reviews.length < 5 ? "e" : "a"})
                </span>
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <Card key={i} className="shadow-elegant animate-pulse">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-wood/20 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gradient-wood/20 rounded w-3/4"></div>
                          <div className="h-3 bg-gradient-wood/10 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gradient-wood/10 rounded w-full"></div>
                        <div className="h-4 bg-gradient-wood/10 rounded w-5/6"></div>
                        <div className="h-4 bg-gradient-wood/10 rounded w-4/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="shadow-elegant hover:shadow-glow transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-wood text-primary font-semibold">
                            {getInitials(review.customer_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">
                              {review.customer_name}
                            </h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Verified className="w-3 h-3 mr-1" />
                                Verifikovano
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-accent/30 transform rotate-180" />
                        <p className="text-muted-foreground italic pl-4 mb-4 leading-relaxed">
                          "{review.comment}"
                        </p>
                      </div>

                      {review.photo_url && (
                        <div className="mt-4">
                          <img
                            src={review.photo_url}
                            alt="Fotografija rada"
                            className="w-full h-32 object-cover rounded-lg border border-border/50"
                          />
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString("sr-RS", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Recenzije;