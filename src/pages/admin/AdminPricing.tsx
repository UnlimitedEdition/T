// src/pages/admin/AdminPricing.tsx
import { useState, useEffect } from "react";
import { getPricingConfig, updatePricingConfig } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminPricing() {
  const { toast } = useToast();
  const [configs, setConfigs] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getPricingConfig();
    setConfigs(data);
  };

  const handleChange = (id: number, field: string, value: string) => {
    setConfigs(prev => prev.map(c => c.id === id ? { ...c, [field]: parseFloat(value) || 0 } : c));
  };

  const handleSave = async (id: number) => {
    const config = configs.find(c => c.id === id);
    if (!config) return;
    await updatePricingConfig(id, config);
    toast({ title: "Cena ažurirana" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Cenovna konfiguracija</h2>
      <div className="space-y-4">
        {configs.map(c => (
          <div key={c.id} className="border p-4 rounded-lg">
            <h3 className="font-medium mb-3">Materijal ID: {c.material_id}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Cena po m²</label>
                <Input
                  type="number"
                  value={c.base_price_m2}
                  onChange={e => handleChange(c.id, 'base_price_m2', e.target.value)}
                  placeholder="Cena po m²"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">LED fiksna cena</label>
                <Input
                  type="number"
                  value={c.led_fixed_price}
                  onChange={e => handleChange(c.id, 'led_fixed_price', e.target.value)}
                  placeholder="LED cena"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Minimalna porudžbina</label>
                <Input
                  type="number"
                  value={c.minimum_order}
                  onChange={e => handleChange(c.id, 'minimum_order', e.target.value)}
                  placeholder="Min. cena"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Model Double (x)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={c.model_double_multiplier}
                  onChange={e => handleChange(c.id, 'model_double_multiplier', e.target.value)}
                  placeholder="Multiplikator"
                />
              </div>
            </div>
            <Button size="sm" onClick={() => handleSave(c.id)}>Sačuvaj</Button>
          </div>
        ))}
      </div>
    </div>
  );
}