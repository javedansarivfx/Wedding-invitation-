import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface EnvelopeExperienceProps {
  onOpened: () => void;
  isOpen: boolean;
}

export const EnvelopeExperience: React.FC<EnvelopeExperienceProps> = ({
  onOpened,
  isOpen,
}) => {
  // Sequence stages:
  // 'idle' -> 'screen_darkening' -> 'golden_pulsing' -> 'seal_glowing' -> 'seal_cracking' -> 'flap_opening' -> 'card_emerging' -> 'complete'
  const [animStage, setAnimStage] = useState<
    | 'idle'
    | 'screen_darkening'
    | 'golden_pulsing'
    | 'seal_glowing'
    | 'seal_cracking'
    | 'flap_opening'
    | 'card_emerging'
    | 'complete'
  >('idle');

  const [pulseCount, setPulseCount] = useState(0);

  const handleTapSeal = () => {
    if (animStage !== 'idle') return;

    // Step 1: Screen slightly darkens
    setAnimStage('screen_darkening');

    // Step 2 & 3: Soft golden light pulses 3 times behind envelope
    setTimeout(() => {
      setAnimStage('golden_pulsing');
      setPulseCount(1);
    }, 450);

    setTimeout(() => {
      setPulseCount(2);
    }, 1100);

    setTimeout(() => {
      setPulseCount(3);
    }, 1750);

    // Step 6 & 7: Seal catches light and glows subtly + rim light
    setTimeout(() => {
      setAnimStage('seal_glowing');
    }, 2400);

    // Step 9 & 10: Wax seal gently cracks (sound effect + particles)
    setTimeout(() => {
      royalAudio.playWaxSealCrack();
      setAnimStage('seal_cracking');
    }, 3100);

    // Step 11 & 12: Envelope flap begins opening slowly with warm golden light from inside
    setTimeout(() => {
      setAnimStage('flap_opening');
    }, 3700);

    // Step 13 & 14: Invitation card emerges & unfolds
    setTimeout(() => {
      setAnimStage('card_emerging');
      royalAudio.start();
    }, 4500);

    // Step 17: Smooth cinematic transition into main invitation
    setTimeout(() => {
      setAnimStage('complete');
      onOpened();
    }, 6200);
  };

  if (isOpen && animStage === 'complete') {
    return null;
  }

  const isPulsing = animStage === 'golden_pulsing';
  const isGlowing = animStage === 'seal_glowing' || animStage === 'seal_cracking';
  const isFlapOpen =
    animStage === 'flap_opening' ||
    animStage === 'card_emerging' ||
    animStage === 'complete';
  const isCardEmerging =
    animStage === 'card_emerging' || animStage === 'complete';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: 1,
          backgroundColor:
            animStage === 'idle'
              ? 'rgba(250, 247, 242, 1)'
              : 'rgba(28, 20, 14, 0.94)',
        }}
        exit={{ opacity: 0, transition: { duration: 1.2 } }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none"
      >
        {/* Step 1 & 2: Volumetric Golden Aura behind envelope */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Base ambient paper texture */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(rgba(200, 162, 81, 0.12) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Golden Volumetric Light Pulses (Steps 2, 3, 4, 5) */}
          <motion.div
            animate={{
              scale:
                pulseCount === 1
                  ? [1, 1.25, 1.1]
                  : pulseCount === 2
                  ? [1.1, 1.45, 1.25]
                  : pulseCount === 3
                  ? [1.25, 1.7, 1.4]
                  : isFlapOpen
                  ? [1.4, 2.3]
                  : 1,
              opacity:
                isPulsing || isGlowing || isFlapOpen
                  ? pulseCount === 1
                    ? 0.45
                    : pulseCount === 2
                    ? 0.7
                    : 0.95
                  : 0.05,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(255,238,170,0.85)_0%,_rgba(212,175,55,0.45)_35%,_rgba(153,101,21,0.15)_65%,_transparent_75%)] blur-2xl"
          />

          {/* Step 12 & 16: Rising golden dust particles */}
          {(animStage === 'flap_opening' || animStage === 'card_emerging') && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight * 0.6 + Math.random() * 100,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    y: window.innerHeight * 0.2 - Math.random() * 200,
                    opacity: [0, 0.9, 0],
                    scale: [0.5, 1.4, 0.2],
                  }}
                  transition={{
                    duration: 2.2 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 0.8,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-[#FFF2B2] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                />
              ))}
            </div>
          )}
        </div>

        {/* Envelope Container: Occupies prominent portion of mobile & desktop screens */}
        <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-[1.35/1] flex flex-col items-center justify-center">
          {/* Main Envelope Body */}
          <motion.div
            layout
            animate={{
              boxShadow: isGlowing
                ? '0 30px 70px -10px rgba(0,0,0,0.7), 0 0 50px rgba(212,175,55,0.6)'
                : '0 25px 60px -15px rgba(0,0,0,0.4), 0 0 30px rgba(200,162,81,0.15)',
              borderColor: isGlowing ? '#E5C37A' : '#DECBB0',
            }}
            className="relative w-full h-full rounded-2xl bg-[#FAF6EE] border-2 shadow-2xl overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(#E8DFC8 0.75px, transparent 0.75px)',
              backgroundSize: '14px 14px',
            }}
          >
            {/* Step 8: Golden rim light on envelope edges */}
            {isGlowing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 border-2 border-[#FFE28A] rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(212,175,55,0.4)] z-20"
              />
            )}

            {/* Fine Botanical Line-Art & Arabesque Watermark */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 440 330"
                fill="none"
                stroke="#B8862D"
                strokeWidth="0.85"
              >
                {/* Botanical corner flourishes */}
                <path d="M 20 20 C 50 80, 80 50, 110 20 M 20 20 C 80 50, 50 80, 20 110" />
                <path d="M 420 20 C 390 80, 360 50, 330 20 M 420 20 C 360 50, 390 80, 420 110" />
                <path d="M 20 310 C 50 250, 80 280, 110 310 M 20 310 C 80 280, 50 250, 20 220" />
                <path d="M 420 310 C 390 250, 360 280, 330 310 M 420 310 C 360 280, 390 250, 420 220" />
                {/* Central circular arabesque medallion */}
                <circle cx="220" cy="165" r="105" strokeDasharray="4 4" />
                <circle cx="220" cy="165" r="118" strokeWidth="0.6" />
                <circle cx="220" cy="165" r="126" strokeDasharray="2 3" />
              </svg>
            </div>

            {/* Step 13 & 14: Emerging Handcrafted Card (Strictly NO DATES here!) */}
            <motion.div
              initial={false}
              animate={
                isCardEmerging
                  ? { y: -160, scale: 1.05, opacity: 1 }
                  : isFlapOpen
                  ? { y: -50, scale: 1.01, opacity: 1 }
                  : { y: 0, opacity: 0.95 }
              }
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-5 top-5 bottom-5 bg-[#FFFDF9] rounded-xl border border-[#D4AF37]/60 shadow-inner p-6 flex flex-col items-center justify-center text-center z-10"
            >
              <div className="font-amiri text-lg sm:text-xl text-[#996515] tracking-wide mb-1">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div className="text-[10px] tracking-[0.25em] text-[#8C6D3B] uppercase font-cinzel font-semibold mb-2">
                The Wedding Celebration of
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-[#3A291A]">
                Javed Ansari
              </h2>
              <div className="my-1 text-[#C59A3F] font-cinzel-decorative text-lg">
                &
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-[#3A291A]">
                Roshan Ansari
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C59A3F] to-transparent my-2" />
              <p className="font-cormorant italic text-xs sm:text-sm text-[#665443]">
                Cordially request the honour of your presence and heartfelt du’as
              </p>
            </motion.div>

            {/* Triangular Side & Bottom Paper Folds (Handcrafted 3D layering) */}
            <div className="absolute inset-0 pointer-events-none z-15">
              {/* Bottom fold */}
              <div
                className="absolute bottom-0 inset-x-0 h-1/2 bg-[#F6EFE5] border-t border-[#DFCEAF] shadow-[0_-6px_16px_rgba(0,0,0,0.04)]"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 36%, 100% 100%)',
                }}
              />
              {/* Left fold */}
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-[#F8F2E8] border-r border-[#DFCEAF]"
                style={{
                  clipPath: 'polygon(0% 0%, 46% 50%, 0% 100%)',
                }}
              />
              {/* Right fold */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-[#F8F2E8] border-l border-[#DFCEAF]"
                style={{
                  clipPath: 'polygon(100% 0%, 54% 50%, 100% 100%)',
                }}
              />
            </div>

            {/* Step 11: Top Envelope Flap (Flips open in 3D) */}
            <motion.div
              initial={false}
              animate={
                isFlapOpen
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 25 }
              }
              transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: 'top center',
                perspective: '1200px',
              }}
              className="absolute top-0 inset-x-0 h-3/5 bg-gradient-to-b from-[#ECE1CD] to-[#FAF6EE] border-b border-[#D5C29E] shadow-[0_12px_28px_rgba(0,0,0,0.1)]"
            >
              <div
                className="w-full h-full bg-[#FAF5EB] border-b border-[#D5C29E]"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              >
                {/* Gold foil hairline ornament along flap edge */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 440 200"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 12 4 L 220 188 L 428 4"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    opacity="0.8"
                  />
                  <path
                    d="M 22 4 L 220 180 L 418 4"
                    fill="none"
                    stroke="#C59A3F"
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Steps 6, 7, 9, 10: J & R WAX SEAL (Central Interactive Monogram Button) */}
            <AnimatePresence>
              {animStage !== 'complete' && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={
                    animStage === 'seal_cracking'
                      ? {
                          scale: [1, 1.12, 0.92],
                          rotate: [0, -6, 6, 0],
                          filter: 'drop-shadow(0 0 20px rgba(255,220,100,0.9))',
                        }
                      : isGlowing
                      ? {
                          scale: [1, 1.08, 1.04],
                          filter: 'drop-shadow(0 0 25px rgba(212,175,55,0.85))',
                        }
                      : isFlapOpen
                      ? { scale: 0, opacity: 0 }
                      : { scale: 1 }
                  }
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={handleTapSeal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleTapSeal();
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group select-none focus:outline-none"
                  aria-label="Tap J & R wax seal to open invitation"
                >
                  {/* Outer Wax Droplet 3D Body */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full wax-seal flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105 active:scale-95">
                    {/* Golden edge shimmer rim */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#FFE8A3]/70 shadow-[0_0_20px_rgba(212,175,55,0.5)]" />

                    {/* Inner Wax Medallion with Intertwined J & R */}
                    <div className="w-full h-full rounded-full border border-[#4D3008] flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#B8862D] via-[#8C5E1B] to-[#55360B] p-2 shadow-inner">
                      <div className="text-[9px] tracking-widest text-[#FFDF85]/80 font-cinzel font-semibold">
                        NIKAH
                      </div>
                      {/* Intertwined J & R Monogram */}
                      <div className="font-cinzel-decorative font-bold text-2xl sm:text-3xl tracking-widest text-[#FFF7D9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] my-0.5">
                        J & R
                      </div>
                      <div className="w-10 h-px bg-[#FFDF85]/40 my-0.5" />
                      <div className="text-[8px] tracking-[0.25em] text-[#FFDF85]/90 font-cinzel">
                        MUGHAL
                      </div>
                    </div>

                    {/* Subtle wax reflection gloss */}
                    <div className="absolute top-2.5 left-4 w-9 h-4 rounded-full bg-white/25 blur-[1px] rotate-[-35deg] pointer-events-none" />

                    {/* Step 10: Falling wax particles on crack */}
                    {animStage === 'seal_cracking' && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{
                              x: (Math.random() - 0.5) * 60,
                              y: Math.random() * 50 + 20,
                              opacity: 0,
                              scale: 0.3,
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-2 h-2 rounded-full bg-[#B8862D] shadow-xs"
                            style={{ left: '50%', top: '50%' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pulsing prompt badge beneath seal */}
                  {animStage === 'idle' && (
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 text-xs font-cinzel font-medium tracking-wide text-[#FAF7F2] bg-[#2D241E]/95 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-xl pointer-events-none"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                      <span>Tap J & R seal to open</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Envelope Bottom Caption (No wedding date) */}
          <div className="mt-8 text-center text-[#E8DFC8]/80 text-xs font-cormorant italic tracking-wider">
            Handcrafted with love for the union of Javed Ansari & Roshan Ansari
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
