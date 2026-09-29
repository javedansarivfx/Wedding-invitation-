import React from 'react';
import { Volume2, VolumeX, Mail } from 'lucide-react';

interface NavigationProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onViewEnvelope: () => void;
  isDateRevealed: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onViewEnvelope,
  isDateRevealed,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Couple Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#3A291A] hover:text-[#996515] transition-colors whitespace-nowrap"
        >
          Javed & Roshan
        </a>

        {/* Clean Text Navigation Links (Strictly no dates) */}
        <nav className="hidden lg:flex items-center gap-5 text-[11px] uppercase tracking-widest font-cinzel font-semibold text-[#665443]">
          <button
            onClick={() => scrollTo('bismillah')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            Bismillah
          </button>
          <button
            onClick={() => scrollTo('couple')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            The Couple
          </button>
          <button
            onClick={() => scrollTo('groom-family')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            Groom Family
          </button>
          <button
            onClick={() => scrollTo('bride-family')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            Bride Family
          </button>
          <button
            onClick={() => scrollTo('scratch-date')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8 text-[#996515]"
          >
            {isDateRevealed ? 'Revealed Date' : 'Reveal Date'}
          </button>
          {isDateRevealed && (
            <button
              onClick={() => scrollTo('events')}
              className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
            >
              Events
            </button>
          )}
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            Venue
          </button>
          <button
            onClick={() => scrollTo('rsvp')}
            className="hover:text-[#996515] transition-colors hover:underline underline-offset-8"
          >
            RSVP
          </button>
        </nav>

        {/* Primary Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Play/Pause Toggle */}
          <button
            onClick={onToggleMusic}
            aria-label={isPlayingMusic ? 'Mute background instrumental music' : 'Play background instrumental music'}
            className="h-9 px-3 rounded-lg border border-[#D4AF37]/60 bg-[#FAF5EB] hover:bg-[#F3EAD8] text-[#5C3B0E] text-xs font-cinzel tracking-wider flex items-center gap-2 transition-all active:scale-95"
            title="Arabic & South Asian Instrumental Music"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-[#C59A3F] animate-pulse" />
                <span className="hidden sm:inline font-medium">Oud Melody</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#8C6D3B]" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          {/* Envelope view button */}
          <button
            onClick={onViewEnvelope}
            aria-label="Re-open envelope"
            className="h-9 px-3 rounded-lg border border-[#D4AF37]/50 bg-[#FAF5EB] hover:bg-[#F3EAD8] text-[#5C3B0E] text-xs font-cinzel tracking-wider flex items-center gap-1.5 transition-all active:scale-95"
            title="Replay Envelope Opening"
          >
            <Mail className="w-4 h-4 text-[#996515]" />
            <span className="hidden md:inline">Envelope</span>
          </button>

          {/* Primary RSVP CTA */}
          <button
            onClick={() => scrollTo('rsvp')}
            className="h-9 px-4 rounded-lg bg-gradient-to-r from-[#996515] via-[#C59A3F] to-[#996515] text-[#FFFDF9] font-cinzel text-xs font-semibold tracking-widest uppercase hover:brightness-110 shadow-xs transition-all whitespace-nowrap active:scale-95"
          >
            RSVP
          </button>
        </div>
      </div>
    </header>
  );
};
