import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Grid3x3, Camera, Upload, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroKolam from "@/assets/hero-kolam.jpg";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/workspace");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card shadow-kolam">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center shadow-glow animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                kolamNET
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Analyze & Create{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sacred Geometry
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the mathematical beauty behind traditional kolam art. Analyze patterns,
              understand geometry, and create your own designs with AI-powered tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="gradient-primary shadow-glow text-lg px-8 py-6 gap-2 transition-smooth hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-kolam border-4 border-primary/20">
              <img
                src={heroKolam}
                alt="Beautiful kolam pattern"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Master Kolam
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools to analyze, create, and understand the sacred geometry of kolam art
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group">
            <div className="bg-card rounded-2xl p-8 shadow-kolam transition-smooth hover:shadow-glow hover:-translate-y-2 h-full">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Analyze Patterns</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload kolam images and get detailed analysis of geometry, symmetry, and
                mathematical principles. Select specific regions for focused insights.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-card rounded-2xl p-8 shadow-kolam transition-smooth hover:shadow-glow hover:-translate-y-2 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6 shadow-glow">
                <Grid3x3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Create Designs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Draw on an interactive dot grid board. Choose colors, get AI suggestions, and
                enhance your patterns with intelligent prompts.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-card rounded-2xl p-8 shadow-kolam transition-smooth hover:shadow-glow hover:-translate-y-2 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-highlight to-primary flex items-center justify-center mb-6 shadow-glow">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Capture & Copy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use your camera to capture real kolam designs. AI analyzes the pattern and
                recreates an exact digital copy for you to study.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-card rounded-3xl p-12 shadow-kolam relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Explore{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Kolam Art?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join kolamNET and start your journey into the mathematical beauty of sacred geometry
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="gradient-primary shadow-glow text-lg px-10 py-6 gap-2 transition-smooth hover:scale-105"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 kolamNET. Preserving and analyzing traditional art through technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
