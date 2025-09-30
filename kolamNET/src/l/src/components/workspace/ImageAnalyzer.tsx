import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Upload, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ImageAnalyzer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");
  const [regionSize, setRegionSize] = useState([50]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setAnalysis("");
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeKolam = async () => {
    if (!image) return;

    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-kolam", {
        body: { image, regionSize: regionSize[0] },
      });

      if (error) throw error;
      setAnalysis(data.analysis);
      toast.success("Analysis complete!");
    } catch (error: any) {
      toast.error(error.message || "Failed to analyze kolam");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Card className="shadow-kolam">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Upload & Analyze Kolam
        </CardTitle>
        <CardDescription>
          Upload a kolam image to analyze its geometry and mathematical patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full h-32 border-dashed border-2 hover:border-primary transition-smooth"
          >
            {image ? (
              <img src={image} alt="Uploaded kolam" className="max-h-28 object-contain" />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload kolam image</p>
              </div>
            )}
          </Button>

          {image && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Region Selection Size: {regionSize[0]}%</label>
                <Slider
                  value={regionSize}
                  onValueChange={setRegionSize}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Adjust to select specific regions of the kolam for detailed analysis
                </p>
              </div>

              <Button
                onClick={analyzeKolam}
                disabled={analyzing}
                className="w-full gradient-primary shadow-glow"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Pattern
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        {analysis && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{analysis}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageAnalyzer;
