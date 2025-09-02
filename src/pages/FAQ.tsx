// src/pages/FAQ.tsx
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFAQs, type FAQ } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const faqsData = await getFAQs();
        setFaqs(faqsData);
      } catch (error) {
        toast({
          title: "Greška",
          description: "Nije moguće učitati FAQ.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadFAQs();
  }, [toast]);

  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      all: "Svi",
      opšte: "Opšte",
      materijali: "Materijali", 
      tehnički: "Tehnički",
      personalizacija: "Personalizacija",
      cene: "Cene"
    };
    return labels[category] || category;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <HelpCircle className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Često postavljana pitanja
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pronađite odgovore na najčešće postavljena pitanja o našim proizvodima i uslugama
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer px-4 py-2 text-sm transition-all hover:shadow-elegant"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {getCategoryLabel(category)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {isLoading ? (
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <div className="space-y-4 animate-pulse">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="h-6 bg-gradient-wood/20 rounded w-3/4"></div>
                          <div className="h-4 bg-gradient-wood/10 rounded w-full"></div>
                          <div className="h-4 bg-gradient-wood/10 rounded w-5/6"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : filteredFaqs.length > 0 ? (
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {filteredFaqs.map((faq) => (
                        <AccordionItem 
                          key={faq.id} 
                          value={faq.id.toString()}
                          className="border border-border/50 rounded-lg px-6 py-2 transition-all hover:border-primary/30 hover:shadow-elegant/50"
                        >
                          <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                            <div className="flex items-center">
                              <MessageCircle className="w-5 h-5 mr-3 text-accent" />
                              {faq.question}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pt-4 pb-2 ml-8">
                            <div className="prose prose-sm max-w-none">
                              <p>{faq.answer}</p>
                            </div>
                            {faq.category && (
                              <Badge variant="outline" className="mt-3">
                                {getCategoryLabel(faq.category)}
                              </Badge>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-elegant">
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Nema pitanja u ovoj kategoriji.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;