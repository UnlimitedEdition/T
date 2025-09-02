// src/components/AdminAuth.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = ({ onAuthenticated }) => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Pukovac123#") { // PROMENITE OVO
      sessionStorage.setItem("admin-auth", "true");
      onAuthenticated();
      toast({
        title: "Uspešno ste ulogovani",
      });
    } else {
      toast({
        title: "Pogrešna lozinka",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin pristup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Lozinka</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Unesite lozinku"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Prijavi se
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;