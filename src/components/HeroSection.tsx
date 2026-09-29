import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface HeroSectionProps {
  onShowerPetals: () => void;
  onScrollToScratch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShowerPetals,
  onScrollToScratch,
}) => {
  return (
    <section id="bismillah" className="relative pt-8 pb-20 md:py-24 overflow-hidden luxury-paper">
      {/* Symmetrical Grand Mughal Arch Background with Warm Lighting */}
      <div className="absolute top-0 inset-x-0 h-[560px] md:h-[680px] pointer-events-none opacity-30 overflow-hidden">
        <img
          src="/src/assets/images/mughal_floral_arch_1790680981761.jpg"
          alt="Mughal Floral Arch"
          className="w-full h-full object-cover object-top filter blur-[0.6px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/50 to-[#FAF7F2]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Islamic Traditional Lanterns & Crescent Arch Ornament */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <svg className="w-6 h-10 text-[#C59A3F]/80 drop-shadow-sm" viewBox="0 0 24 40" fill="none" stroke="currentColor">
            <path d="M12 2v6M8 8h8l2 6-3 12h-6l-3-12 2-6zM10 26l2 4 2-4" strokeWidth="1.2" />
            <circle cx="12" cy="18" r="2.5" fill="#FFE28A" />
          </svg>
          <svg className="w-14 h-8 text-[#C59A3F]" viewBox="0 0 100 50" fill="currentColor">
            <path d="M 0 50 Q 50 0 100 50 Z" />
          </svg>
          <svg className="w-6 h-10 text-[#C59A3F]/80 drop-shadow-sm" viewBox="0 0 24 40" fill="none" stroke="currentColor">
            <path d="M12 2v6M8 8h8l2 6-3 12h-6l-3-12 2-6zM10 26l2 4 2-4" strokeWidth="1.2" />
            <circle cx="12" cy="18" r="2.5" fill="#FFE28A" />
          </svg>
        </div>

        {/* 1. BISMILLAH CALLIGRAPHY */}
        <div className="mb-8">
          <p
            dir="rtl"
            className="font-amiri text-3xl sm:text-5xl text-[#996515] tracking-wide leading-relaxed font-normal drop-shadow-xs"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#8C6D3B] uppercase mt-2 font-medium">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <p
            dir="rtl"
            className="font-amiri text-2xl sm:text-3xl text-[#996515] tracking-wide leading-relaxed mt-3"
          >
            الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
          </p>
        </div>

        {/* Decorative Gold Filigree Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="w-20 sm:w-36 h-px bg-gradient-to-r from-transparent to-[#C59A3F]" />
          <div className="w-3 h-3 rotate-45 border-2 border-[#C59A3F] bg-[#FAF7F2]" />
          <div className="w-20 sm:w-36 h-px bg-gradient-to-l from-transparent to-[#C59A3F]" />
        </div>

        {/* 2. COUPLE INTRODUCTION (Strictly no dates!) */}
        <div id="couple" className="py-6 sm:py-8 my-4 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-40 bg-[#FFE5A3]/25 blur-3xl rounded-full" />
          </div>

          <div className="relative space-y-8">
            {/* GROOM BLOCK */}
            <div className="text-center">
              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2B1D12] leading-tight">
                {WEDDING_DATA.groom.name}
              </h1>
              <p className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.25em] text-[#996515] uppercase mt-2">
                {WEDDING_DATA.groom.parentLine}
              </p>
            </div>

            {/* WEDS CONNECTIVE */}
            <div className="flex items-center justify-center gap-4 my-2">
              <div className="w-16 h-px bg-[#D4AF37]/60" />
              <span className="font-cinzel-decorative text-2xl sm:text-3xl text-[#C59A3F] font-bold tracking-widest uppercase">
                WEDS
              </span>
              <div className="w-16 h-px bg-[#D4AF37]/60" />
            </div>

            {/* BRIDE BLOCK */}
            <div className="text-center">
              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2B1D12] leading-tight">
                {WEDDING_DATA.bride.name}
              </h1>
              <p className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.25em] text-[#996515] uppercase mt-2">
                {WEDDING_DATA.bride.parentLine}
              </p>
            </div>
          </div>
        </div>

        {/* Action Callouts */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onShowerPetals}
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D4AF37]/70 hover:bg-[#FAF5EB] text-[#5C3B0E] font-cinzel text-xs font-semibold tracking-wider flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Shower Rose Petals</span>
          </button>

          <button
            onClick={onScrollToScratch}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#996515] via-[#C59A3F] to-[#996515] hover:brightness-110 text-white font-cinzel text-xs font-bold tracking-widest uppercase shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Discover Wedding Date</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
