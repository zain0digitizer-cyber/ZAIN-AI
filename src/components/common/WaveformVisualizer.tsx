import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
  color?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isActive,
  isSpeaking,
  color = '#06b6d4',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      const numBars = 36;
      const barWidth = width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;

        if (isActive || isSpeaking) {
          const speed = isSpeaking ? 0.15 : 0.08;
          const amplitude = isSpeaking ? 34 : 20;
          barHeight =
            Math.sin(i * 0.3 + phase) * amplitude * Math.sin((i / numBars) * Math.PI) +
            Math.cos(i * 0.5 - phase * 0.8) * (amplitude * 0.5) +
            8;
          barHeight = Math.max(6, Math.abs(barHeight));
        }

        const x = i * (barWidth + 2);
        const y = centerY - barHeight / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isSpeaking) {
          gradient.addColorStop(0, '#8b5cf6');
          gradient.addColorStop(0.5, '#3b82f6');
          gradient.addColorStop(1, '#06b6d4');
        } else if (isActive) {
          gradient.addColorStop(0, '#06b6d4');
          gradient.addColorStop(1, '#0ea5e9');
        } else {
          gradient.addColorStop(0, 'rgba(100, 116, 139, 0.4)');
          gradient.addColorStop(1, 'rgba(51, 65, 85, 0.4)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();
      }

      phase += 0.08;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, isSpeaking, color]);

  return (
    <div className="w-full flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={360}
        height={80}
        className="w-full max-w-md h-20"
      />
    </div>
  );
};
