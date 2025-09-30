import { useState, useRef } from 'react';
import { Camera, Sparkles, RotateCcw } from 'lucide-react';

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
      console.error("Failed to access camera", error);
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
      // Use mock Supabase function for analysis
      const { supabase } = await import('../../lib/mockSupabase');
      const { data, error } = await supabase.functions.invoke('analyze-kolam', {
        body: { image: capturedImage, regionSize: 100 }
      });

      if (error) throw error;
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setAnalysis("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Camera Capture</h2>
        <p className="text-crayon-orange-200 text-lg">Take a photo of a kolam to analyze its pattern and symmetry</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Section */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
              <Camera className="w-6 h-6 mr-3" />
              Camera Feed
            </h3>

            <div className="relative rounded-lg overflow-hidden bg-black min-h-[300px] flex items-center justify-center">
              {!stream && !capturedImage && (
                <button
                  onClick={startCamera}
                  className="bg-gradient-to-br from-crayon-orange-600 via-crayon-red-600 to-crayon-orange-700 backdrop-blur-xl text-white py-4 px-8 rounded-2xl font-bold hover:from-crayon-orange-700 hover:to-crayon-red-700 transition-all duration-700 flex items-center shadow-2xl hover:shadow-3xl hover:scale-105 border border-white/20 hover:border-white/40"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Camera
                </button>
              )}

              {stream && !capturedImage && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <button
                      onClick={captureImage}
                      className="bg-gradient-to-r from-crayon-orange-600 to-crayon-red-600 backdrop-blur-xl text-white py-3 px-6 rounded-2xl font-bold hover:from-crayon-orange-700 hover:to-crayon-red-700 transition-all duration-500 flex items-center shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Capture
                    </button>
                    <button
                      onClick={stopCamera}
                      className="bg-white/20 backdrop-blur-xl text-white py-3 px-6 rounded-2xl hover:bg-white/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 border border-white/10 hover:border-white/30"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {capturedImage && (
                <img src={capturedImage} alt="Captured kolam" className="w-full h-full object-contain rounded-lg" />
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {capturedImage && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={analyzeCapture}
                  disabled={analyzing}
                  className="flex-1 bg-gradient-to-br from-crayon-orange-600 via-crayon-red-600 to-crayon-orange-700 backdrop-blur-xl text-white py-3 px-6 rounded-2xl font-bold hover:from-crayon-orange-700 hover:to-crayon-red-700 disabled:opacity-50 transition-all duration-700 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 border border-white/20 hover:border-white/40 relative z-10"
                >
                  {analyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analyze Pattern
                    </>
                  )}
                </button>
                <button
                  onClick={reset}
                  className="bg-white/20 backdrop-blur-xl text-white py-3 px-6 rounded-2xl hover:bg-white/30 transition-all duration-500 flex items-center shadow-lg hover:shadow-xl hover:scale-105 border border-white/10 hover:border-white/30 relative z-10"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          {analysis ? (
            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-crayon-yellow-400/5 via-transparent to-crayon-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
                <Sparkles className="w-6 h-6 mr-3" />
                Analysis Results
              </h3>
              <div className="bg-white/5 rounded-2xl p-6 relative z-10">
                <pre className="text-crayon-orange-100 text-base leading-relaxed whitespace-pre-wrap font-mono">
                  {analysis}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 text-center shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Camera className="w-16 h-16 text-white/50 mx-auto mb-6 relative z-10" />
              <p className="text-crayon-orange-200 text-lg relative z-10">Capture an image to see detailed analysis results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
