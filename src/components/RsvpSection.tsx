import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Send, User, Phone, MessageSquare, Edit3 } from 'lucide-react';
import { royalAudio } from '../utils/audio';

const STORAGE_KEY = 'javed_roshan_wedding_rsvp';
const GUESTBOOK_KEY = 'javed_roshan_guestbook_duas';

const DEFAULT_BLESSINGS = [
  {
    guestName: 'Tariq Ahmad & Family (Nehtour)',
    blessing: 'Mubarak to Farook Bhai and Hazi Raesuddin Sahab! May Allah bless Javed and Roshan with endless joy, barakah, and righteous progeny.',
    time: 'Yesterday',
  },
  {
    guestName: 'Dr. Zeeshan & Farzana (Bijnor)',
    blessing: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fee khair. Looking forward to attending the Baraat and Walima!',
    time: '2 days ago',
  },
  {
    guestName: 'Qasim & Nargis Ansari',
    blessing: 'Warmest congratulations to the bride and groom! Sending our heartfelt du’as and love from overseas.',
    time: '3 days ago',
  },
];

interface RsvpSectionProps {
  onShowerPetals: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onShowerPetals }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    attendance: 'attending' as 'attending' | 'declining',
    guestCount: 2,
    attendingEvents: ['haldi', 'nikah', 'walima'],
    blessingMessage: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guestbook, setGuestbook] = useState(DEFAULT_BLESSINGS);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
        setIsSubmitted(true);
      }
      const savedDua = localStorage.getItem(GUESTBOOK_KEY);
      if (savedDua) {
        setGuestbook(JSON.parse(savedDua));
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.attendingEvents.includes(eventId);
      const updated = exists
        ? prev.attendingEvents.filter((e) => e !== eventId)
        : [...prev.attendingEvents, eventId];
      return { ...prev, attendingEvents: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setErrorMsg('');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

    if (formData.blessingMessage.trim()) {
      const newEntries = [
        {
          guestName: formData.guestName,
          blessing: formData.blessingMessage,
          time: 'Just now',
        },
        ...guestbook,
      ];
      setGuestbook(newEntries);
      localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(newEntries));
    }

    setIsSubmitted(true);
    royalAudio.playCelebrationChime();
    onShowerPetals();
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Assalamu Alaikum! Wedding RSVP for Javed Ansari & Roshan Ansari:\n\nName: ${formData.guestName || 'Honored Guest'}\nAttendance: ${formData.attendance === 'attending' ? "YES, I'LL BE THERE" : 'UNABLE TO ATTEND'}\nGuests: ${formData.guestCount}\nEvents: ${formData.attendingEvents.join(', ')}\nDu'a: ${formData.blessingMessage || 'Barakallahu lakuma!'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="rsvp" className="py-20 md:py-28 relative bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header with Exact Prompts */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-px bg-[#C59A3F]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#996515] font-semibold">
              Presence & Blessings
            </span>
            <span className="w-8 h-px bg-[#C59A3F]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#3A291A] uppercase mb-3"
          >
            YOUR PRESENCE IS OUR GREATEST BLESSING
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant italic text-lg sm:text-xl text-[#786552]"
          >
            “WE WOULD BE HONOURED TO HAVE YOU WITH US”
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-white border border-[#E2D2B5] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_-15px_rgba(200,162,81,0.18)]"
        >
          {isSubmitted ? (
            /* Confirmation View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#FAF5EB] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Check className="w-8 h-8 text-[#996515]" />
              </div>

              <div className="font-amiri text-xl text-[#996515] mb-1">
                جَزَاكُمُ اللَّهُ خَيْرًا
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3A291A] mb-2">
                RSVP Gratefully Recorded
              </h3>

              <p className="font-cormorant italic text-base sm:text-lg text-[#5C4A3A] max-w-lg mx-auto mb-6">
                Thank you, <strong className="font-bold text-[#2D241E]">{formData.guestName}</strong>. 
                {formData.attendance === 'attending'
                  ? ` We are honored to welcome you to the wedding ceremonies in Nehtour.`
                  : ' Your warm prayers and du’as remain deeply cherished in our hearts.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white hover:bg-[#FAF5EB] text-[#5C3B0E] font-cinzel text-xs font-semibold tracking-wider flex items-center gap-2 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Response</span>
                </button>
                <button
                  onClick={handleWhatsAppSend}
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-cinzel text-xs font-bold tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Share via WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Attendance Selection: YES, I'LL BE THERE & UNABLE TO ATTEND */}
              <div>
                <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#3A291A] mb-3">
                  Please Confirm Your Attendance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                    className={`py-4 px-4 rounded-xl border text-xs font-cinzel font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all ${
                      formData.attendance === 'attending'
                        ? 'bg-[#FAF5EB] border-[#996515] text-[#3A291A] shadow-xs'
                        : 'bg-white border-[#E8DFC8] text-[#735E4B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 ${
                        formData.attendance === 'attending' ? 'text-[#996515]' : 'opacity-0'
                      }`}
                    />
                    <span>YES, I'LL BE THERE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'declining' })}
                    className={`py-4 px-4 rounded-xl border text-xs font-cinzel font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all ${
                      formData.attendance === 'declining'
                        ? 'bg-[#FAF5EB] border-[#996515] text-[#3A291A] shadow-xs'
                        : 'bg-white border-[#E8DFC8] text-[#735E4B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 ${
                        formData.attendance === 'declining' ? 'text-[#996515]' : 'opacity-0'
                      }`}
                    />
                    <span>UNABLE TO ATTEND</span>
                  </button>
                </div>
              </div>

              {/* Guest Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#3A291A] mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Tariq Ahmad & Family"
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] focus:bg-white focus:border-[#996515] text-sm text-[#2D241E] focus:outline-none transition-all placeholder:text-[#A89887]"
                    />
                    <User className="w-4 h-4 text-[#A89887] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#3A291A] mb-1.5">
                    Contact / WhatsApp Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+91 / +971 / +1..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] focus:bg-white focus:border-[#996515] text-sm text-[#2D241E] focus:outline-none transition-all placeholder:text-[#A89887]"
                    />
                    <Phone className="w-4 h-4 text-[#A89887] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {formData.attendance === 'attending' && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#3A291A] mb-1.5">
                      Number of Attending Guests
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] focus:bg-white focus:border-[#996515] text-sm text-[#2D241E] focus:outline-none transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Events Attending Checkboxes */}
                  <div>
                    <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#3A291A] mb-2">
                      Ceremonies You Plan to Attend
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'haldi', label: '04 Dec — Haldi Ceremony' },
                        { id: 'nikah', label: '05 Dec — Baraat & Nikah' },
                        { id: 'walima', label: '06 Dec — Walima Reception' },
                      ].map((evt) => {
                        const checked = formData.attendingEvents.includes(evt.id);
                        return (
                          <button
                            type="button"
                            key={evt.id}
                            onClick={() => handleEventToggle(evt.id)}
                            className={`p-3 rounded-xl border text-xs font-cinzel flex items-center gap-2.5 transition-all ${
                              checked
                                ? 'bg-[#FAF5EB] border-[#996515] text-[#3A291A] font-semibold'
                                : 'bg-[#FAF7F2] border-[#E8DFC8] text-[#735E4B]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                checked ? 'bg-[#996515] border-[#996515] text-white' : 'border-[#C59A3F]'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span>{evt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Du'a / Blessing Message */}
              <div>
                <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#3A291A] mb-1.5">
                  Your Du’a & Congratulatory Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Leave a prayer or congratulatory du’a for Javed and Roshan..."
                  value={formData.blessingMessage}
                  onChange={(e) => setFormData({ ...formData, blessingMessage: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D2B5] focus:bg-white focus:border-[#996515] text-sm text-[#2D241E] focus:outline-none transition-all placeholder:text-[#A89887]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#996515] via-[#C59A3F] to-[#996515] hover:brightness-110 text-white font-cinzel text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit RSVP</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-cinzel text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>RSVP via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Guestbook Du'as Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-cinzel text-xs uppercase tracking-widest text-[#996515] font-semibold"
            >
              Words of Devotion
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cinzel text-2xl font-bold text-[#3A291A] mt-1"
            >
              Guest Prayers & Du’as
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {guestbook.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="p-5 rounded-2xl bg-white/80 border border-[#E8DFC8] flex flex-col justify-between shadow-xs"
              >
                <p className="font-cormorant italic text-sm text-[#4A3B2C] leading-relaxed mb-4">
                  “{entry.blessing}”
                </p>
                <div className="border-t border-[#F2E8D8] pt-3 flex items-center justify-between text-xs font-cinzel text-[#8C6D3B]">
                  <span className="font-bold text-[#3A291A] truncate">{entry.guestName}</span>
                  <span className="text-[10px] text-[#A89887]">{entry.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
