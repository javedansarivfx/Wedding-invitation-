import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { WEDDING_EVENTS, WeddingEvent } from '../data/weddingData';

interface EventsSectionProps {
  isRevealed: boolean;
  onScrollToScratch: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  isRevealed,
  onScrollToScratch,
}) => {
  const addToCalendar = (event: WeddingEvent) => {
    const title = encodeURIComponent(`${event.name} — Javed & Roshan Wedding`);
    const times = event.timingDetails.map((t) => `${t.label}: ${t.time} (${t.sublabel || ''})`).join('\n');
    const details = encodeURIComponent(`${event.description}\n\n${times}\nVenue: ${event.venueTitle}, ${event.address}`);
    const location = encodeURIComponent(`${event.venueTitle}, ${event.address}`);
    
    let dateStr = '20261204';
    if (event.id === 'nikah') dateStr = '20261205';
    if (event.id === 'walima') dateStr = '20261206';

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T120000Z/${dateStr}T200000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="events" className="py-20 md:py-28 relative luxury-paper overflow-hidden border-t border-[#E8DFC8]">
      {/* Decorative Floral Background Watermark */}
      <div className="absolute right-0 top-1/4 w-80 h-80 opacity-15 pointer-events-none">
        <img
          src="/src/assets/images/floral_botanical_corner_1790681003724.jpg"
          alt="Floral ornament"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

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
              The Wedding Schedule
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
            Celebration of Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant italic text-base sm:text-lg text-[#665443]"
          >
            Every ceremony is a tapestry of family warmth, sacred tradition, and heartfelt du’as.
          </motion.p>
        </div>

        {!isRevealed ? (
          /* Locked State if date hasn't been scratched yet */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E2D2B5] text-center shadow-md"
          >
            <Sparkles className="w-8 h-8 text-[#C59A3F] mx-auto mb-3 animate-pulse" />
            <h3 className="font-cinzel text-lg font-bold text-[#3A291A] mb-2">
              Event Dates Locked
            </h3>
            <p className="font-cormorant italic text-sm text-[#665443] mb-5">
              Please scratch the gold foil heart above to reveal the dates and ceremonial timings.
            </p>
            <button
              onClick={onScrollToScratch}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#996515] to-[#C59A3F] text-white font-cinzel text-xs font-bold tracking-wider shadow-sm active:scale-95"
            >
              Go to Scratch Reveal
            </button>
          </motion.div>
        ) : (
          /* Unlocked Event Schedule Cards (04 Dec, 05 Dec, 06 Dec) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {WEDDING_EVENTS.map((event, index) => {
              const isGrandest = event.id === 'nikah';

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    delay: index * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group ${
                    isGrandest
                      ? 'bg-gradient-to-b from-[#FFFDF8] via-white to-[#FAF6EE] border-2 border-[#D4AF37] shadow-[0_20px_50px_-10px_rgba(200,162,81,0.28)] lg:-translate-y-2'
                      : 'bg-white border border-[#E8DFC8] shadow-[0_10px_30px_-10px_rgba(200,162,81,0.12)] hover:shadow-xl'
                  }`}
                >
                  {/* Grand Event Badge */}
                  {isGrandest && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#996515] via-[#D4AF37] to-[#996515] text-white px-4 py-1 rounded-full text-[10px] font-cinzel font-bold tracking-widest uppercase shadow-sm">
                      Grand Auspicious Ceremony
                    </div>
                  )}

                  <div>
                    {/* Header: Date & Arabic Calligraphy */}
                    <div className="border-b border-[#F0E6D2] pb-4 mb-5 flex items-center justify-between">
                      <div>
                        <span className="font-cinzel text-xs font-bold text-[#C59A3F] tracking-widest block">
                          EVENT 0{index + 1}
                        </span>
                        <span className="font-cinzel text-xl sm:text-2xl font-black text-[#2B1D12] tracking-wider mt-0.5 block">
                          {event.dateStr}
                        </span>
                      </div>
                      <span className="font-amiri text-lg text-[#8C6D3B]">
                        {event.arabicName}
                      </span>
                    </div>

                    {/* Event Name */}
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#3A291A] mb-3 group-hover:text-[#996515] transition-colors">
                      {event.name}
                    </h3>

                    <p className="font-cormorant italic text-sm text-[#665443] leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Exact Timings */}
                    <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#E8DFC8] mb-6 space-y-3">
                      {event.timingDetails.map((timing, tIdx) => (
                        <div
                          key={tIdx}
                          className="flex items-center justify-between text-xs font-cinzel"
                        >
                          <div className="flex items-center gap-2 text-[#5C3B0E]">
                            <Clock className="w-3.5 h-3.5 text-[#C59A3F]" />
                            <span className="font-bold tracking-wider">
                              {timing.label}:
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#3A291A] text-sm">
                              {timing.time}
                            </span>
                            {timing.sublabel && (
                              <span className="text-[10px] text-[#8C6D3B] tracking-wider block uppercase">
                                {timing.sublabel}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Venue & Address */}
                    <div className="space-y-3 mb-6 pt-2 border-t border-[#F5EFE6]">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#996515] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-cinzel text-xs font-bold text-[#3A291A]">
                            {event.venueTitle}
                          </div>
                          <div className="text-xs text-[#735E4B]">
                            {event.address}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Suggested Attire */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#8C6D3B] mb-2">
                        <span>Attire Palette</span>
                        <div className="flex items-center gap-1.5">
                          {event.dressColorPalette.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#5C4A3A]">
                        {event.dressCode}
                      </p>
                    </div>
                  </div>

                  {/* Calendar Save Button */}
                  <button
                    onClick={() => addToCalendar(event)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D4AF37]/60 text-[#5C3B0E] font-cinzel text-xs font-semibold tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#996515]" />
                    <span>Save {event.dateStr} to Calendar</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
