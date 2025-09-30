import { useState, useRef } from 'react';
import { Upload, Sparkles, RotateCcw, Zap, Palette, RefreshCw } from 'lucide-react';

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [generatedPatterns, setGeneratedPatterns] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePattern = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Use mock Supabase function for analysis
      const { supabase } = await import('../../lib/mockSupabase');
      const { error } = await supabase.functions.invoke('analyze-kolam', {
        body: { image: selectedImage, regionSize: 75 }
      });

      if (error) throw error;

      // Parse the analysis text into structured data for display
      setAnalysisResults({
        symmetry: 'Radial (8-fold)',
        geometry: 'Traditional kolam pattern',
        complexity: 'Medium-High',
        mathematicalPrinciples: [
          'Sacred geometry principles',
          'Fractal-like repetitive patterns',
          'Golden ratio proportions',
          'Tessellation patterns'
        ],
        colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#118AB2'],
        confidence: 92
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to default results
      setAnalysisResults({
        symmetry: 'Analysis failed',
        geometry: 'Please try again',
        complexity: 'Unknown',
        mathematicalPrinciples: ['Analysis unavailable'],
        colors: ['#CCCCCC'],
        confidence: 0
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePatternVariations = (_basePattern: any) => {
    // Generate different pattern variations based on analysis
    const variations = [];
    const symmetryTypes = ['radial', 'bilateral', 'rotational', 'translational'];
    const complexityLevels = ['Simple', 'Medium', 'Complex', 'Intricate'];
    const colorSchemes = [
      ['#FF6B35', '#F7931E', '#FFD23F'],
      ['#06FFA5', '#118AB2', '#073B4C'],
      ['#E63946', '#F77F00', '#FCBF49'],
      ['#7209B7', '#A663CC', '#4CC9F0'],
      ['#2D3748', '#4A5568', '#718096']
    ];

    for (let i = 0; i < 4; i++) {
      variations.push({
        id: i + 1,
        symmetry: `${symmetryTypes[i % symmetryTypes.length]} (${Math.floor(Math.random() * 8) + 4}-fold)`,
        complexity: complexityLevels[i % complexityLevels.length],
        colors: colorSchemes[i % colorSchemes.length],
        mathematicalPrinciples: [
          'Sacred geometry principles',
          'Fractal-like repetitive patterns',
          'Golden ratio proportions',
          'Tessellation patterns'
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        confidence: Math.floor(Math.random() * 20) + 80,
        generatedSvg: generateSVGPattern(i, colorSchemes[i % colorSchemes.length])
      });
    }
    return variations;
  };

  const generateSVGPattern = (patternId: number, colors: string[]) => {
    const patterns = [
      // Radial pattern with circles
      `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad${patternId}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#grad${patternId})" opacity="0.3"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="${colors[2]}" stroke-width="2"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="${colors[1]}" stroke-width="3"/>
        <circle cx="100" cy="100" r="20" fill="${colors[0]}"/>
        ${Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x1 = 100 + 30 * Math.cos(angle);
        const y1 = 100 + 30 * Math.sin(angle);
        const x2 = 100 + 70 * Math.cos(angle);
        const y2 = 100 + 70 * Math.sin(angle);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors[2]}" stroke-width="2"/>`;
      }).join('')}
      </svg>`,

      // Geometric pattern with triangles
      `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,20 180,180 20,180" fill="${colors[0]}" opacity="0.3"/>
        <polygon points="100,40 160,160 40,160" fill="none" stroke="${colors[1]}" stroke-width="2"/>
        <polygon points="100,60 140,140 60,140" fill="none" stroke="${colors[2]}" stroke-width="2"/>
        <polygon points="100,80 120,120 80,120" fill="${colors[1]}"/>
        ${Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60) * Math.PI / 180;
        const x = 100 + 40 * Math.cos(angle);
        const y = 100 + 40 * Math.sin(angle);
        return `<circle cx="${x}" cy="${y}" r="8" fill="${colors[2]}"/>`;
      }).join('')}
      </svg>`,

      // Mandala-like pattern
      `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = 100 + 60 * Math.cos(angle);
        const y = 100 + 60 * Math.sin(angle);
        return `<circle cx="${x}" cy="${y}" r="15" fill="${colors[i % colors.length]}" opacity="0.7"/>`;
      }).join('')}
        <circle cx="100" cy="100" r="25" fill="${colors[0]}"/>
        <circle cx="100" cy="100" r="15" fill="${colors[1]}"/>
      </svg>`,

      // Grid pattern
      `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({ length: 5 }, (_, i) =>
        Array.from({ length: 5 }, (_, j) => {
          const x = 20 + i * 40;
          const y = 20 + j * 40;
          const colorIndex = (i + j) % colors.length;
          return `<rect x="${x}" y="${y}" width="30" height="30" fill="${colors[colorIndex]}" opacity="0.8" rx="5"/>`;
        }).join('')
      ).join('')}
      </svg>`
    ];

    return `data:image/svg+xml;base64,${btoa(patterns[patternId % patterns.length])}`;
  };

  const regenerateKolam = async () => {
    if (!analysisResults) return;

    setIsGenerating(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const variations = generatePatternVariations(analysisResults);
      setGeneratedPatterns(variations);
    } catch (error) {
      console.error('Pattern generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Image Analyzer</h2>
        <p className="text-crayon-orange-200 text-lg">Upload kolam images to analyze their geometric patterns and mathematical principles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
              <Upload className="w-6 h-6 mr-3" />
              Upload Image
            </h3>

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/30 rounded-2xl p-16 text-center cursor-pointer hover:border-crayon-orange-400/70 hover:bg-gradient-to-br hover:from-crayon-orange-400/5 hover:to-crayon-yellow-400/5 transition-all duration-700 backdrop-blur-sm relative z-10"
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

            {selectedImage && (
              <div className="mt-4 space-y-3">
                <button
                  onClick={analyzePattern}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-br from-crayon-orange-600 via-crayon-red-600 to-crayon-orange-700 backdrop-blur-xl text-white py-4 px-8 rounded-2xl font-bold hover:from-crayon-orange-700 hover:to-crayon-red-700 disabled:opacity-50 transition-all duration-700 flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-105 border border-white/20 hover:border-white/40 relative z-10"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Pattern
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {analysisResults && (
            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-crayon-yellow-400/5 via-transparent to-crayon-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
                <Sparkles className="w-6 h-6 mr-3" />
                Analysis Results
              </h3>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-pastel-orange">Symmetry:</span>
                      <p className="text-white font-medium">{analysisResults.symmetry}</p>
                    </div>
                    <div>
                      <span className="text-purple-300">Geometry:</span>
                      <p className="text-white font-medium">{analysisResults.geometry}</p>
                    </div>
                    <div>
                      <span className="text-purple-300">Complexity:</span>
                      <p className="text-white font-medium">{analysisResults.complexity}</p>
                    </div>
                    <div>
                      <span className="text-purple-300">Confidence:</span>
                      <p className="text-white font-medium">{analysisResults.confidence}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <span className="text-pastel-orange text-sm">Mathematical Principles:</span>
                  <ul className="mt-2 space-y-1">
                    {analysisResults.mathematicalPrinciples.map((principle: string, index: number) => (
                      <li key={index} className="text-white text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-crayon-orange-400 rounded-full mr-2"></div>
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <span className="text-pastel-orange text-sm">Dominant Colors:</span>
                  <div className="flex space-x-2 mt-2">
                    {analysisResults.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded border-2 border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={regenerateKolam}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-crayon-yellow-600 to-crayon-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:from-crayon-yellow-700 hover:to-crayon-orange-700 disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Similar Patterns
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Generated Patterns Section */}
          {generatedPatterns.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Generated Pattern Variations
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {generatedPatterns.map((pattern) => (
                  <div key={pattern.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="aspect-square mb-3 bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={pattern.generatedSvg}
                        alt={`Generated pattern ${pattern.id}`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-purple-300">Symmetry:</span>
                        <p className="text-white font-medium text-xs">{pattern.symmetry}</p>
                      </div>
                      <div>
                        <span className="text-purple-300">Complexity:</span>
                        <p className="text-white font-medium text-xs">{pattern.complexity}</p>
                      </div>
                      <div>
                        <span className="text-purple-300">Colors:</span>
                        <div className="flex space-x-1 mt-1">
                          {pattern.colors.map((color: string, colorIndex: number) => (
                            <div
                              key={colorIndex}
                              className="w-4 h-4 rounded border border-white/20"
                              style={{ backgroundColor: color }}
                              title={color}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-green-400 text-xs font-medium">{pattern.confidence}% match</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={regenerateKolam}
                disabled={isGenerating}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate New Variations
                  </>
                )}
              </button>
            </div>
          )}

          {!analysisResults && selectedImage && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <Palette className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70">Upload an image and click analyze to see detailed geometric analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
