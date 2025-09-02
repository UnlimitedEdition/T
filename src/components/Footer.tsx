// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Play, 
  MessageCircle, 
  MessageSquare, Send 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Laser Wood Design</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Profesionalno lasersko graviranje na drvetu, akrilu i metalu. 
                Kreiramo unikatne personalizovane table za vaš dom i poslovni prostor.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              {/* Instagram */}
              <Button
                variant="outline"
                size="icon"
                className="border-0 bg-transparent hover:bg-transparent p-0 h-auto"
                asChild
              >
                <a
                  href="https://www.instagram.com/laser_wooood_design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-[#E1306C]" /> {/* Instagram crveno-ljubičasto */}
                </a>
              </Button>

              {/* TikTok */}
              <Button
                variant="outline"
                size="icon"
                className="border-0 bg-transparent hover:bg-transparent p-0 h-auto"
                asChild
              >
                <a
                  href="https://www.tiktok.com/@laserwooooddesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <div className="w-6 h-6">
                    <Play className="w-6 h-6 text-black fill-white" style={{ transform: 'scaleX(-1)' }} />
                  </div>
                </a>
              </Button>

              {/* Viber */}
              <Button
                variant="outline"
                size="icon"
                className="border-0 bg-transparent hover:bg-transparent p-0 h-auto"
                asChild
              >
                <a
                  href="viber://chat?number=%2B381693349457"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Viber"
                >
                  <MessageCircle className="w-6 h-6 text-[#7B00D3]" /> {/* Viber ljubičasta */}
                </a>
              </Button>

              {/* WhatsApp */}
              <Button
                variant="outline"
                size="icon"
                className="border-0 bg-transparent hover:bg-transparent p-0 h-auto"
                asChild
              >
                <a
                  href="https://wa.me/381693349457"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-6 h-6 text-[#25D366]" /> {/* WhatsApp zelena */}
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Brzi linkovi</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/konfigurator" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Kalkulator
                </Link>
              </li>
              <li>
                <Link to="/materijali" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Materijali
                </Link>
              </li>
              <li>
                <Link to="/galerija" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Galerija radova
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/recenzije" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Recenzije
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                 Često postavljana pitanja
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Naše usluge</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-primary-foreground/80">Lasersko graviranje</li>
              <li className="text-primary-foreground/80">Table za vrata</li>
              <li className="text-primary-foreground/80">LED osvetljenje</li>
              <li className="text-primary-foreground/80">3D slova</li>
              <li className="text-primary-foreground/80">Privesci za ključeve</li>
              <li className="text-primary-foreground/80">Poslovne table</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Kontakt informacije</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-primary-foreground/80">+381 69 334 9457</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-primary-foreground/80">laserwooooddesign@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-primary-foreground/80">Pančevo, Srbija</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-primary-foreground/80">Pon-Pet: 8:00-17:00</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Prijavite se za najnovije ponude i inspiracije
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Vaš email"
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded px-3 py-2 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent w-full"
                />
                <Button variant="secondary" size="icon" aria-label="Prijavi se na newsletter">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/60">
            © 2025 Septembar [Laser Wood Design Milan Tošić]. Sva prava zadržana.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link to="/politika-privatnosti" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Politika privatnosti
            </Link>
            <Link to="/uslovi-koriscenja" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Uslovi korišćenja
            </Link>
            <Link to="/cookies" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;