import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const BrideFamilySection: React.FC = () => {
  const { bride } = WEDDING_DATA;

  return (
    <section
      id="bride-family"
      className="py-16 md:py-24 relative bg-[#FAF7F2] border-t border-[#E8DFC8] overflow-hidden"
    >
      {/* Botanical Floral Corner */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/floral_botanical_corner_1790681003724.jpg"
          alt="Botanical corner"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 relative"
      >
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E2D2B5] p-8 sm:p-12 shadow-[0_15px_40px_-10px_rgba(200,162,81,0.15)] text-center relative">
          {/* Subtle Corner Gold Brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-lg pointer-events-none" />

          {/* Section Heading */}
          <div className="inline-flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-[#C59A3F] fill-[#C59A3F]/20" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              Bride's Esteemed Family
            </span>
            <Heart className="w-4 h-4 text-[#C59A3F] fill-[#C59A3F]/20" />
          </div>

          {/* 1. ROSHAN ANSARI */}
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-[#3A291A] mb-1">
            {bride.name}
          </h2>

          {/* 2. DAUGHTER OF HAZI RAESUDDIN */}
          <p className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.2em] text-[#996515] uppercase mb-8">
            {bride.parentLine}
          </p>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C59A3F] to-transparent mx-auto mb-8" />

          {/* FATHER BLOCK */}
          <div className="max-w-md mx-auto mb-6 p-5 rounded-2xl bg-[#FAF5EB] border border-[#E8DFC8]">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#5C3B0E] mb-2">
              FATHER
            </h3>
            <p className="font-cinzel text-lg sm:text-xl font-bold text-[#3A291A]">
              {bride.father}
            </p>
          </div>

          {/* BROTHER BLOCK */}
          <div className="max-w-md mx-auto mb-8 p-5 rounded-2xl bg-[#FAF5EB] border border-[#E8DFC8]">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#5C3B0E] mb-2">
              BROTHER
            </h3>
            <p className="font-cinzel text-lg sm:text-xl font-bold text-[#3A291A]">
              {bride.brother}
            </p>
          </div>

          {/* BRIDE VILLAGE */}
          <div className="max-w-md mx-auto pt-6 border-t border-[#EFE5D3]">
            <span className="font-cinzel text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C6D3B] block mb-1">
              ANCESTRAL HOME
            </span>
            <p className="font-cinzel text-base font-bold text-[#3A291A] tracking-wider">
              {bride.village}
            </p>
            <p className="font-cinzel text-sm font-semibold text-[#665443] tracking-widest mt-0.5">
              {bride.city}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
