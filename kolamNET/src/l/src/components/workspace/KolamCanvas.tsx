import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Grid3x3, Trash2, Sparkles, Download } from "lucide-react";
import { toast } from "sonner";

const KolamCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridSize, setGridSize] = useState(10);
  const [dotSpacing, setDotSpacing] = useState(40);
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
    toast.success("Canvas cleared");
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "kolam-design.png";
    link.href = url;
    link.click();
    toast.success("Downloaded!");
  };

  return (
    <Card className="shadow-kolam">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3x3 className="w-5 h-5 text-primary" />
          Create Your Kolam
        </CardTitle>
        <CardDescription>
          Draw on the dot grid to create your own kolam designs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Grid Size: {gridSize}x{gridSize}</Label>
            <Input
              type="range"
              min="5"
              max="20"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Drawing Color</Label>
            <div className="flex gap-2">
              {["#7C3AED", "#E11D48", "#F59E0B", "#14B8A6", "#FFFFFF"].map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className="w-10 h-10 rounded-lg transition-smooth shadow-md hover:scale-110"
                  style={{
                    backgroundColor: color,
                    border: currentColor === color ? "3px solid black" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-2 border-border rounded-lg overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair w-full"
            style={{ touchAction: "none" }}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={clearCanvas} variant="outline" className="flex-1 gap-2">
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
          <Button onClick={downloadCanvas} variant="outline" className="flex-1 gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KolamCanvas;
