// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHomepageSettings, getSiteStats, HomepageSettings, SiteStats } from "@/lib/supabase";

const Hero = () => {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [settingsData, statsData] = await Promise.all([
          getHomepageSettings(),
          getSiteStats(),
        ]);
        setSettings(settingsData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !settings || !stats) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          Učitavanje...
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-accent/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-accent rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-gold rounded-full blur-3xl opacity-15"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-secondary rounded-full text-sm font-medium">
              <Zap className="w-4 h-4 mr-2 text-accent" />
              {settings.hero_badges.join(' • ')}
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {settings.hero_title.split(' ')[0]}
                <span className="bg-gradient-hero bg-clip-text text-transparent"> {settings.hero_title.split(' ').slice(1).join(' ')}</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                {settings.hero_subtitle}
              </p>
            </div>

            {/* Trust Elements */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(stats.avg_rating) ? 'fill-gold text-gold' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span>
                  {stats.avg_rating}/5 ({stats.review_count}+ recenzija)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>Garancija kvaliteta</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/konfigurator">
                <Button variant="hero" size="xl">
                  {settings.cta_primary_text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/galerija">
                <Button variant="premium" size="xl">
                  {settings.cta_secondary_text}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{stats.completed_projects}+</div>
                <div className="text-sm text-muted-foreground">Završenih projekata</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{settings.stat_delivery_time}</div>
                <div className="text-sm text-muted-foreground">Brzina isporuke</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{settings.stat_satisfaction_percent}%</div>
                <div className="text-sm text-muted-foreground">Zadovoljni klijenti</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-wood rounded-2xl p-8 shadow-elegant">
              <div className="bg-background/90 rounded-xl p-6 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Sample laser engraved sign */}
                  <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">PORODICA PETROVIĆ</div>
                    <div className="text-sm text-muted-foreground mb-4">Bulevar Oslobođenja 123</div>
                    <div className="w-full h-2 bg-gradient-accent rounded opacity-50"></div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Preview vaše table sa LED osvetljenjem
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-accent rounded-2xl blur-xl opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;