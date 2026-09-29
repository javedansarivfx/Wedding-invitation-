import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface FinalMonogramProps {
  onReplayInvitation: () => void;
  onShowerPetals: () => void;
  isRevealed: boolean;
}

export const FinalMonogram: React.FC<FinalMonogramProps> = ({
  onReplayInvitation,
  onShowerPetals,
  isRevealed,
}) => {
  return (
    <footer className="py-20 md:py-28 relative bg-[#231A13] text-[#FAF7F2] overflow-hidden text-center">
      {/* Subtle Gold Stardust Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl mx-auto px-4 sm:px-6"
      >
        {/* COUPLE NAMES */}
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FAF7F2] uppercase mb-1">
          {WEDDING_DATA.groom.name}
        </h2>
        <div className="font-cinzel-decorative text-2xl sm:text-3xl text-[#D4AF37] my-1">
          &
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FAF7F2] uppercase mb-6">
          {WEDDING_DATA.bride.name}
        </h2>

        {/* EVENTS DATES (Only if revealed) */}
        {isRevealed && (
          <div className="my-6 space-y-1.5 font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#FFE28A] uppercase">
            <p>05 DECEMBER • BARAAT & NIKAH</p>
            <p>06 DECEMBER • WALIMA</p>
          </div>
        )}

        <div className="w-16 h-px bg-[#D4AF37]/50 mx-auto my-6" />

        {/* PREMIUM GOLD J & R MONOGRAM MEDALLION */}
        <div className="mx-auto my-8 relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/40 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-[#D4AF37]/60" />

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#3D2B1B] via-[#2A1D12] to-[#1C130B] border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.4)]">
            <span className="font-amiri text-xs text-[#FFDF85]/80">
              بِسْمِ اللَّهِ
            </span>
            <div className="font-cinzel-decorative text-3xl sm:text-4xl font-extrabold tracking-widest text-[#FFF2C6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] my-0.5">
              J & R
            </div>
            <span className="font-cinzel text-[8px] uppercase tracking-[0.3em] text-[#D4AF37]">
              NIKAH
            </span>
          </div>
        </div>

        {/* DUA BLESSING */}
        <p className="font-cormorant italic text-lg sm:text-2xl text-[#E8DFC8] max-w-xl mx-auto mb-4 leading-relaxed">
          “May Allah bless this union with love, happiness, peace and endless barakah.”
        </p>

        {/* PRESENCE STATEMENT */}
        <p className="font-cinzel text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-[#D4AF37] my-6">
          YOUR PRESENCE IS OUR GREATEST BLESSING
        </p>

        {/* ACTION CONTROLS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onShowerPetals}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#D4AF37]/50 text-[#FFDF85] text-xs font-cinzel font-semibold tracking-wider flex items-center gap-2 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Shower Petals</span>
          </button>

          {/* VERIFIED BUTTON: REPLAY INVITATION */}
          <button
            onClick={onReplayInvitation}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#996515] via-[#C59A3F] to-[#996515] hover:brightness-110 text-white text-xs font-cinzel font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REPLAY INVITATION</span>
          </button>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 text-[11px] font-cinzel text-[#8A7968] tracking-widest uppercase">
          Javed Ansari & Roshan Ansari · Nehtour, Bijnor
        </div>
      </motion.div>
    </footer>
  );
};
