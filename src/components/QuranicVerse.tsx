import React from 'react';

export const QuranicVerse: React.FC = () => {
  return (
    <section id="blessing" className="py-16 md:py-24 relative overflow-hidden bg-[#F7F2E8]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Arch Shaped Frame Card */}
        <div className="relative rounded-3xl bg-[#FFFDF9] border border-[#E2D2B5] p-8 sm:p-12 md:p-16 shadow-[0_15px_40px_-10px_rgba(200,162,81,0.15)] text-center">
          {/* Corner Floral Ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-xl pointer-events-none" />

          {/* Top Calligraphic Ornament */}
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#C59A3F]/50" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              The Sacred Covenant
            </span>
            <span className="w-8 h-px bg-[#C59A3F]/50" />
          </div>

          {/* Arabic Verse in Beautiful Script */}
          <blockquote className="my-6">
            <p 
              dir="rtl" 
              className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#3A291A] leading-[2.2] tracking-wide font-normal"
            >
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </p>
          </blockquote>

          {/* Gold Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C59A3F] to-transparent mx-auto my-6" />

          {/* English Translation */}
          <p className="font-cormorant italic text-base sm:text-xl text-[#5C4A3A] max-w-2xl mx-auto leading-relaxed">
            “And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who reflect.”
          </p>

          <p className="font-cinzel text-xs tracking-widest text-[#8C6D3B] uppercase mt-4">
            Surah Ar-Rum · 30:21
          </p>

          {/* Du'a Blessing */}
          <div className="mt-8 pt-6 border-t border-[#EFE5D3] max-w-xl mx-auto">
            <p dir="rtl" className="font-amiri text-xl text-[#996515]">
              بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="font-cormorant italic text-sm text-[#735E4B] mt-1">
              “May Allah bless you both, shower His blessings upon you, and unite you in goodness.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
