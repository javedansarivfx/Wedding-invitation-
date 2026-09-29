import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface ScratchRevealProps {
  isRevealed: boolean;
  onRevealed: () => void;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  isRevealed,
  onRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGoldDust, setShowGoldDust] = useState(false);

  // SVG Heart Path coordinate constants
  // Standardized viewBox 0 0 340 320
  const HEART_PATH_D =
    'M 170 300 C 40 210 10 140 10 80 C 10 30 50 15 95 15 C 135 15 160 40 170 58 C 180 40 205 15 245 15 C 290 15 330 30 330 80 C 330 140 300 210 170 300 Z';

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 340;
    const height = 320;
    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = 'source-over';

    // Rich gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#C99D3F');
    grad.addColorStop(0.2, '#FBE89A');
    grad.addColorStop(0.4, '#DFBC61');
    grad.addColorStop(0.7, '#F6E5A8');
    grad.addColorStop(1, '#B3832B');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle gold foil stippling & paper texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    for (let i = 0; i < 350; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }

    // Antique gold typography instructions stamped into the foil
    ctx.fillStyle = '#5A3E11';
    ctx.font = 'bold 15px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText('A DATE TO REMEMBER', width / 2, height / 2 - 20);

    ctx.font = 'bold 12px Cinzel, serif';
    ctx.fillStyle = '#483009';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 + 5);

    ctx.font = 'italic 11px Cormorant Garamond, serif';
    ctx.fillStyle = '#3A2405';
    ctx.fillText('Touch & scrape the heart to reveal Nikah date', width / 2, height / 2 + 28);

    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    // Erase foil directly under pointer
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    // Trigger brief gold dust particle effect
    setShowGoldDust(true);

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;
    const step = 32;

    for (let i = 3; i < pixels.length; i += 4 * step) {
      if (pixels[i] < 128) {
        transparent++;
      }
    }

    const total = pixels.length / (4 * step);
    const percent = Math.min(100, Math.round((transparent / total) * 100));
    setScratchPercent(percent);

    // When 34% or more has been erased, complete the reveal
    if (percent >= 34 && !isRevealed) {
      royalAudio.playCelebrationChime();
      onRevealed();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setTimeout(() => setShowGoldDust(false), 600);
  };

  const handleQuickReveal = () => {
    setScratchPercent(100);
    royalAudio.playCelebrationChime();
    onRevealed();
  };

  return (
    <section
      id="scratch-date"
      className="py-20 md:py-28 relative overflow-hidden bg-[#FAF7F2] border-t border-[#E8DFC8]"
    >
      {/* Inline SVG Defs for True Heart-Shaped ClipPath */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="wedding-heart-clip" clipPathUnits="userSpaceOnUse">
            <path d={HEART_PATH_D} />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-[#C59A3F] fill-[#C59A3F]/30" />
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
            Sacred Auspicious Dates
          </span>
          <Heart className="w-4 h-4 text-[#C59A3F] fill-[#C59A3F]/30" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-[#3A291A] mb-3">
          A Date To Remember
        </h2>

        <p className="font-cormorant italic text-base sm:text-lg text-[#665443] max-w-xl mx-auto mb-10">
          Touch and physically scrape the handcrafted gold foil heart with your finger to unlock the blessed Nikah date.
        </p>

        {/* Outer Heart-Shaped Paper Card Container */}
        <div className="relative mx-auto flex flex-col items-center justify-center">
          {/* Subtle Ambient Gold Particle Glow */}
          {showGoldDust && (
            <div className="absolute -top-6 inset-x-0 flex justify-center pointer-events-none">
              <span className="text-xs font-cinzel text-[#996515] animate-pulse">
                ✦ Scraping gold foil... ✦
              </span>
            </div>
          )}

          {/* Heart Container (Strictly Heart Shaped) */}
          <div
            className="relative w-[340px] h-[320px] select-none p-1.5 shadow-[0_20px_50px_-10px_rgba(200,162,81,0.4)]"
            style={{
              clipPath: "url('#wedding-heart-clip')",
              background:
                'linear-gradient(135deg, #E5C37A 0%, #C59A3F 45%, #996515 100%)',
            }}
          >
            {/* UNDERNEATH LAYER: The Revealed 05 December Nikah Date Content */}
            <div
              className="w-full h-full bg-[#FFFDF9] flex flex-col items-center justify-center p-5 text-center"
              style={{
                clipPath: "url('#wedding-heart-clip')",
              }}
            >
              <span className="font-amiri text-lg text-[#996515] mb-0.5">
                بِسْمِ اللَّهِ · عَقْدُ الْقِرَانِ
              </span>
              <span className="text-[10px] tracking-[0.25em] font-cinzel uppercase text-[#8C6D3B] font-bold">
                AUSPICIOUS NIKAH CEREMONY
              </span>

              {/* The Revealed 05 DECEMBER Date */}
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#2C1D12] tracking-wider my-0.5">
                05 DECEMBER
              </h3>

              <div className="w-16 h-px bg-[#D4AF37] my-1" />

              <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#996515] tracking-wider uppercase">
                BARAAT & NIKAH
              </h4>

              <div className="text-[11px] font-cinzel font-semibold text-[#5C4A3A] mt-1 space-y-0.5">
                <p>BARAAT: 12:00 PM NOON</p>
                <p>NIKAH: 4:00 PM EVENING</p>
              </div>

              <p className="font-cinzel text-[10px] tracking-wider text-[#786552] mt-1 font-medium">
                THE ROYAL IMPERIAL PALACE · NEHTOUR
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-[9px] font-cinzel tracking-widest text-[#996515] font-bold uppercase">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Nikah Festivities Unlocked</span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </div>
            </div>

            {/* OVERLAY LAYER: Real Scratchable Canvas */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
                style={{
                  clipPath: "url('#wedding-heart-clip')",
                }}
              />
            )}
          </div>

          {/* Progress & Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-cinzel text-[#8C6D3B]">
              <span>Foil Erased:</span>
              <span className="font-mono font-bold text-[#3A291A] tabular-nums">
                {scratchPercent}%
              </span>
            </div>

            {!isRevealed ? (
              <button
                onClick={handleQuickReveal}
                className="px-4 py-2 rounded-lg bg-[#FAF5EB] hover:bg-[#F3EAD8] border border-[#D4AF37]/60 text-[#5C3B0E] font-cinzel text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C59A3F]" />
                <span>Instant Reveal</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 rounded-full bg-[#1B4D3E]/10 border border-[#1B4D3E]/30 text-[#1B4D3E] font-cinzel text-xs font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1B4D3E]" />
                  <span>05 December Nikah Revealed & Celebrated!</span>
                </div>
                <button
                  onClick={initCanvas}
                  className="p-1.5 rounded-lg border border-[#D4AF37]/50 text-[#8C6D3B] hover:text-[#3A291A] transition-colors"
                  title="Scratch again"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
