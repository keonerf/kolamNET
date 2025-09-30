import { useRef, useEffect, useState } from 'react';
import { Grid3x3, Trash2, Download } from 'lucide-react';

const KolamCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridSize, setGridSize] = useState(10);
  const [dotSpacing] = useState(40);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#7C3AED");

  useEffect(() => {
    drawGrid();
  }, [gridSize, dotSpacing]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw dots
    ctx.fillStyle = "#9333EA";
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        ctx.beginPath();
        ctx.arc(
          i * dotSpacing + dotSpacing,
          j * dotSpacing + dotSpacing,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    drawGrid();
    console.log("Canvas cleared");
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "kolam-design.png";
    link.href = url;
    link.click();
    console.log("Downloaded!");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Kolam Canvas</h2>
        <p className="text-crayon-orange-200 text-lg">Draw on the dot grid to create your own kolam designs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-crayon-orange-400/5 via-transparent to-crayon-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
              <Grid3x3 className="w-6 h-6 mr-3" />
              Controls
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-base font-medium text-crayon-orange-200 mb-3 relative z-10">
                  Grid Size: {gridSize}x{gridSize}
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-crayon-orange-200 mb-3 relative z-10">
                  Drawing Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["#7C3AED", "#E11D48", "#F59E0B", "#14B8A6", "#FFFFFF", "#000000"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-10 h-10 rounded-lg transition-all shadow-md hover:scale-110 ${currentColor === color ? "ring-2 ring-white" : ""
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={clearCanvas}
                  className="w-full bg-gradient-to-r from-crayon-red-400/30 to-crayon-orange-400/30 text-white border border-white/30 py-3 px-6 rounded-2xl hover:from-crayon-red-500/40 hover:to-crayon-orange-500/40 transition-all duration-500 flex items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-105 relative z-10"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Clear Canvas
                </button>
                <button
                  onClick={downloadCanvas}
                  className="w-full bg-gradient-to-r from-crayon-yellow-400/30 to-crayon-orange-400/30 text-white border border-white/30 py-3 px-6 rounded-2xl hover:from-crayon-yellow-500/40 hover:to-crayon-orange-500/40 transition-all duration-500 flex items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-105 relative z-10"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-crayon-yellow-400/5 via-transparent to-crayon-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="bg-gradient-to-br from-white/95 to-white/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm relative z-10">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="cursor-crosshair w-full max-w-full"
                style={{ touchAction: "none" }}
              />
            </div>

            <div className="mt-6 text-center relative z-10">
              <p className="text-crayon-orange-200 text-base">
                Click and drag to draw lines connecting the dots. Create beautiful kolam patterns!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolamCanvas;
