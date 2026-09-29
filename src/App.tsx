/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EnvelopeExperience } from './components/EnvelopeExperience';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { GroomFamilySection } from './components/GroomFamilySection';
import { BrideFamilySection } from './components/BrideFamilySection';
import { InvitationMessageSection } from './components/InvitationMessageSection';
import { GroomResidenceSection } from './components/GroomResidenceSection';
import { ScratchReveal } from './components/ScratchReveal';
import { EventsSection } from './components/EventsSection';
import { CountdownSection } from './components/CountdownSection';
import { CoupleGallery } from './components/CoupleGallery';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { FinalMonogram } from './components/FinalMonogram';
import { PetalCanvas } from './components/PetalCanvas';
import { ScrollDownIndicator } from './components/ScrollDownIndicator';
import { royalAudio } from './utils/audio';

const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08, margin: '0px 0px -40px 0px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
};

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isDoorsParting, setIsDoorsParting] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const handleDoorsOpening = () => {
    setIsDoorsParting(true);
    setIsPlayingMusic(true);
    setBurstTrigger((prev) => prev + 1);
  };

  const handleEnvelopeOpened = () => {
    setIsEnvelopeOpen(true);
    setIsDoorsParting(true);
    setIsPlayingMusic(true);
  };

  const handleReplayInvitation = () => {
    setIsEnvelopeOpen(false);
    setIsDoorsParting(false);
    setIsDateRevealed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    const active = royalAudio.toggle();
    setIsPlayingMusic(active);
  };

  const handleShowerPetals = () => {
    setBurstTrigger((prev) => prev + 1);
  };

  const handleDateRevealed = () => {
    setIsDateRevealed(true);
    handleShowerPetals();
  };

  const scrollToScratch = () => {
    const el = document.getElementById('scratch-date');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D241E] selection:bg-[#D4AF37]/20 selection:text-[#5C3B0E]">
      {/* Rose Petal Shower Canvas */}
      <PetalCanvas burstTrigger={burstTrigger} />

      {/* Floating Scroll Down Arrow Indicator (Visible after envelope opens) */}
      <ScrollDownIndicator visible={isEnvelopeOpen} />

      {/* Starting Screen: Sealed Luxury Envelope with J & R Wax Seal */}
      {!isEnvelopeOpen && (
        <EnvelopeExperience
          isOpen={isEnvelopeOpen}
          onDoorsOpening={handleDoorsOpening}
          onOpened={handleEnvelopeOpened}
        />
      )}

      {/* Main Wedding Website Header Navigation */}
      <Navigation
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onViewEnvelope={handleReplayInvitation}
        isDateRevealed={isDateRevealed}
      />

      <main>
        {/* Section 1: Grand Mughal Arch, Bismillah & Couple Introduction (Smooth Medium-Speed Reveal) */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={
            isDoorsParting || isEnvelopeOpen
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 35, scale: 0.98 }
          }
          transition={{ duration: 2.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroSection
            onShowerPetals={handleShowerPetals}
            onScrollToScratch={scrollToScratch}
          />
        </motion.div>

        {/* Section 2: Dedicated Groom Family */}
        <motion.div {...sectionMotionProps}>
          <GroomFamilySection />
        </motion.div>

        {/* Section 3: Dedicated Bride Family */}
        <motion.div {...sectionMotionProps}>
          <BrideFamilySection />
        </motion.div>

        {/* Section 4: Sacred Invitation Message */}
        <motion.div {...sectionMotionProps}>
          <InvitationMessageSection />
        </motion.div>

        {/* Section 5: Groom's Residence (Nehtour Village, Sikanderpur) */}
        <motion.div {...sectionMotionProps}>
          <GroomResidenceSection />
        </motion.div>

        {/* Section 6: Real Touch-Based Heart-Shaped Scratch Reveal (Reveals 05 Dec Nikah) */}
        <motion.div {...sectionMotionProps}>
          <ScratchReveal
            isRevealed={isDateRevealed}
            onRevealed={handleDateRevealed}
          />
        </motion.div>

        {/* Section 7: Countdown to Nikah (Target: 05 December) - Enabled upon Reveal */}
        {isDateRevealed && (
          <motion.div {...sectionMotionProps}>
            <CountdownSection isRevealed={isDateRevealed} />
          </motion.div>
        )}

        {/* Section 8: Wedding Events (04 Dec Haldi, 05 Dec Baraat & Nikah, 06 Dec Walima) */}
        <motion.div {...sectionMotionProps}>
          <EventsSection
            isRevealed={isDateRevealed}
            onScrollToScratch={scrollToScratch}
          />
        </motion.div>

        {/* Section 9: Couple Photo Gallery & Lightbox */}
        <motion.div {...sectionMotionProps}>
          <CoupleGallery />
        </motion.div>

        {/* Section 10: The Venue & Illustrated Map */}
        <motion.div {...sectionMotionProps}>
          <VenueSection />
        </motion.div>

        {/* Section 11: RSVP Form & WhatsApp Integration */}
        <motion.div {...sectionMotionProps}>
          <RsvpSection onShowerPetals={handleShowerPetals} />
        </motion.div>

        {/* Section 12: Final Page with J & R Monogram & Replay Invitation */}
        <motion.div {...sectionMotionProps}>
          <FinalMonogram
            onReplayInvitation={handleReplayInvitation}
            onShowerPetals={handleShowerPetals}
            isRevealed={isDateRevealed}
          />
        </motion.div>
      </main>
    </div>
  );
}
