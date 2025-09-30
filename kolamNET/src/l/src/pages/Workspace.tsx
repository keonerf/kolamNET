import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Upload, Camera, Grid3x3, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ImageAnalyzer from "@/components/workspace/ImageAnalyzer";
import KolamCanvas from "@/components/workspace/KolamCanvas";
import CameraCapture from "@/components/workspace/CameraCapture";

const Workspace = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen gradient-subtle">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                kolamNET
              </h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analyze" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="analyze" className="gap-2">
              <Upload className="w-4 h-4" />
              Analyze
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <Grid3x3 className="w-4 h-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="camera" className="gap-2">
              <Camera className="w-4 h-4" />
              Camera
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze">
            <ImageAnalyzer />
          </TabsContent>

          <TabsContent value="create">
            <KolamCanvas />
          </TabsContent>

          <TabsContent value="camera">
            <CameraCapture />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Workspace;
