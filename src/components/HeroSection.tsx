import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Islamic Traditional Lanterns & Crescent Arch Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-6"
        >
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
        </motion.div>

        {/* 1. BISMILLAH CALLIGRAPHY (Staggered text animation) */}
        <div className="mb-8">
          <motion.p
            dir="rtl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-amiri text-3xl sm:text-5xl text-[#996515] tracking-wide leading-relaxed font-normal drop-shadow-xs"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#8C6D3B] uppercase mt-2 font-medium"
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </motion.p>
          <motion.p
            dir="rtl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-amiri text-2xl sm:text-3xl text-[#996515] tracking-wide leading-relaxed mt-3"
          >
            الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
          </motion.p>
        </div>

        {/* Decorative Gold Filigree Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <div className="w-20 sm:w-36 h-px bg-gradient-to-r from-transparent to-[#C59A3F]" />
          <div className="w-3 h-3 rotate-45 border-2 border-[#C59A3F] bg-[#FAF7F2]" />
          <div className="w-20 sm:w-36 h-px bg-gradient-to-l from-transparent to-[#C59A3F]" />
        </motion.div>

        {/* 2. COUPLE INTRODUCTION (Strictly no dates!) */}
        <div id="couple" className="py-6 sm:py-8 my-4 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-40 bg-[#FFE5A3]/25 blur-3xl rounded-full" />
          </div>

          <div className="relative space-y-8">
            {/* GROOM BLOCK */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2B1D12] leading-tight">
                {WEDDING_DATA.groom.name}
              </h1>
              <p className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.25em] text-[#996515] uppercase mt-2">
                {WEDDING_DATA.groom.parentLine}
              </p>
            </motion.div>

            {/* WEDS CONNECTIVE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center justify-center gap-4 my-2"
            >
              <div className="w-16 h-px bg-[#D4AF37]/60" />
              <span className="font-cinzel-decorative text-2xl sm:text-3xl text-[#C59A3F] font-bold tracking-widest uppercase">
                WEDS
              </span>
              <div className="w-16 h-px bg-[#D4AF37]/60" />
            </motion.div>

            {/* BRIDE BLOCK */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2B1D12] leading-tight">
                {WEDDING_DATA.bride.name}
              </h1>
              <p className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.25em] text-[#996515] uppercase mt-2">
                {WEDDING_DATA.bride.parentLine}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Callouts */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
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
        </motion.div>

        {/* Scroll Down Arrow Indicator (Prominent after envelope opens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 flex justify-center"
        >
          <button
            onClick={() => {
              const el = document.getElementById('groom-family');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-2 group text-[#996515] hover:text-[#5C3B0E] transition-all focus:outline-none"
            aria-label="Scroll down to explore wedding invitation"
          >
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#996515] group-hover:text-[#5C3B0E] transition-colors">
              Scroll Down to Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-white/90 shadow-[0_4px_15px_rgba(212,175,55,0.25)] flex items-center justify-center group-hover:bg-[#FAF5EB] group-hover:scale-105 transition-transform"
            >
              <ChevronDown className="w-5 h-5 text-[#996515]" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
