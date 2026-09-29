import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { CountdownTime } from '../types';

interface CountdownSectionProps {
  isRevealed: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  isRevealed,
}) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!isRevealed) return;

    const targetDate = new Date(WEDDING_DATA.countdownTarget).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [isRevealed]);

  if (!isRevealed) {
    return null;
  }

  const handleAddNikahToCalendar = () => {
    const title = encodeURIComponent(
      'Nikah & Baraat — Javed Ansari & Roshan Ansari'
    );
    const details = encodeURIComponent(
      'The sacred Nikah and Baraat wedding celebrations of Javed Ansari & Roshan Ansari in Nehtour.'
    );
    const location = encodeURIComponent(
      `${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.shortAddress}`
    );
    const start = '20261205T120000Z';
    const end = '20261205T200000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-14 sm:py-20 relative bg-[#F4EFE6]/70 border-t border-[#E8DFC8]">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="font-amiri text-lg text-[#996515] mb-1">
          بِسْمِ اللَّهِ · اقْتَرَبَ الْمَوْعِدُ الْمُبَارَكُ
        </div>
        <h3 className="font-cinzel text-xl sm:text-3xl font-bold tracking-wider text-[#3A291A] uppercase mb-1">
          COUNTDOWN TO OUR NIKAH
        </h3>
        <p className="font-cinzel text-xs font-semibold tracking-widest text-[#996515] uppercase mb-8">
          TARGET: 05 DECEMBER
        </p>

        {/* 4 Pillars with Antique Gold Numbers */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-6 max-w-2xl mx-auto mb-8">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Seconds', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-3 sm:p-6 rounded-2xl bg-white border border-[#E2D2B5] shadow-[0_8px_25px_-6px_rgba(200,162,81,0.15)] flex flex-col items-center justify-center group"
            >
              <div className="absolute top-1.5 inset-x-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
              <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-extrabold tabular-nums gold-gradient-text">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6D3B] mt-1.5 sm:mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddNikahToCalendar}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF5EB] border border-[#D4AF37]/60 text-[#5C3B0E] font-cinzel text-xs font-semibold tracking-wider flex items-center gap-2 mx-auto shadow-xs transition-all active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5 text-[#996515]" />
          <span>Save 05 December to Google Calendar</span>
        </button>
      </motion.div>
    </section>
  );
};
