import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsloviKoriscenja = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Uslovi korišćenja
            </h1>
            <p className="text-xl text-muted-foreground">
              Poslednje ažuriranje: {new Date().toLocaleDateString('sr-RS')}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Uvodne odredbe</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Dobrodošli na veb sajt Laser Wood Design-a. Ovim uslovima korišćenja regulišemo korišćenje našeg 
                  veb sajta i usluga. Korišćenjem našeg sajta, prihvatate da se pridržavate ovih uslova. 
                  Ako se ne slažete sa bilo kojim delom ovih uslova, molimo vas da ne koristite naš sajt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Definicije</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>"Kompanija"</strong> - Laser Wood Design</li>
                  <li><strong>"Sajt"</strong> - veb sajt na adresi laserwooooddesign.rs</li>
                  <li><strong>"Korisnik"</strong> - bilo koja osoba koja koristi naš sajt ili usluge</li>
                  <li><strong>"Usluge"</strong> - svi proizvodi i usluge koje pružamo</li>
                  <li><strong>"Sadržaj"</strong> - tekst, slike, video materijali i drugi sadržaj na sajtu</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Korišćenje sajta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">3.1 Dozvoljena upotreba</h4>
                  <p className="text-muted-foreground">
                    Možete koristiti naš sajt za:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                    <li>Pregledanje naših proizvoda i usluga</li>
                    <li>Kontaktiranje sa nama za informacije ili narudžbine</li>
                    <li>Korišćenje konfiguratora za kreiranje dizajna</li>
                    <li>Čitanje informativnog sadržaja</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">3.2 Zabranjena upotreba</h4>
                  <p className="text-muted-foreground">
                    Zabranjeno je:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                    <li>Korišćenje sajta u nezakonite svrhe</li>
                    <li>Pokušaji neovlašćenog pristupa sistemu</li>
                    <li>Slanje virusa ili malicioznog softvera</li>
                    <li>Kopiranje sadržaja bez dozvole</li>
                    <li>Ometanje rada sajta</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Narudžbine i usluge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">4.1 Proces narudžbine</h4>
                  <p className="text-muted-foreground">
                    Narudžbine se vrše putem kontakt forme ili direktnog kontakta. Sve cene su u dinarima (RSD) 
                    i uključuju PDV. Zadržavamo pravo da odbijemo narudžbinu iz tehničkih ili drugih opravdanih razloga.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">4.2 Plaćanje</h4>
                  <p className="text-muted-foreground">
                    Plaćanje se vrši unapred, putem bankovnog transfera ili drugim dogovorenim načinom. 
                    Proizvodnja počinje nakon prijema uplate.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">4.3 Dostava</h4>
                  <p className="text-muted-foreground">
                    Vršimo dostavu širom Srbije. Rokovi dostave se dogovaraju individualno i zavise od složenosti narudžbine. 
                    Troškovi dostave se naplaćuju posebno.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Autorska prava</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Sav sadržaj na ovom sajtu, uključujući tekst, slike, logoe, dizajne i softver, je vlasništvo 
                  Laser Wood Design-a ili naših partnera i zaštićen je autorskim pravima.
                </p>
                <p className="text-muted-foreground">
                  Za dizajne koje vi dostavite, vi zadržavate autorska prava, ali nam dajete dozvolu za korišćenje 
                  u svrhu izrade vašeg proizvoda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Garancija i odgovornost</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">6.1 Garancija</h4>
                  <p className="text-muted-foreground">
                    Pružamo garanciju na kvalitet izrade naših proizvoda. Garancija ne pokriva oštećenja nastala 
                    usled neadekvatnog korišćenja ili čuvanja.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">6.2 Ograničenje odgovornosti</h4>
                  <p className="text-muted-foreground">
                    Naša odgovornost je ograničena na vrednost narudžbine. Ne odgovaramo za indirektne štete, 
                    izgubljenu dobit ili druge posledične štete.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Raskid i izmene</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Zadržavamo pravo da u bilo kom trenutku ograničimo ili zaustavimo pristup sajtu bez prethodne najave. 
                  Takođe zadržavamo pravo da menjamo ove uslove korišćenja.
                </p>
                <p className="text-muted-foreground">
                  O značajnim izmenama ćemo vas obavestiti putem sajta ili email-a.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Primenjivo pravo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ovi uslovi korišćenja se tumače i primenjuju u skladu sa zakonima Republike Srbije. 
                  Svi sporovi se rešavaju pred nadležnim sudovima u Pančevou.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Kontakt informacije</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Za sva pitanja u vezi sa ovim uslovima korišćenja, kontaktirajte nas:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Laser Wood Design</p>
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

export default UsloviKoriscenja;