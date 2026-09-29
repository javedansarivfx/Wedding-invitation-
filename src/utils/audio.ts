/**
 * Authentic Arabic & South Asian Muslim Wedding Acoustic Instrument Synthesizer
 * Using Web Audio API for zero-latency, high-fidelity acoustic ambient music
 */

class RoyalMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;

  // Traditional Maqam Hijaz / Bayati progression for South Asian Muslim weddings
  // Frequencies for D4, Eb4, F#4, G4, A4, Bb4, C5, D5
  private melody = [
    { note: 293.66, dur: 2.2, delay: 0 },       // D4
    { note: 369.99, dur: 1.4, delay: 1.4 },     // F#4
    { note: 392.00, dur: 1.8, delay: 2.6 },     // G4
    { note: 440.00, dur: 2.6, delay: 4.0 },     // A4
    { note: 466.16, dur: 1.6, delay: 6.2 },     // Bb4
    { note: 440.00, dur: 1.8, delay: 7.6 },     // A4
    { note: 392.00, dur: 2.2, delay: 9.2 },     // G4
    { note: 369.99, dur: 2.4, delay: 11.0 },    // F#4
    { note: 311.13, dur: 1.8, delay: 13.0 },    // Eb4
    { note: 293.66, dur: 3.8, delay: 14.6 },    // D4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Synthesize acoustic Oud / Rubab pluck sound
  private playOudPluck(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(freq, time);
    // Slight detune for warm acoustic chorus
    osc2.frequency.setValueAtTime(freq * 1.0025, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.6, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.85, time + duration);

    // Warm wooden string decay envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(0.32, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.07, time + 0.45);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Synthesize warm Ney flute / breath drone
  private playNeyDrone(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq / 2, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, time);
    filter.Q.setValueAtTime(3.2, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.1, time + 0.8);
    gain.gain.linearRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Soft rhythmic ambient shimmer
  private playGentlePercussion(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.3);

    gain.gain.setValueAtTime(0.07, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playCycle = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Drone on root (D3)
      this.playNeyDrone(146.83, now, 18);

      // Subtle gentle heartbeat / percussion pulse
      for (let t = 0; t < 18; t += 3) {
        this.playGentlePercussion(now + t);
      }

      // Schedule melody
      this.melody.forEach((item) => {
        this.playOudPluck(item.note, now + item.delay, item.dur);
      });

      this.timer = window.setTimeout(playCycle, 18000);
    };

    playCycle();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Sound effect: Wax seal crack
  public playWaxSealCrack() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.35);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio context policy
    }
  }

  // Sound effect: Celebratory chime for reveal
  public playCelebrationChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const chords = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D-maj shimmering chime

      chords.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 1.8);
      });
    } catch {
      // Fallback
    }
  }
}

export const royalAudio = new RoyalMusicEngine();
