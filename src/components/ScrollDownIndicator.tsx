import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ScrollDownIndicatorProps {
  visible: boolean;
}

export const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
  visible,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const target = document.getElementById('couple') || document.getElementById('groom-family');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!hasScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
        >
          <button
            onClick={handleScrollDown}
            aria-label="Scroll down to explore wedding invitation"
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_8px_25px_rgba(200,162,81,0.25)] hover:bg-[#FAF5EB] text-[#5C3B0E] transition-all active:scale-95 group focus:outline-none"
          >
            <span className="font-cinzel text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#996515] group-hover:text-[#5C3B0E] transition-colors whitespace-nowrap">
              Scroll Down to Explore
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center -space-y-2 text-[#C59A3F] group-hover:text-[#996515] transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
              <ChevronDown className="w-4 h-4 opacity-50" />
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
