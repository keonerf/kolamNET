import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error("Failed to access camera");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
    stopCamera();
  };

  const analyzeCapture = async () => {
    if (!capturedImage) return;

    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-kolam", {
        body: { image: capturedImage, regionSize: 100 },
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

  const reset = () => {
    setCapturedImage(null);
    setAnalysis("");
  };

  return (
    <Card className="shadow-kolam">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Capture & Analyze
        </CardTitle>
        <CardDescription>
          Take a photo of a kolam to analyze its pattern and symmetry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative rounded-lg overflow-hidden bg-black min-h-[400px] flex items-center justify-center">
          {!stream && !capturedImage && (
            <Button onClick={startCamera} size="lg" className="gradient-primary shadow-glow">
              <Camera className="w-5 h-5 mr-2" />
              Start Camera
            </Button>
          )}

          {stream && !capturedImage && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button onClick={captureImage} size="lg" className="gradient-primary shadow-glow">
                  <Camera className="w-5 h-5 mr-2" />
                  Capture
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  Cancel
                </Button>
              </div>
            </>
          )}

          {capturedImage && (
            <img src={capturedImage} alt="Captured kolam" className="w-full h-full object-contain" />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {capturedImage && (
          <div className="flex gap-2">
            <Button
              onClick={analyzeCapture}
              disabled={analyzing}
              className="flex-1 gradient-primary shadow-glow"
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
            <Button onClick={reset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake
            </Button>
          </div>
        )}

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

export default CameraCapture;
