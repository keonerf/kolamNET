import React, { useState, useRef } from 'react';
import { Upload, Download, Crop, Sparkles, RotateCcw, Palette, Zap } from 'lucide-react';

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResults(null);
        setSelectedRegion(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePattern = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        symmetry: 'Rotational (8-fold)',
        geometry: 'Octagonal base with radial patterns',
        complexity: 'High',
        mathematicalPrinciples: [
          'Fractal geometry',
          'Rotational symmetry',
          'Golden ratio proportions',
          'Tessellation patterns'
        ],
        colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#118AB2'],
        confidence: 94
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const regenerateKolam = () => {
    // Simulate kolam regeneration
    console.log('Regenerating kolam based on selected region...');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Image Analyzer</h1>
          <p className="text-purple-200">Upload kolam images to analyze their geometric patterns and mathematical principles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </h2>
              
              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/30 rounded-lg p-12 text-center cursor-pointer hover:border-orange-500/50 hover:bg-white/5 transition-all"
                >
                  <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 mb-2">Click to upload or drag and drop</p>
                  <p className="text-white/50 text-sm">PNG, JPG, GIF up to 10MB</p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded kolam"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 space-x-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Region Selection Tools */}
            {selectedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Crop className="w-5 h-5 mr-2" />
                  Region Selection
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
                    Rectangle
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all">
                    Circle
                  </button>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                    Polygon
                  </button>
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                    Free Draw
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {selectedImage && (
              <div className="space-y-3">
                <button
                  onClick={analyzePattern}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Pattern'}
                </button>
                
                <button
                  onClick={regenerateKolam}
                  className="w-full bg-white/10 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center border border-white/20"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Regenerate Kolam
                </button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResults && (
              <>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analysis Results
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Confidence Score</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-white/20 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${analysisResults.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold">{analysisResults.confidence}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-purple-200">Symmetry Type:</span>
                      <span className="text-white ml-2 font-medium">{analysisResults.symmetry}</span>
                    </div>
                    
                    <div>
                      <span className="text-purple-200">Geometry:</span>
                      <span className="text-white ml-2 font-medium">{analysisResults.geometry}</span>
                    </div>
                    
                    <div>
                      <span className="text-purple-200">Complexity:</span>
                      <span className="text-white ml-2 font-medium">{analysisResults.complexity}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Mathematical Principles</h4>
                  <div className="space-y-2">
                    {analysisResults.mathematicalPrinciples.map((principle: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        <span className="text-purple-200">{principle}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Color Palette
                  </h4>
                  <div className="flex space-x-2">
                    {analysisResults.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Export Analysis Report
                </button>
              </>
            )}

            {!analysisResults && !selectedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
                <Sparkles className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">Upload an image to see analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;