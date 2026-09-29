import React from 'react';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const GroomResidenceSection: React.FC = () => {
  const { residence } = WEDDING_DATA.groom;

  return (
    <section className="py-16 md:py-20 relative bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Residence Card with Handcrafted Botanical Stamp Look */}
        <div className="rounded-3xl bg-[#FFFDF9] border border-[#E2D2B5] p-8 sm:p-10 shadow-sm relative">
          <div className="w-12 h-12 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-4">
            <Home className="w-5 h-5 text-[#996515]" />
          </div>

          <span className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#996515] block mb-2">
            {residence.title}
          </span>

          <div className="w-16 h-px bg-[#D4AF37]/50 mx-auto my-3" />

          {/* Residence lines in clear elegant hierarchy */}
          <div className="space-y-1 my-4">
            <p className="font-cinzel text-lg sm:text-xl font-bold text-[#3A291A]">
              {residence.village}
            </p>
            <p className="font-cinzel text-base font-semibold text-[#5C4A3A]">
              {residence.locality}
            </p>
            <p className="font-cinzel text-sm font-semibold tracking-wider text-[#735E4B]">
              {residence.district}
            </p>
            <p className="font-cinzel text-sm font-bold text-[#996515] tracking-widest pt-1">
              {residence.houseNo}
            </p>
          </div>

          <p className="font-cormorant italic text-xs text-[#8C7A68] mt-4 pt-3 border-t border-[#F2E8D8]">
            * Note: This is the family residence. For reception banquet venue details, kindly refer to the Venue guide below.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
