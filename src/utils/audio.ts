/**
 * Royal Wedding Music Engine
 * Plays soft, calm and serene romantic wedding music (Gentle Wedding Harp & Strings)
 * with seamless looping, calm volume, and sound effects for door opening and reveals.
 * (No loud or harsh shehnai - pure peaceful, romantic wedding ambiance).
 */

class RoyalMusicEngine {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private synthTimer: number | null = null;

  constructor() {
    // Lazy initialize on first interaction
  }

  private initAudioElement() {
    if (!this.audioElement && typeof window !== 'undefined') {
      this.audioElement = new Audio('/audio/soft_wedding_melody.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = 0.38;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('ended', () => {
        if (this.audioElement) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    this.initAudioElement();
    this.initContext();

    if (this.audioElement) {
      this.audioElement.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((_err) => {
          // In case of autoplay policy, fallback to synth engine
          this.startSynth();
        });
    } else {
      this.startSynth();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
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

  // Fallback calm wedding synthesizer if browser restricts MP3 loading
  private startSynth() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.initContext();

    const calmNotes = [261.63, 329.63, 392.0, 523.25]; // C major gentle chord
    let noteIdx = 0;

    const cycle = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const freq = calmNotes[noteIdx % calmNotes.length];
      noteIdx++;

      // Soft sinusoidal calm bell/harp note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 3.5);

      this.synthTimer = window.setTimeout(cycle, 1800);
    };

    cycle();
  }

  private stopSynth() {
    if (this.synthTimer) {
      window.clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }

  // Sound effect 1: Light Traveling around Button
  public playLightTravelChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Sparkling ascending chime sweep
      const notes = [392, 493.88, 587.33, 783.99, 987.77, 1174.66, 1567.98];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.16, now + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.9);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.9);
      });
    } catch {
      // Audio safety
    }
  }

  // Sound effect 2: Royal Palace Door Opening Sound
  public playDoorOpenSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Deep palace door resonance
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(125, now + 0.9);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.2);

      // Soft auspicious welcome chord
      const chords = [392, 493.88, 587.33, 783.99];
      chords.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, now + 0.1 + idx * 0.06);
        g.gain.setValueAtTime(0.001, now + 0.1 + idx * 0.06);
        g.gain.linearRampToValueAtTime(0.09, now + 0.35 + idx * 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
        o.connect(g);
        g.connect(this.masterGain);
        o.start(now + 0.1 + idx * 0.06);
        o.stop(now + 1.6);
      });
    } catch {
      // Audio safety
    }
  }

  // Sound effect 3: Wax Seal Crack & Unlock
  public playWaxSealCrack() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio safety
    }
  }

  // Celebratory Chime
  public playCelebrationChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const chords = [587.33, 783.99, 987.77, 1174.66, 1567.98];

      chords.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.2, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 2.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 2.2);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const royalAudio = new RoyalMusicEngine();
