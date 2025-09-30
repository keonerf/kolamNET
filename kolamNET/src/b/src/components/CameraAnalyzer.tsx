import React, { useState, useRef, useEffect } from 'react';
import { Camera, Square, Play, Pause, Download, Sparkles, RotateCcw } from 'lucide-react';

const CameraAnalyzer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
    
    // Stop camera after capture
    stopCamera();
  };

  const analyzeCapture = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        patternType: 'Traditional Pulli Kolam',
        symmetry: 'Bilateral symmetry',
        complexity: 'Medium',
        accuracy: 87,
        mathematicalElements: [
          'Geometric progression',
          'Mirror symmetry',
          'Dot-to-dot connectivity',
          'Closed loop patterns'
        ],
        suggestions: [
          'Add more intricate loops for complexity',
          'Ensure equal spacing between dots',
          'Consider radial symmetry for enhancement'
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResults(null);
    startCamera();
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    
    const link = document.createElement('a');
    link.download = 'kolam-capture.png';
    link.href = capturedImage;
    link.click();
  };

  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Camera Analyzer</h1>
          <p className="text-purple-200">Capture kolam patterns in real-time and get instant mathematical analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Live Camera
                </h2>
                <div className="flex space-x-2">
                  {!isStreaming && !capturedImage && (
                    <button
                      onClick={startCamera}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </button>
                  )}
                  {isStreaming && (
                    <>
                      <button
                        onClick={captureImage}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all flex items-center"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Capture
                      </button>
                      <button
                        onClick={stopCamera}
                        className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </button>
                    </>
                  )}
                  {capturedImage && (
                    <>
                      <button
                        onClick={retakePhoto}
                        className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retake
                      </button>
                      <button
                        onClick={downloadImage}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {isStreaming && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                
                {capturedImage && (
                  <img
                    src={capturedImage}
                    alt="Captured kolam"
                    className="w-full h-full object-cover"
                  />
                )}
                
                {!isStreaming && !capturedImage && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/50">Click "Start" to begin camera capture</p>
                    </div>
                  </div>
                )}

                {/* Overlay grid for alignment */}
                {isStreaming && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full border-2 border-white/30 rounded-lg">
                      <div className="absolute inset-4 border border-white/20 rounded-lg grid grid-cols-3 grid-rows-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-white/10"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Capture Instructions */}
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-white mb-3">Capture Tips</h3>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Ensure good lighting for clear pattern recognition
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Position the kolam within the grid overlay
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Keep the camera steady for best results
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Capture the complete pattern for full analysis
                </li>
              </ul>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            {capturedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Pattern Analysis
                </h3>
                
                {!analysisResults ? (
                  <div className="text-center py-8">
                    <button
                      onClick={analyzeCapture}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all flex items-center mx-auto disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing Pattern...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Analyze Kolam
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Recognition Accuracy</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-white/20 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${analysisResults.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold">{analysisResults.accuracy}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-purple-200">Pattern Type:</span>
                      <span className="text-white ml-2 font-medium">{analysisResults.patternType}</span>
                    </div>
                    
                    <div>
                      <span className="text-purple-200">Symmetry:</span>
                      <span className="text-white ml-2 font-medium">{analysisResults.symmetry}</span>
                    </div>
                    
                    <div>
                      <span className="text-purple-200">Complexity:</span>
                      <span className="text-white ml-2 font-medium">{analysisResults.complexity}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {analysisResults && (
              <>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Mathematical Elements</h4>
                  <div className="space-y-2">
                    {analysisResults.mathematicalElements.map((element: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        <span className="text-purple-200">{element}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Enhancement Suggestions</h4>
                  <div className="space-y-2">
                    {analysisResults.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-purple-200">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Enhanced Version
                </button>
              </>
            )}

            {!capturedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
                <Camera className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">Capture a kolam pattern to see analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraAnalyzer;