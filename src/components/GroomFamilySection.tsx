import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const GroomFamilySection: React.FC = () => {
  const { groom } = WEDDING_DATA;

  return (
    <section
      id="groom-family"
      className="py-16 md:py-24 relative bg-[#F7F2E8]/60 border-t border-[#E8DFC8] overflow-hidden"
    >
      {/* Decorative Floral Branch Accent in Background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/floral_botanical_corner_1790681003724.jpg"
          alt="Botanical ornament"
          className="w-full h-full object-contain -scale-x-100"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Botanical Paper Frame Container with Classical Column Silhouette */}
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E2D2B5] p-8 sm:p-12 shadow-[0_15px_40px_-10px_rgba(200,162,81,0.15)] text-center relative">
          {/* Subtle Corner Gold Brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-lg pointer-events-none" />

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Users className="w-4 h-4 text-[#C59A3F]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              Groom's Esteemed Family
            </span>
            <Users className="w-4 h-4 text-[#C59A3F]" />
          </motion.div>

          {/* 1. JAVED ANSARI */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-[#3A291A] mb-1"
          >
            {groom.name}
          </motion.h2>

          {/* 2. SON OF FAROOK ANSARI */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.2em] text-[#996515] uppercase mb-8"
          >
            {groom.parentLine}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-px bg-gradient-to-r from-transparent via-[#C59A3F] to-transparent mx-auto mb-8"
          />

          {/* 3. BROTHERS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto mb-5 p-5 rounded-2xl bg-[#FAF5EB] border border-[#E8DFC8]"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#C59A3F]/50" />
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#5C3B0E]">
                GROOM'S BROTHERS
              </h3>
              <span className="w-6 h-px bg-[#C59A3F]/50" />
            </div>
            <div className="space-y-1.5">
              {groom.brothers.map((brother, idx) => (
                <p
                  key={idx}
                  className="font-cinzel text-base sm:text-lg font-semibold text-[#3A291A] tracking-wide"
                >
                  {brother}
                </p>
              ))}
            </div>
          </motion.div>

          {/* 3.1 BROTHERS-IN-LAW (Sakib Ansari & Gufran Ansari) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto mb-8 p-5 rounded-2xl bg-[#FAF5EB] border-2 border-[#D4AF37]/50 shadow-xs"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#C59A3F]/50" />
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#996515]">
                BROTHERS-IN-LAW
              </h3>
              <span className="w-6 h-px bg-[#C59A3F]/50" />
            </div>
            <div className="space-y-1.5">
              {groom.brothersInLaw.map((bil, idx) => (
                <p
                  key={idx}
                  className="font-cinzel text-base sm:text-lg font-bold text-[#3A291A] tracking-wide"
                >
                  {bil}
                </p>
              ))}
            </div>
          </motion.div>

          {/* 4. PATERNAL FAMILY (Strictly separated) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto p-6 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs"
          >
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D3B] mb-4">
              PATERNAL FAMILY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left">
              {groom.paternalFamily.map((member, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE5D3] flex items-center justify-center sm:justify-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59A3F] shrink-0" />
                  <span className="font-cinzel text-xs sm:text-sm font-semibold text-[#3A291A]">
                    {member}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
