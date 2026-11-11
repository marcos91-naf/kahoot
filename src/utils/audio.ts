/**
 * Web Audio API synthesizer for Kahoot-style sounds
 * Self-contained, robust, works offline and without external assets
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private lobbyLoopInterval: number | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopLobbyMusic();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume(): number {
    return this.volume;
  }

  public playTick(urgent: boolean = false) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = urgent ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(urgent ? 880 : 540, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(urgent ? 440 : 220, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(this.volume * (urgent ? 0.35 : 0.2), this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Kahoot signature happy ascending chime (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      const startTime = this.ctx.currentTime + idx * 0.08;
      const duration = 0.28;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.4, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  public playWrong() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Classic Kahoot buzz / descending tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.35);

    gain.gain.setValueAtTime(this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  public playTimeUp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Dramatic two-tone gong
    const freqs = [330, 220];
    freqs.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime + i * 0.15;
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    });
  }

  public playStreak() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startTime = this.ctx.currentTime + idx * 0.05;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(this.volume * 0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.32);
    });
  }

  public playPodium() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Grand fanfare sequence
    const melody = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 523.25, t: 0.15, d: 0.15 },
      { f: 523.25, t: 0.3, d: 0.15 },
      { f: 659.25, t: 0.48, d: 0.25 },
      { f: 783.99, t: 0.75, d: 0.3 },
      { f: 1046.5, t: 1.1, d: 0.6 }
    ];

    melody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const st = this.ctx.currentTime + note.t;
      osc.frequency.setValueAtTime(note.f, st);
      gain.gain.setValueAtTime(0, st);
      gain.gain.linearRampToValueAtTime(this.volume * 0.45, st + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, st + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + note.d + 0.05);
    });
  }

  public playSelectOption() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(1050, now + 0.09);
    gain.gain.setValueAtTime(this.volume * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  public startLobbyMusic() {
    if (this.isMuted || this.lobbyLoopInterval) return;
    this.initCtx();
    if (!this.ctx) return;

    // Upbeat periodic bass groove (Kahoot lobby vibe)
    const bassScale = [130.81, 164.81, 196.0, 261.63, 196.0, 164.81];
    let noteIdx = 0;

    const playPulse = () => {
      if (this.isMuted || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(bassScale[noteIdx % bassScale.length], now);
      noteIdx++;
      gain.gain.setValueAtTime(this.volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    };

    playPulse();
    this.lobbyLoopInterval = window.setInterval(playPulse, 400);
  }

  public stopLobbyMusic() {
    if (this.lobbyLoopInterval) {
      clearInterval(this.lobbyLoopInterval);
      this.lobbyLoopInterval = null;
    }
  }
}

export const soundFx = new SoundSystem();
