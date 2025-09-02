// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import AdminInquiries from "./pages/admin/AdminInquiries.tsx";
import AdminMaterials from "./pages/admin/AdminMaterials.tsx";
import AdminWorks from "./pages/admin/AdminWorks.tsx";
import AdminReviews from "./pages/admin/AdminReviews.tsx";
import AdminFAQ from "./pages/admin/AdminFAQ.tsx";
import AdminPricing from "./pages/admin/AdminPricing.tsx";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/materials" element={<AdminMaterials />} />
          <Route path="/admin/works" element={<AdminWorks />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/faq" element={<AdminFAQ />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/recenzija" element={<Recenzija />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;