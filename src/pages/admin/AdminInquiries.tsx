// src/pages/admin/AdminInquiries.tsx
import { useState, useEffect } from "react";
import { getInquiries, updateInquiryStatus } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminInquiries() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await getInquiries();
      console.log("Dobijeni upiti:", data);
      setInquiries(data);
    } catch (error) {
      console.error("Greška prilikom učitavanja upita:", error);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
      toast({ title: "Status ažuriran" });
    } catch (error) {
      toast({
        title: "Greška",
        description: "Status nije ažuriran",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Upiti</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Klijent</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>Detalji porudžbine</TableHead>
            <TableHead>Poruka</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Nema upita
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((i) => (
              <TableRow key={i.id}>
                {/* Klijent */}
                <TableCell>
                  <div className="font-medium">{i.customer_name}</div>
                  <div className="text-sm text-muted-foreground">{i.created_at?.split('T')[0]}</div>
                </TableCell>

                {/* Kontakt */}
                <TableCell>
                  <div>{i.customer_email}</div>
                  <div>{i.customer_phone || '–'}</div>
                </TableCell>

                {/* Detalji porudžbine */}
                <TableCell>
                  <Card className="bg-secondary/20 p-3 text-xs">
                    <CardContent className="p-0 space-y-1">
                      <div><strong>Materijal:</strong> {i.materials?.name || 'Nepoznat'}</div>
                      <div><strong>Dimenzije:</strong> {i.width_mm} × {i.height_mm} mm</div>
                      <div><strong>Model:</strong> {i.model_type === 'single' ? 'Jednostrano' : 
                                                   i.model_type === 'double' ? 'Dvostrano' : 
                                                   i.model_type === '3d_letters' ? '3D slova' : '–'}</div>
                      <div><strong>LED:</strong> {i.has_led ? (i.led_type ? i.led_type : 'Da') : 'Ne'}</div>
                      {i.calculated_price && (
                        <div><strong>Cena:</strong> {i.calculated_price} RSD</div>
                      )}
                    </CardContent>
                  </Card>
                </TableCell>

                {/* Poruka */}
                <TableCell>
                  <div className="max-w-xs whitespace-pre-line text-sm">
                    {i.message || '–'}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Select value={i.status} onValueChange={(v) => handleStatusChange(i.id, v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberi status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Prihvaćeno</SelectItem>
                      <SelectItem value="in_progress">Radi se</SelectItem>
                      <SelectItem value="shipped">Poslato</SelectItem>
                      <SelectItem value="completed">Završeno</SelectItem>
                      <SelectItem value="rejected">Odbijeno</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}