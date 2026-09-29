import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation as NavIcon, Moon, Car, Compass } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const VenueSection: React.FC = () => {
  const { venue } = WEDDING_DATA;

  const handleOpenMaps = () => {
    const addressQuery = encodeURIComponent(`${venue.name}, ${venue.shortAddress}`);
    window.open(`https://maps.google.com/?q=${addressQuery}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="venue" className="py-20 md:py-28 relative luxury-paper overflow-hidden border-t border-[#E8DFC8]">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-px bg-[#C59A3F]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              The Royal Gathering
            </span>
            <span className="w-8 h-px bg-[#C59A3F]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-[#3A291A] mb-3">
            THE VENUE
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-[#665443]">
            Curated arrangements to ensure grace, hospitality, and comfort for all honored guests.
          </p>
        </div>

        {/* Venue Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Illustrated Ivory Map with Gold Roads & Filigree (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E2D2B5] overflow-hidden shadow-lg">
            {/* Illustrated Map Artwork */}
            <div className="relative aspect-[16/10] bg-[#FAF7F2] overflow-hidden">
              <img
                src={venue.mapImage}
                alt="Illustrated Map of Nehtour, Bijnor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Pin Marker & Header Overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#D4AF37]/60 flex items-center gap-2 shadow-xs">
                <MapPin className="w-4 h-4 text-[#996515]" />
                <span className="font-cinzel text-[11px] font-bold text-[#3A291A]">
                  NEHTOUR, BIJNOR
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-amiri text-lg text-[#FFDF85] block">
                  قاعة القصر الإمبراطوري الملكي
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight">
                  {venue.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#F5EFE6] opacity-95 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{venue.address}</span>
                </p>
                <p className="font-cinzel text-[11px] tracking-wider text-[#FFDF85] font-semibold mt-1">
                  {venue.shortAddress}
                </p>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-cinzel text-xs font-bold text-[#3A291A] uppercase tracking-wider block">
                  Location Coordinate
                </span>
                <p className="text-xs text-[#735E4B] mt-0.5">
                  Baraat & Nikah solemnization ceremonies will be hosted here.
                </p>
              </div>

              <button
                onClick={handleOpenMaps}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#996515] to-[#C59A3F] hover:brightness-110 text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <NavIcon className="w-4 h-4" />
                <span>VIEW ON MAP</span>
              </button>
            </div>
          </div>

          {/* Right Column: Guest Hospitality Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Feature 1: Dedicated Prayer Facilities */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5 text-[#996515]" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#3A291A]">
                  Dedicated Musalla & Wudhu Facilities
                </h4>
                <p className="text-xs text-[#665443] mt-1 leading-relaxed">
                  Quiet, carpeted prayer areas with separate dedicated facilities for ladies and gentlemen. Jama’ah prayers will be arranged for Asr and Maghrib.
                </p>
              </div>
            </div>

            {/* Feature 2: Valet & Parking */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-[#996515]" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#3A291A]">
                  Valet & Guest Parking
                </h4>
                <p className="text-xs text-[#665443] mt-1 leading-relaxed">
                  Spacious on-site parking with courteous attendants to welcome and assist elders and families upon arrival.
                </p>
              </div>
            </div>

            {/* Feature 3: Authentic Halal Banquet */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-[#996515]" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#3A291A]">
                  100% Certified Zabiha Halal
                </h4>
                <p className="text-xs text-[#665443] mt-1 leading-relaxed">
                  Exquisite Awadhi and Mughlai banquet crafted strictly according to Islamic dietary standards, with separate vegetarian and sweet delicacies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
