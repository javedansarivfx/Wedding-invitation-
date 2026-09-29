import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { royalAudio } from '../utils/audio';

// Reference image matching user's screenshot
import burgundyDoorImg from '../assets/images/royal_burgundy_door_1790696646563.jpg';

interface EnvelopeExperienceProps {
  onOpened: () => void;
  onDoorsOpening?: () => void;
  isOpen: boolean;
}

export const EnvelopeExperience: React.FC<EnvelopeExperienceProps> = ({
  onOpened,
  onDoorsOpening,
  isOpen,
}) => {
  // Animation stages:
  // 'idle' -> 'light_orbit' (smooth light travels around the button at medium speed)
  //        -> 'doors_opening' (doors swing open slowly & majestically like royal palace doors)
  //        -> 'complete'
  const [animStage, setAnimStage] = useState<
    'idle' | 'light_orbit' | 'doors_opening' | 'complete'
  >('idle');

  const handleTapSeal = () => {
    if (animStage !== 'idle') return;

    // Step 1: Smooth light travels at medium speed around the button (~1.5s)
    setAnimStage('light_orbit');
    royalAudio.playLightTravelChime();

    // Step 2: Once light completes orbit, doors open SLOWLY and MAJESTICALLY ("slow slow open hona chahiye")
    setTimeout(() => {
      setAnimStage('doors_opening');
      if (onDoorsOpening) {
        onDoorsOpening();
      }
      royalAudio.playDoorOpenSound();
      royalAudio.playWaxSealCrack();
      royalAudio.start();
    }, 1500);

    // Step 3: Once doors have slowly swung wide open, cleanly complete transition (4.2s total)
    setTimeout(() => {
      setAnimStage('complete');
      onOpened();
    }, 4500);
  };

  const handleSkipDirectly = (e: React.MouseEvent) => {
    e.stopPropagation();
    royalAudio.start();
    setAnimStage('complete');
    if (onDoorsOpening) onDoorsOpening();
    onOpened();
  };

  if (isOpen && animStage === 'complete') {
    return null;
  }

  const isLightOrbiting = animStage === 'light_orbit';
  const isDoorsOpening =
    animStage === 'doors_opening' || animStage === 'complete';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: animStage === 'complete' ? 0 : 1,
        }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="fixed inset-0 z-50 w-screen h-screen overflow-hidden select-none pointer-events-auto"
        style={{ perspective: 1800 }}
      >
        {/* ======================================================== */}
        {/* 1. LEFT DOOR PANEL (Slow, stately, majestic swing open)  */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
          }}
          animate={
            isDoorsOpening
              ? {
                  rotateY: -118,
                  x: '-12%',
                  opacity: [1, 1, 1, 0.7, 0],
                  transition: {
                    duration: 3.2, // Slow, majestic opening motion
                    ease: [0.16, 1, 0.3, 1],
                  },
                }
              : { rotateY: 0, x: '0%', opacity: 1 }
          }
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#240A10] border-r border-[#E0BC62] shadow-[8px_0_35px_rgba(0,0,0,0.85)] z-20"
        >
          {/* Deep Burgundy Velvet Texture with Embroidered Floral Vines */}
          <img
            src={burgundyDoorImg}
            alt="Left Door Velvet Texture"
            className="absolute inset-0 w-full h-full object-cover object-left"
          />

          {/* Velvet Wine Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Outer Golden Border Filigree */}
          <div className="absolute inset-2 sm:inset-4 border-2 border-[#D4AF37]/70 pointer-events-none rounded-l-xl" />
          <div className="absolute inset-3 sm:inset-6 border border-[#FFE28A]/40 pointer-events-none rounded-l-lg" />

          {/* Vertical Center Gold Trim Strip */}
          <div className="absolute inset-y-0 right-0 w-3.5 bg-gradient-to-r from-[#996515] via-[#FFE28A] to-[#C59A3F] border-l border-[#805010] shadow-[0_0_12px_rgba(212,175,55,0.4)] pointer-events-none" />

          {/* Left Half of Medallion when parting */}
          {isDoorsOpening && (
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 pointer-events-none">
              <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-full border-2 border-[#FFE28A] bg-gradient-to-b from-[#8C5E1B] via-[#4A2F0A] to-[#201006] shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-full h-full border border-[#D4AF37]/50 rounded-full flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-[#FFE28A] text-xl sm:text-2xl font-bold font-cinzel-decorative">
                    J
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ======================================================== */}
        {/* 2. RIGHT DOOR PANEL (Slow, stately, majestic swing open) */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
          }}
          animate={
            isDoorsOpening
              ? {
                  rotateY: 118,
                  x: '12%',
                  opacity: [1, 1, 1, 0.7, 0],
                  transition: {
                    duration: 3.2, // Slow, majestic opening motion
                    ease: [0.16, 1, 0.3, 1],
                  },
                }
              : { rotateY: 0, x: '0%', opacity: 1 }
          }
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#240A10] border-l border-[#E0BC62] shadow-[-8px_0_35px_rgba(0,0,0,0.85)] z-20"
        >
          {/* Deep Burgundy Velvet Texture Mirrored for Symmetrical Vines */}
          <img
            src={burgundyDoorImg}
            alt="Right Door Velvet Texture"
            className="absolute inset-0 w-full h-full object-cover object-right scale-x-[-1]"
          />

          {/* Velvet Wine Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Outer Golden Border Filigree */}
          <div className="absolute inset-2 sm:inset-4 border-2 border-[#D4AF37]/70 pointer-events-none rounded-r-xl" />
          <div className="absolute inset-3 sm:inset-6 border border-[#FFE28A]/40 pointer-events-none rounded-r-lg" />

          {/* Vertical Center Gold Trim Strip */}
          <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-[#C59A3F] via-[#FFE28A] to-[#996515] border-r border-[#805010] shadow-[0_0_12px_rgba(212,175,55,0.4)] pointer-events-none" />

          {/* Right Half of Medallion when parting */}
          {isDoorsOpening && (
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
              <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-full border-2 border-[#FFE28A] bg-gradient-to-b from-[#8C5E1B] via-[#4A2F0A] to-[#201006] shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-full h-full border border-[#D4AF37]/50 rounded-full flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-[#FFE28A] text-xl sm:text-2xl font-bold font-cinzel-decorative">
                    R
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ======================================================== */}
        {/* 3. CENTRAL INTERACTIVE LOCK BUTTON & LIGHT TRAVEL BEAM   */}
        {/* ======================================================== */}
        {!isDoorsOpening && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto">
            {/* SMOOTH TRAVELING LIGHT AT MEDIUM SPEED (orbits 360° around the button) */}
            {isLightOrbiting && (
              <>
                {/* Rotating Luminous Light Head & Comet Tail */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-36 h-44 sm:w-40 sm:h-48 rounded-full pointer-events-none z-40 flex items-center justify-center"
                >
                  {/* Golden Laser Spark Orb */}
                  <div
                    className="absolute -top-3 w-6 h-6 rounded-full bg-white shadow-[0_0_22px_7px_#FFE885,0_0_40px_14px_#D4AF37]"
                    style={{ filter: 'blur(0.5px)' }}
                  />
                  {/* Luminous Comet Tail around oval perimeter */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgba(255,255,255,0.95) 0deg, rgba(255,232,133,0.75) 45deg, rgba(212,175,55,0.3) 90deg, transparent 140deg)',
                      maskImage:
                        'radial-gradient(circle, transparent 66%, black 67%)',
                      WebkitMaskImage:
                        'radial-gradient(circle, transparent 66%, black 67%)',
                    }}
                  />
                </motion.div>

                {/* Golden Radiant Shockwave on Orbit Completion */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-[#FFE885] shadow-[0_0_40px_#FFE885] pointer-events-none"
                />
              </>
            )}

            {/* Pulsing Outer Shimmer Ring */}
            <div
              className={`absolute -inset-3 rounded-full border border-[#FFE28A]/50 transition-all duration-500 pointer-events-none ${
                isLightOrbiting
                  ? 'border-[#FFE885] shadow-[0_0_35px_rgba(255,232,133,0.95)] scale-105'
                  : 'animate-pulse'
              }`}
            />

            {/* Central Royal Oval Medallion Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={
                isLightOrbiting
                  ? {
                      scale: [1, 1.08, 1.04],
                      boxShadow: '0 0 50px rgba(255, 232, 133, 0.95)',
                    }
                  : {}
              }
              onClick={handleTapSeal}
              className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-full bg-gradient-to-b from-[#A06F24] via-[#6B420F] to-[#2B1607] border-3 border-[#FFE28A] p-2 flex flex-col items-center justify-center text-center cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85),_inset_0_2px_10px_rgba(255,255,255,0.5)] transition-all group focus:outline-none select-none"
              aria-label="Tap to unlock and open royal doors"
            >
              {/* Inner Golden Rim Line */}
              <div className="absolute inset-1.5 rounded-full border border-[#FFDF85]/60 pointer-events-none" />

              {/* Monogram Text */}
              <div className="text-[9px] tracking-widest text-[#FFDF85] font-cinzel uppercase font-semibold">
                NIKAH
              </div>

              <div className="font-cinzel-decorative text-xl sm:text-2xl font-bold tracking-widest text-[#FFF8E1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] my-0.5 sm:my-1">
                J & R
              </div>

              <div className="w-8 h-px bg-[#FFDF85]/60 my-0.5" />

              <div className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#FFE8A3] font-cinzel uppercase font-bold">
                OPEN
              </div>

              {/* Gloss Light Reflection on Wax Button */}
              <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/30 blur-[1px] -rotate-30 pointer-events-none" />
            </motion.button>

            {/* Pulsing prompt badge beneath button */}
            {animStage === 'idle' && (
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-11 whitespace-nowrap flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#18080C]/90 border border-[#D4AF37]/70 shadow-lg text-[#FFE8A3] font-cinzel text-[10px] sm:text-xs tracking-wider uppercase font-semibold pointer-events-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFE8A3] animate-spin" />
                <span>Tap to open doors</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Golden Light Burst from Center Seam when doors open */}
        {isDoorsOpening && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 0], scaleX: [0, 6, 1] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-transparent via-[#FFF4D0] to-transparent pointer-events-none z-30 blur-sm"
          />
        )}

        {/* Direct Skip Button at Bottom */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={handleSkipDirectly}
            className="text-[11px] font-cinzel text-[#FFE28A]/80 hover:text-[#FFF4D0] hover:underline underline-offset-4 tracking-widest uppercase transition-colors"
          >
            Directly Enter Website →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
