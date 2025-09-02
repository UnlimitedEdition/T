// src/components/Header.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Link to home */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">LWD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Laser Wood Design</h1>
              <p className="text-xs text-muted-foreground">Personalizovane table po meri</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/konfigurator" className="text-foreground hover:text-primary transition-colors">
              Kalkulator
            </Link>
            <Link to="/materijali" className="text-foreground hover:text-primary transition-colors">
              Materijali
            </Link>
            <Link to="/galerija" className="text-foreground hover:text-primary transition-colors">
              Galerija
            </Link>
            <Link to="/kontakt" className="text-foreground hover:text-primary transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+381 69 334 9457</span>
            </div>
            {/* ✅ Dugme vodi na /kontakt */}
            <Button variant="accent" size="sm" asChild>
              <Link to="/kontakt" onClick={() => setIsMenuOpen(false)}>
                Pošalji upit
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/konfigurator"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kalkulator
              </Link>
              <Link
                to="/materijali"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Materijali
              </Link>
              <Link
                to="/galerija"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Galerija
              </Link>
              <Link
                to="/kontakt"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
                <Phone className="w-4 h-4" />
                <span>+381 69 334 9457</span>
              </div>
              {/* ✅ Mobilno dugme takođe vodi na /kontakt */}
              <Button variant="accent" size="sm" asChild>
                <Link to="/kontakt" onClick={() => setIsMenuOpen(false)}>
                  Pošalji upit
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;