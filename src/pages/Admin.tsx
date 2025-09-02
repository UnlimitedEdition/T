// src/pages/Admin.tsx
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAuth from "@/components/AdminAuth";
import AdminSidebar from "@/components/AdminSidebar";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Dobrodošli u Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Izaberite opciju iz menija.</p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;