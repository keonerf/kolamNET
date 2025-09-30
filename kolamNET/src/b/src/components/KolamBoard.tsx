import React, { useState, useRef, useEffect } from 'react';
import { Grid3x3 as Grid3X3, Palette, Eraser, Download, Sparkles, RotateCcw, Save } from 'lucide-react';

const KolamBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('#FF6B35');
  const [brushSize, setBrushSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [gridSize, setGridSize] = useState(20);
  const [showGrid, setShowGrid] = useState(true);
  const [enhancementPrompt, setEnhancementPrompt] = useState('');

  const colors = [
    '#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#118AB2',
    '#8B5CF6', '#EC4899', '#EF4444', '#10B981', '#3B82F6'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas and draw grid
    drawGrid(ctx);
  }, [gridSize, showGrid]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!showGrid) return;

    // Draw dots grid
    ctx.fillStyle = '#4a5568';
    const spacing = gridSize;
    
    for (let x = spacing; x < canvas.width; x += spacing) {
      for (let y = spacing; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    
    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    drawGrid(ctx);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'kolam-design.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const enhanceWithAI = () => {
    // Simulate AI enhancement
    console.log('Enhancing kolam with prompt:', enhancementPrompt);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Kolam Creation Board</h1>
          <p className="text-purple-200">Create beautiful kolam patterns on an interactive dot grid</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="space-y-6">
            {/* Drawing Tools */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Drawing Tools
              </h3>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTool('brush')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                      tool === 'brush'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    Brush
                  </button>
                  <button
                    onClick={() => setTool('eraser')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                      tool === 'eraser'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Brush Size: {brushSize}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Colors</h3>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full mt-3 h-8 rounded border-none"
              />
            </div>

            {/* Grid Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Grid3X3 className="w-5 h-5 mr-2" />
                Grid Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Show Grid</span>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      showGrid ? 'bg-orange-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showGrid ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Grid Size: {gridSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* AI Enhancement */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Enhancement
              </h3>
              
              <div className="space-y-3">
                <textarea
                  value={enhancementPrompt}
                  onChange={(e) => setEnhancementPrompt(e.target.value)}
                  placeholder="Describe how you want to enhance your kolam..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={3}
                />
                <button
                  onClick={enhanceWithAI}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Enhance
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Drawing Canvas</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={clearCanvas}
                    className="bg-white/10 text-white p-2 rounded-lg hover:bg-white/20 transition-all"
                    title="Clear Canvas"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadCanvas}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                    title="Save"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="cursor-crosshair w-full h-auto"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolamBoard;