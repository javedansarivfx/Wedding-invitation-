import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { COUPLE_GALLERY_ITEMS } from '../data/weddingData';

export const CoupleGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % COUPLE_GALLERY_ITEMS.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + COUPLE_GALLERY_ITEMS.length) %
        COUPLE_GALLERY_ITEMS.length
    );
  };

  const currentItem =
    selectedIndex !== null ? COUPLE_GALLERY_ITEMS[selectedIndex] : null;

  return (
    <section
      id="gallery"
      className="py-20 md:py-28 relative bg-[#F7F3EB]/70 border-t border-[#E8DFC8]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="w-8 h-px bg-[#C59A3F]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              Sacred Portraits & Milestones
            </span>
            <span className="w-8 h-px bg-[#C59A3F]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-[#3A291A] mb-3"
          >
            Javed & Roshan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant italic text-base sm:text-lg text-[#665443]"
          >
            “And We created you in pairs” — artistic reflections of grace, devotion, and cherished beginnings.
          </motion.p>
        </div>

        {/* 3 Mughal Arch Framed Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COUPLE_GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                delay: idx * 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setSelectedIndex(idx)}
              className="cursor-pointer group relative rounded-3xl bg-white border border-[#E2D2B5] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Mughal Arch Upper Profile Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-55 transition-opacity" />

                {/* Inspect Affordance Badge */}
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#5C3B0E] opacity-90 group-hover:scale-110 transition-all shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="font-cinzel text-[11px] tracking-wider uppercase opacity-95">
                    PORTRAIT 0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Card Caption Text */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-cinzel text-xs font-bold text-[#C59A3F]">
                      MEMOIR
                    </span>
                    <span className="font-amiri text-sm text-[#8C6D3B]">
                      {item.arabicSubtitle}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-[#3A291A] mb-2 group-hover:text-[#996515] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-cormorant italic text-sm text-[#5C4A3A] leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F0E6D2] flex items-center gap-1.5 text-xs font-cinzel text-[#8C6D3B] group-hover:text-[#5C3B0E]">
                  <span>Tap to view full portrait</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Full-Screen Interactive View with Prev / Next Navigation */}
      {currentItem && selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#FAF7F2] rounded-3xl border border-[#D4AF37]/60 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-[#D4AF37]/50 flex items-center justify-center text-[#3A291A] hover:bg-[#FAF5EB] transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left / Right Navigation */}
            <button
              onClick={handlePrev}
              aria-label="Previous portrait"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#3A291A] transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next portrait"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#3A291A] transition-all shadow-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Frame */}
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-80" />
            </div>

            {/* Text Description */}
            <div className="p-6 sm:p-8 -mt-6 relative bg-[#FAF7F2]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#996515]">
                  Portrait {selectedIndex + 1} of {COUPLE_GALLERY_ITEMS.length}
                </span>
                <span className="font-amiri text-lg text-[#8C6D3B]">
                  {currentItem.arabicSubtitle}
                </span>
              </div>

              <h3 className="font-cinzel text-2xl font-bold text-[#3A291A] mb-2">
                {currentItem.title}
              </h3>

              <p className="font-cormorant italic text-base text-[#4A3B2C] leading-relaxed mb-6">
                {currentItem.description}
              </p>

              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between text-xs font-cinzel text-[#7D6B58]">
                <span>Javed & Roshan · Wedding Collection</span>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="px-4 py-2 rounded-lg bg-[#FAF5EB] border border-[#D4AF37]/50 text-[#5C3B0E] font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
