// src/pages/Configurator.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Eye, Send, Loader2 } from "lucide-react";
import { getMaterials, calculatePrice, submitInquiry, getWorks, type Material, type Work } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ConfiguratorState {
  width: number;
  height: number;
  materialId: number | null;
  productType: string;
  model: string;
  ledLighting: boolean;
  ledType: '5V' | '220V';
}

const Configurator = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [config, setConfig] = useState<ConfiguratorState>({
    width: 300,
    height: 150,
    materialId: null,
    productType: "tabla",
    model: "single",
    ledLighting: false,
    ledType: "5V",
  });

  const [price, setPrice] = useState<number>(500);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  // Customer form data
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [message, setMessage] = useState('');

  // Load materials
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const materialsData = await getMaterials();
        setMaterials(materialsData);

        const materialIdFromUrl = searchParams.get("materialId")
          ? parseInt(searchParams.get("materialId")!)
          : null;

        if (materialIdFromUrl && materialsData.some(m => m.id === materialIdFromUrl)) {
          setConfig(prev => ({ ...prev, materialId: materialIdFromUrl }));
        } else if (!config.materialId && materialsData.length > 0) {
          setConfig(prev => ({ ...prev, materialId: materialsData[0].id }));
        }
      } catch (error) {
        toast({
          title: "Greška",
          description: "Nije moguće učitati materijale.",
          variant: "destructive",
        });
      }
    };
    loadMaterials();
  }, [toast, searchParams]);

  // 🔹 NOVO: Učitaj rad iz galerije ako je workId u URL-u
  useEffect(() => {
    const workId = searchParams.get("workId");
    if (!workId) return;

    const loadWorkAsTemplate = async () => {
      try {
        const works: Work[] = await getWorks();
        const work = works.find(w => w.id === parseInt(workId));

        if (!work) {
          toast({
            title: "Nije pronađen rad",
            description: "Rad sa tim ID-om ne postoji.",
            variant: "destructive",
          });
          return;
        }

        // Parse dimensions (format: "300x200")
        const [widthStr, heightStr] = (work.dimensions || "300x150").split('x').map(d => d.trim().replace(/\D/g, ''));
        const width = parseInt(widthStr) || 300;
        const height = parseInt(heightStr) || 150;

        setConfig(prev => ({
          ...prev,
          width,
          height,
          materialId: work.material_id,
          model: work.model_type as 'single' | 'double' | '3d_letters',
          ledLighting: !!work.has_led,
        }));

        // Obriši workId iz URL-a nakon što je obrađen (opcionalno)
        setSearchParams(prev => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("workId");
          return newParams;
        });

        toast({
          title: "Predloženi model učitan",
          description: `Zasnovano na radu: ${work.title}`,
        });
      } catch (error) {
        toast({
          title: "Greška",
          description: "Nije moguće učitati predlog iz galerije.",
          variant: "destructive",
        });
      }
    };

    loadWorkAsTemplate();
  }, [searchParams, setSearchParams, toast]);

  // Calculate price when parameters change
  useEffect(() => {
    if (!config.materialId || config.width < 10 || config.height < 10) return;

    const debouncedCalculate = setTimeout(async () => {
      setIsCalculating(true);
      try {
        const result = await calculatePrice({
          width_mm: config.width,
          height_mm: config.height,
          material_id: config.materialId,
          model_type: config.model,
          has_led: config.ledLighting,
        });
        setPrice(result.price);
      } catch (error) {
        toast({
          title: "Greška",
          description: "Nije moguće izračunati cenu.",
          variant: "destructive",
        });
      } finally {
        setIsCalculating(false);
      }
    }, 500);

    return () => clearTimeout(debouncedCalculate);
  }, [config.width, config.height, config.materialId, config.model, config.ledLighting, toast]);

  const handleSubmitInquiry = async () => {
    if (!customerName || !customerEmail || !config.materialId) {
      toast({
        title: "Greška",
        description: "Molimo unesite sve obavezne podatke.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitInquiry({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        material_id: config.materialId,
        width_mm: config.width,
        height_mm: config.height,
        model_type: config.model as 'single' | 'double' | '3d_letters',
        has_led: config.ledLighting,
        led_type: config.ledLighting ? config.ledType : undefined,
        calculated_price: price,
        message: message,
      });

      toast({
        title: "Uspešno poslato!",
        description: "Vaš upit je uspešno poslat. Kontaktiraćemo vas uskoro.",
      });

      setShowInquiryForm(false);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće poslati upit. Pokušajte ponovo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfigChange = (key: keyof ConfiguratorState, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const SVGPreview = () => {
    const svgWidth = Math.min(400, config.width * 0.8);
    const svgHeight = (config.height / config.width) * svgWidth;

    return (
      <div className="relative">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${config.width} ${config.height}`}
          className="border-2 border-dashed border-border rounded-lg bg-muted"
        >
          <rect
            x="10"
            y="10"
            width={config.width - 20}
            height={config.height - 20}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            rx="8"
          />

          <text
            x={config.width / 2}
            y={config.height / 2 - 10}
            textAnchor="middle"
            fontSize="24"
            fill="hsl(var(--primary))"
            fontWeight="bold"
          >
            PRIMER TEKSTA
          </text>

          <text
            x={config.width / 2}
            y={config.height / 2 + 20}
            textAnchor="middle"
            fontSize="14"
            fill="hsl(var(--muted-foreground))"
          >
            {config.width}mm × {config.height}mm
          </text>

          {config.ledLighting && (
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}

          {config.ledLighting && (
            <rect
              x="10"
              y="10"
              width={config.width - 20}
              height={config.height - 20}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              rx="8"
              filter="url(#glow)"
              opacity="0.8"
            />
          )}
        </svg>

        {config.ledLighting && (
          <div className="absolute inset-0 bg-accent/10 rounded-lg blur-sm pointer-events-none"></div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Konfigurator table
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kreirajte vašu personalizovanu tablu uz trenutni pregled i kalkulaciju cene
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Podešavanja
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Širina (mm)</Label>
                    <Input
                      id="width"
                      type="number"
                      min="50"
                      max="1000"
                      value={config.width}
                      onChange={(e) => handleConfigChange('width', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Visina (mm)</Label>
                    <Input
                      id="height"
                      type="number"
                      min="30"
                      max="500"
                      value={config.height}
                      onChange={(e) => handleConfigChange('height', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-2">
                  <Label>Materijal</Label>
                  <Select value={config.materialId?.toString()} onValueChange={(value) => handleConfigChange('materialId', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberite materijal" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id.toString()}>
                          {material.name} ({material.price_per_m2.toLocaleString()} RSD/m²)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Type */}
                <div className="space-y-2">
                  <Label>Tip proizvoda</Label>
                  <Select value={config.productType} onValueChange={(value) => handleConfigChange('productType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tabla">Tabla</SelectItem>
                      <SelectItem value="privezak">Privezak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <Label>Tip modela</Label>
                  <Select value={config.model} onValueChange={(value) => handleConfigChange('model', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Jedna tabla</SelectItem>
                      <SelectItem value="double">Dve table</SelectItem>
                      <SelectItem value="3d_letters">Jedna tabla + 3D slova</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LED Lighting */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>LED Osvetljenje</Label>
                      <div className="text-sm text-muted-foreground">5V/220V (+2500 RSD)</div>
                    </div>
                    <Switch
                      checked={config.ledLighting}
                      onCheckedChange={(checked) => handleConfigChange('ledLighting', checked)}
                    />
                  </div>

                  {config.ledLighting && (
                    <div className="space-y-2">
                      <Label>Tip LED napajanja</Label>
                      <Select value={config.ledType} onValueChange={(value: '5V' | '220V') => handleConfigChange('ledType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5V">5V (USB napajanje)</SelectItem>
                          <SelectItem value="220V">220V (direktno iz struje)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Display */}
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Procenjena cena:</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary flex items-center gap-2">
                        {isCalculating && <Loader2 className="h-5 w-5 animate-spin" />}
                        {price.toLocaleString()} RSD
                      </div>
                      {price === 500 && (
                        <div className="text-xs text-muted-foreground">Minimalna porudžbina</div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Cena je informativnog karaktera
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full" 
                    onClick={() => setShowInquiryForm(true)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Pošalji upit za ponudu
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Live pregled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center min-h-[400px] p-4">
                  <SVGPreview />
                </div>

                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Dimenzije:</span>
                    <span>{config.width}mm × {config.height}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Površina:</span>
                    <span>{((config.width * config.height) / 1_000_000).toFixed(4)} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Materijal:</span>
                    <span>{materials.find(m => m.id === config.materialId)?.name}</span>
                  </div>
                  {config.ledLighting && (
                    <div className="flex justify-between text-accent">
                      <span>LED osvetljenje:</span>
                      <span>Aktivno</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Form Modal/Section */}
          {showInquiryForm && (
            <Card className="mt-8 max-w-2xl mx-auto shadow-lg">
              <CardHeader>
                <CardTitle>Pošaljite upit za ponudu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Ime i prezime *</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Vaše ime i prezime"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="vas@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Telefon</Label>
                    <Input
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="064 123 4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Dodatne napomene</Label>
                  <textarea
                    id="message"
                    className="w-full mt-1 p-3 border border-input rounded-md min-h-[120px] resize-y bg-background"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Opišite dodatne zahteve ili postavite pitanja..."
                  />
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Rezime porudžbine:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Dimenzije:</span>
                      <span>{config.width}mm × {config.height}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materijal:</span>
                      <span>{materials.find(m => m.id === config.materialId)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>
                        {config.model === 'single' ? 'Jedna tabla' :
                         config.model === 'double' ? 'Dve table' :
                         '3D slova'}
                      </span>
                    </div>
                    {config.ledLighting && (
                      <div className="flex justify-between text-accent">
                        <span>LED osvetljenje:</span>
                        <span>{config.ledType}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Procenjena cena:</span>
                      <span className="text-primary">{price.toLocaleString()} RSD</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmitInquiry}
                    disabled={isSubmitting}
                    className="flex-1"
                    size="lg"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Pošalji upit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1"
                    size="lg"
                  >
                    Otkaži
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Configurator;