/**
 * Procedural Web Audio API sound synthesizer for crisp, cheerful game feedback.
 * Zero external MP3 dependencies; works offline & inside sandboxed iframes.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.14,
    delay: number = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  /** Crisp wooden/kalimba UI click */
  public playClick() {
    this.playTone(540, 0.07, 'triangle', 0.11, 0);
  }

  /** Placing an Arabic tile into sequence */
  public playTilePlace(stepIndex: number = 0) {
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const freq = scale[stepIndex % scale.length];
    this.playTone(freq, 0.12, 'triangle', 0.13, 0);
  }

  /** Correct answer with combo pitch escalation */
  public playCorrect(combo: number = 1) {
    const boost = Math.min(combo - 1, 5) * 35;
    this.playTone(523.25 + boost, 0.14, 'triangle', 0.14, 0);
    this.playTone(659.25 + boost, 0.16, 'triangle', 0.14, 0.07);
    this.playTone(783.99 + boost, 0.24, 'sine', 0.15, 0.14);
  }

  /** Gentle non-harsh wrong answer thud */
  public playWrong() {
    this.playTone(230, 0.16, 'sawtooth', 0.07, 0);
    this.playTone(185, 0.22, 'triangle', 0.11, 0.09);
  }

  /** Boss damage hit effect */
  public playBossHit() {
    this.playTone(150, 0.12, 'square', 0.09, 0);
    this.playTone(440, 0.12, 'triangle', 0.13, 0.04);
    this.playTone(660, 0.18, 'triangle', 0.15, 0.09);
    this.playTone(880, 0.26, 'sine', 0.14, 0.15);
  }

  /** Hint chime */
  public playHint() {
    this.playTone(740, 0.12, 'sine', 0.1, 0);
    this.playTone(987.77, 0.18, 'sine', 0.1, 0.08);
  }

  /** Victory / Mission complete arpeggio */
  public playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.playTone(n, idx === notes.length - 1 ? 0.45 : 0.16, 'triangle', 0.14, idx * 0.085);
    });
  }
}

export const soundFX = new SoundEngine();
