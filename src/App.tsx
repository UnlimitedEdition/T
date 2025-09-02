// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Kontakt from "./pages/Kontakt";
import PolitikaPrivatnosti from "./pages/PolitikaPrivatnosti";
import UsloviKoriscenja from "./pages/UsloviKoriscenja";
import Cookies from "./pages/Cookies";
import Materijali from "./pages/Materijali";
import Galerija from "./pages/Galerija";
import FAQ from "./pages/FAQ";
import Recenzije from "./pages/Recenzije";
import NotFound from "./pages/NotFound";
import Configurator from "./pages/Configurator";
import Recenzija from "./pages/Recenzija";
import Admin from "./pages/Admin";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminWorks from "./pages/admin/AdminWorks";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminFAQ from "./pages/admin/AdminFAQ";
import AdminPricing from "./pages/admin/AdminPricing";

// Components
import AdminLayout from "@/components/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/materijali" element={<Materijali />} />
          <Route path="/galerija" element={<Galerija />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/recenzije" element={<Recenzije />} />
          <Route path="/politika-privatnosti" element={<PolitikaPrivatnosti />} />
          <Route path="/uslovi-koriscenja" element={<UsloviKoriscenja />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/konfigurator" element={<Configurator />} />
          <Route path="/recenzija" element={<Recenzija />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<AdminLayout><Admin /></AdminLayout>} />
          <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
          <Route path="/admin/materials" element={<AdminLayout><AdminMaterials /></AdminLayout>} />
          <Route path="/admin/works" element={<AdminLayout><AdminWorks /></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
          <Route path="/admin/faq" element={<AdminLayout><AdminFAQ /></AdminLayout>} />
          <Route path="/admin/pricing" element={<AdminLayout><AdminPricing /></AdminLayout>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;