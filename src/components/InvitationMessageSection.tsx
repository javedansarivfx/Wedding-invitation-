import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const InvitationMessageSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-[#F7F2E8]/60 border-t border-[#E8DFC8] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Mughal Arch Islamic Framing Card */}
        <div className="relative rounded-3xl bg-[#FFFDF9] border border-[#E2D2B5] p-8 sm:p-14 md:p-16 shadow-[0_15px_40px_-10px_rgba(200,162,81,0.15)]">
          {/* Top Calligraphic Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-[#C59A3F]/60" />
            <Sparkles className="w-4 h-4 text-[#C59A3F]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              Sacred Invitation
            </span>
            <Sparkles className="w-4 h-4 text-[#C59A3F]" />
            <span className="w-10 h-px bg-[#C59A3F]/60" />
          </motion.div>

          {/* Arabic Dua Header */}
          <motion.p
            dir="rtl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-amiri text-2xl sm:text-3xl text-[#996515] mb-6 leading-relaxed"
          >
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#C59A3F] to-transparent mx-auto mb-8"
          />

          {/* Verified Invitation Message Quote */}
          <blockquote className="my-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-[#3A291A] leading-relaxed max-w-2xl mx-auto"
            >
              “{WEDDING_DATA.invitationMessage}”
            </motion.p>
          </blockquote>

          {/* Gold Decorative Seal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 pt-6 border-t border-[#EFE5D3] flex items-center justify-center gap-3"
          >
            <div className="w-2 h-2 rotate-45 bg-[#C59A3F]" />
            <span className="font-cinzel text-xs tracking-widest text-[#8C6D3B] uppercase font-semibold">
              The Ansari & Khan Families
            </span>
            <div className="w-2 h-2 rotate-45 bg-[#C59A3F]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
