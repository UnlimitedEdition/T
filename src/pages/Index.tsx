// src/pages/Index.tsx
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />

        {/* CTA Buttons */}
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Istražite naše usluge
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Napravite svoju personalizovanu tabelu u nekoliko koraka
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              to="/konfigurator"
              className="block p-6 bg-background rounded-xl border border-border hover:shadow-elegant transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Kalkulator</h3>
              <p className="text-muted-foreground">Napravi svoju tabelu</p>
            </Link>

            <Link
              to="/materijali"
              className="block p-6 bg-background rounded-xl border border-border hover:shadow-elegant transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Materijali</h3>
              <p className="text-muted-foreground">Pogledaj opcije</p>
            </Link>

            <Link
              to="/galerija"
              className="block p-6 bg-background rounded-xl border border-border hover:shadow-elegant transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Galerija</h3>
              <p className="text-muted-foreground">Pogledaj radove</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;