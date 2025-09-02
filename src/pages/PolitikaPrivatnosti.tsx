import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PolitikaPrivatnosti = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Politika privatnosti
            </h1>
            <p className="text-xl text-muted-foreground">
              Poslednje ažuriranje: {new Date().toLocaleDateString('sr-RS')}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Opšte informacije</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Laser Wood Design ("mi", "naša kompanija", "naš sajt") poštuje privatnost naših korisnika i posvećeni smo 
                  zaštiti ličnih podataka koje nam poveravate. Ova politika privatnosti objašnjava kako prikupljamo, 
                  koristimo, čuvamo i štitimo vaše lične podatke kada koristite naš veb sajt ili naše usluge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Podaci koje prikupljamo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">2.1 Lični podaci</h4>
                  <p className="text-muted-foreground">
                    Prikupljamo sledeće lične podatke kada ih vi dobrovoljno podelite sa nama:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                    <li>Ime i prezime</li>
                    <li>Email adresu</li>
                    <li>Broj telefona</li>
                    <li>Adresu za dostavu</li>
                    <li>Informacije o željenim proizvodima/uslugama</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">2.2 Tehnički podaci</h4>
                  <p className="text-muted-foreground">
                    Automatski prikupljamo određene tehničke podatke kada posetite naš sajt:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                    <li>IP adresu</li>
                    <li>Tip i verziju pregledača</li>
                    <li>Operativni sistem</li>
                    <li>Podatke o korišćenju sajta</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Kako koristimo vaše podatke</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Vaše lične podatke koristimo u sledeće svrhe:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Za pružanje naših usluga laserskog graviranja</li>
                  <li>Za komunikaciju sa vama u vezi sa vašim zahtevima</li>
                  <li>Za slanje ponuda i informacija o novim proizvodima (samo uz vašu saglasnost)</li>
                  <li>Za poboljšanje našeg sajta i usluga</li>
                  <li>Za ispunjavanje zakonskih obaveza</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Deljenje podataka sa trećim licima</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ne prodajemo, ne iznajmljujemo niti ne delimo vaše lične podatke sa trećim licima, osim u sledećim slučajevima:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Sa vašom izričitom saglasnosću</li>
                  <li>Sa pružaocima usluga koji nam pomažu u poslovanju (poštanske službe, platni procesori)</li>
                  <li>Kada to zahteva zakon ili sudska odluka</li>
                  <li>Za zaštitu naših prava ili bezbednosti korisnika</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Zaštita podataka</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Primenjujemo odgovarajuće tehničke i organizacione mere bezbednosti kako bismo zaštitili vaše lične 
                  podatke od neovlašćenog pristupa, korišćenja, izmene ili uništavanja. Koristimo SSL enkripciju za 
                  sve komunikacije i redovno ažuriramo naše bezbednosne protokole.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Vaša prava</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Imate sledeća prava u vezi sa vašim ličnim podacima:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Pravo pristupa - možete zatražiti kopiju vaših podataka</li>
                  <li>Pravo ispravke - možete zatražiti ispravku netačnih podataka</li>
                  <li>Pravo brisanja - možete zatražiti brisanje svojih podataka</li>
                  <li>Pravo prenosivosti - možete zatražiti transfer podataka</li>
                  <li>Pravo prigovora - možete da se protivite obradi podataka</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Kolačići (Cookies)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Naš sajt koristi kolačiće za poboljšanje vašeg iskustva korišćenja. Kolačići su mali fajlovi 
                  koji se čuvaju na vašem uređaju. Možete kontrolisati korišćenje kolačića putem postavki vašeg pregledača. 
                  Više informacija o kolačićima možete pronaći na našoj stranici o kolačićima.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Kontakt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ako imate pitanja o ovoj politici privatnosti ili želite da ostvarite svoja prava, kontaktirajte nas:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: laserwooooddesign@gmail.com</p>
                  <p>Telefon: +381 69 334 9457</p>
                  <p>Adresa: Pančevo, Srbija</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolitikaPrivatnosti;