import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  flip: number;
  flipSpeed: number;
}

interface PetalCanvasProps {
  burstTrigger?: number; // increments when burst is requested
  interactive?: boolean;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ burstTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const colors = [
    '#FDF2F4', // Soft white rose
    '#FCE7EB', // Blush pink
    '#F8D7DA', // Dusty rose
    '#F9E8D2', // Champagne petal
    '#EAD39C', // Golden leaf speck
  ];

  const createPetal = (x?: number, y?: number, isBurst = false): Petal => {
    const width = window.innerWidth;
    return {
      x: x !== undefined ? x : Math.random() * width,
      y: y !== undefined ? y : isBurst ? window.innerHeight * 0.45 : -20,
      size: Math.random() * 12 + 10,
      speedX: isBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 1.5 + 0.5,
      speedY: isBurst ? -Math.random() * 7 - 3 : Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.6,
      flip: Math.random() * 360,
      flipSpeed: (Math.random() - 0.5) * 3,
    };
  };

  // Trigger burst
  useEffect(() => {
    if (burstTrigger > 0) {
      const burstCount = 65;
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight * 0.5;
      for (let i = 0; i < burstCount; i++) {
        petalsRef.current.push(createPetal(startX + (Math.random() - 0.5) * 200, startY + (Math.random() - 0.5) * 150, true));
      }
    }
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial ambient petals
    const initialPetalCount = 28;
    petalsRef.current = Array.from({ length: initialPetalCount }, () => ({
      ...createPetal(),
      y: Math.random() * window.innerHeight,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = petalsRef.current.length - 1; i >= 0; i--) {
        const p = petalsRef.current[i];

        // Draw curved rose petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        const scaleX = Math.cos((p.flip * Math.PI) / 180);
        ctx.scale(scaleX, 1);

        ctx.beginPath();
        // Teardrop curved organic petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, -p.size, 0, -p.size * 1.2);
        ctx.bezierCurveTo(p.size / 2, -p.size, p.size / 2, -p.size / 2, 0, 0);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.2)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();

        // Update physics
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Gravity slowing burst down
        if (p.speedY < 1.0) {
          p.speedY += 0.08;
        }

        // Horizontal sway
        p.speedX += Math.sin(p.y * 0.01) * 0.02;

        // Reset or remove
        if (p.y > canvas.height + 40 || p.x < -40 || p.x > canvas.width + 40) {
          if (petalsRef.current.length > 35) {
            petalsRef.current.splice(i, 1);
          } else {
            petalsRef.current[i] = createPetal();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
    />
  );
};
