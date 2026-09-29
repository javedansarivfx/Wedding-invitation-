/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { royalAudio } from './utils/audio';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const handleEnvelopeOpened = () => {
    setIsEnvelopeOpen(true);
    setIsPlayingMusic(true);
    setBurstTrigger((prev) => prev + 1);
  };

  const handleReplayInvitation = () => {
    setIsEnvelopeOpen(false);
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

      {/* Starting Screen: Sealed Luxury Envelope with J & R Wax Seal */}
      {!isEnvelopeOpen && (
        <EnvelopeExperience
          isOpen={isEnvelopeOpen}
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
        {/* Section 1: Grand Mughal Arch, Bismillah & Couple Introduction */}
        <HeroSection
          onShowerPetals={handleShowerPetals}
          onScrollToScratch={scrollToScratch}
        />

        {/* Section 2: Dedicated Groom Family */}
        <GroomFamilySection />

        {/* Section 3: Dedicated Bride Family */}
        <BrideFamilySection />

        {/* Section 4: Sacred Invitation Message */}
        <InvitationMessageSection />

        {/* Section 5: Groom's Residence (Nehtour Village, Sikanderpur) */}
        <GroomResidenceSection />

        {/* Section 6: Real Touch-Based Heart-Shaped Scratch Reveal (Reveals 04 Dec Haldi) */}
        <ScratchReveal
          isRevealed={isDateRevealed}
          onRevealed={handleDateRevealed}
        />

        {/* Section 7: Countdown to Nikah (Target: 05 December) - Enabled upon Reveal */}
        <CountdownSection isRevealed={isDateRevealed} />

        {/* Section 8: Wedding Events (04 Dec Haldi, 05 Dec Baraat & Nikah, 06 Dec Walima) */}
        <EventsSection
          isRevealed={isDateRevealed}
          onScrollToScratch={scrollToScratch}
        />

        {/* Section 9: Couple Photo Gallery & Lightbox */}
        <CoupleGallery />

        {/* Section 10: The Venue & Illustrated Map */}
        <VenueSection />

        {/* Section 11: RSVP Form & WhatsApp Integration */}
        <RsvpSection onShowerPetals={handleShowerPetals} />

        {/* Section 12: Final Page with J & R Monogram & Replay Invitation */}
        <FinalMonogram
          onReplayInvitation={handleReplayInvitation}
          onShowerPetals={handleShowerPetals}
          isRevealed={isDateRevealed}
        />
      </main>
    </div>
  );
}
