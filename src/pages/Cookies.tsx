import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Politika kolačića
            </h1>
            <p className="text-xl text-muted-foreground">
              Poslednje ažuriranje: {new Date().toLocaleDateString('sr-RS')}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Šta su kolačići?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Kolačići (cookies) su mali tekstualni fajlovi koji se čuvaju na vašem uređaju (računar, tablet, telefon) 
                  kada posetite naš veb sajt. Oni omogućavaju sajtu da "zapamti" vaše radnje i postavke 
                  (kao što su jezik, veličina fonta i druge preferencije prikaza) tokom određenog vremenskog perioda, 
                  tako da ih ne morate ponovo unositi svaki put kada posetite sajt ili se krećete kroz stranice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kako koristimo kolačiće</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Koristimo kolačiće za nekoliko različitih svrha:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Da bismo zapamtili vaše preferencije i postavke</li>
                  <li>Da bismo analizirali kako koristite naš sajt</li>
                  <li>Da bismo poboljšali funkcionalnost sajta</li>
                  <li>Da bismo osigurali bezbednost sajta</li>
                  <li>Da bismo personalizovali vaše iskustvo</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipovi kolačića koje koristimo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">1. Neophodni kolačići</h4>
                  <p className="text-muted-foreground mb-2">
                    Ovi kolačići su neophodni za osnovno funkcionisanje sajta i ne mogu se onemogućiti.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Kolačići za bezbednost</li>
                    <li>Kolačići za sesiju</li>
                    <li>Kolačići za funkcionalnost sajta</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-primary">2. Analitički kolačići</h4>
                  <p className="text-muted-foreground mb-2">
                    Pomažu nam da razumemo kako posetioci koriste naš sajt prikupljanjem informacija anonimno.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Google Analytics kolačići</li>
                    <li>Kolačići za praćenje performansi</li>
                    <li>Kolačići za statistike poseta</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-primary">3. Funkcionalni kolačići</h4>
                  <p className="text-muted-foreground mb-2">
                    Omogućavaju sajtu da zapamti izbore koje pravite i pruže vam poboljšane funkcionalnosti.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Kolačići za jezik i region</li>
                    <li>Kolačići za preferencije prikaza</li>
                    <li>Kolačići za čuvanje konfiguracije</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-primary">4. Marketing kolačići</h4>
                  <p className="text-muted-foreground mb-2">
                    Koriste se za praćenje posetioca kroz različite veb sajtove radi prikazivanja relevantnih reklama.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Facebook Pixel</li>
                    <li>Google Ads kolačići</li>
                    <li>Retargeting kolačići</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kolačići treće strane</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ponekad koristimo kolačiće treće strane za poboljšanje funkcionalnosti našeg sajta:
                </p>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Google Analytics</h5>
                    <p className="text-sm text-muted-foreground">
                      Koristi se za analizu saobraćaja na sajtu i razumevanje ponašanja korisnika.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Društveni mediji</h5>
                    <p className="text-sm text-muted-foreground">
                      Kolačići iz društvenih mreža (Facebook, Instagram) za deljenje sadržaja i praćenje.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upravljanje kolačićima</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Kontrola putem pregledača</h4>
                  <p className="text-muted-foreground mb-3">
                    Možete kontrolisati i/ili obrisati kolačiće kako želite. Možete obrisati sve kolačiće 
                    koji se već nalaze na vašem računaru i možete podesiti većinu pregledača da ih blokiraju.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Google Chrome</h5>
                      <p className="text-muted-foreground">
                        Postavke → Napredne postavke → Privatnost i bezbednost → Kolačići
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Mozilla Firefox</h5>
                      <p className="text-muted-foreground">
                        Opcije → Privatnost i bezbednost → Kolačići i podaci sajta
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Safari</h5>
                      <p className="text-muted-foreground">
                        Preferencije → Privatnost → Upravljaj podacima veb sajta
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Microsoft Edge</h5>
                      <p className="text-muted-foreground">
                        Postavke → Dozvole sajta → Kolačići i čuvani podaci
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Posledice onemogućavanja kolačića</h4>
                  <p className="text-muted-foreground">
                    Ako onemogućite kolačiće, neki delovi našeg sajta možda neće raditi kako treba. 
                    Na primer, možda nećete moći da koristite konfigurator ili da se prijavljujete na newsletter.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Izmene ove politike</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Možemo povremeno ažurirati ovu politiku kolačića da odrazimo promene u tehnologiji, 
                  zakonu ili našoj poslovnoj praksi. Preporučujemo da redovno proveravate ovu stranicu 
                  za najnovije informacije o našoj upotrebi kolačića.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ako imate pitanja o našoj upotrebi kolačića, kontaktirajte nas:
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

export default Cookies;