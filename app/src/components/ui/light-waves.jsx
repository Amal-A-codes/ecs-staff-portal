import { useCallback, useEffect, useRef } from "react";
// FIXED: This relative path goes up two levels to find your lib folder
import { cn } from "../../lib/utils";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 255, g: 255, b: 255 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function LightWavesBackground({
  className,
  children,
  colors = ["#0ea5e9", "#8b5cf6", "#06b6d4", "#a855f7", "#0284c7"],
  speed = 1,
  intensity = 0.6,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const wavesRef = useRef([]);
  const animationRef = useRef();
  const startTimeRef = useRef(Date.now());

  const initWaves = useCallback(
    (height) => {
      const waves = [];
      const waveCount = 5;

      for (let i = 0; i < waveCount; i++) {
        waves.push({
          y: height * (0.3 + (i / waveCount) * 0.5),
          amplitude: height * (0.15 + Math.random() * 0.15),
          frequency: 0.002 + Math.random() * 0.002,
          speed: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
          color: colors[i % colors.length],
          opacity: 0.15 + Math.random() * 0.1,
        });
      }
      wavesRef.current = waves;
    },
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      initWaves(height);
    };
    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(container);

    const draw = () => {
      const time = (Date.now() - startTimeRef.current) * 0.001 * speed;
      ctx.clearRect(0, 0, width, height);

      // Dark background fill
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      // Draw ambient glow spots
      const glowSpots = [
        { x: width * 0.2, y: height * 0.3, radius: Math.min(width, height) * 0.4, color: colors[0] },
        { x: width * 0.8, y: height * 0.6, radius: Math.min(width, height) * 0.35, color: colors[1] },
      ];

      for (const spot of glowSpots) {
        const rgb = hexToRgb(spot.color);
        const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.1 * intensity})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw flowing waves
      for (const wave of wavesRef.current) {
        const rgb = hexToRgb(wave.color);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y = wave.y + 
                    Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
        waveGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${wave.opacity * intensity})`);
        waveGradient.addColorStop(1, "transparent");
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [colors, speed, intensity, initWaves]);

  return (
    <div ref={containerRef} className={cn("fixed inset-0 overflow-hidden bg-slate-950", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}