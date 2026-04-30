import { useEffect, useMemo, useRef, useState } from "react";

type AudioWindow = Window & {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
};

interface AmbientAudioControlProps {
  sceneId: string;
}

export function AmbientAudioControl({ sceneId }: AmbientAudioControlProps) {
  const soundscape = useRef<AmbientSoundscape | null>(null);
  const audioContext = useMemo(() => getAudioContext(), []);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const isAvailable = audioContext !== null;

  useEffect(() => {
    soundscape.current?.setIntensity(getSceneIntensity(sceneId));
  }, [sceneId]);

  useEffect(() => {
    soundscape.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return () => {
      soundscape.current?.stop();
    };
  }, []);

  async function toggleMusic() {
    if (!audioContext) {
      return;
    }

    if (soundscape.current?.playing) {
      soundscape.current.stop();
      soundscape.current = null;
      setIsPlaying(false);
      return;
    }

    const nextSoundscape = new AmbientSoundscape(audioContext, getSceneIntensity(sceneId), volume);
    soundscape.current = nextSoundscape;
    await nextSoundscape.start();
    setIsPlaying(true);
  }

  return (
    <section className="audio-control" aria-label="Background music">
      <div>
        <h2>Vault Signal</h2>
        <p>{isPlaying ? "Ambient loop active." : isAvailable ? "Ambient loop muted." : "Audio unavailable."}</p>
      </div>
      <button type="button" onClick={toggleMusic} disabled={!isAvailable} aria-pressed={isPlaying}>
        {isPlaying ? "Mute" : "Start ambience"}
      </button>
      <label>
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          disabled={!isAvailable}
          onChange={(event) => setVolume(Number(event.currentTarget.value))}
        />
      </label>
    </section>
  );
}

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const audioWindow = window as AudioWindow;
  return audioWindow.AudioContext ?? audioWindow.webkitAudioContext ?? null;
}

function getSceneIntensity(sceneId: string) {
  if (sceneId.startsWith("ending-")) {
    return 0.86;
  }

  if (sceneId.includes("black-stair") || sceneId.includes("external") || sceneId.includes("relay")) {
    return 0.78;
  }

  return 0.58;
}

class AmbientSoundscape {
  private readonly context: AudioContext;
  private readonly master: GainNode;
  private readonly lowpass: BiquadFilterNode;
  private interval: ReturnType<typeof setInterval> | null = null;
  private intensity: number;
  private volume: number;
  playing = false;

  constructor(AudioContextConstructor: typeof AudioContext, intensity: number, volume: number) {
    this.context = new AudioContextConstructor();
    this.master = this.context.createGain();
    this.lowpass = this.context.createBiquadFilter();
    this.intensity = intensity;
    this.volume = volume;

    this.master.gain.value = 0;
    this.lowpass.type = "lowpass";
    this.lowpass.frequency.value = 1400;
    this.lowpass.Q.value = 0.64;
    this.lowpass.connect(this.master);
    this.master.connect(this.context.destination);
  }

  async start() {
    this.playing = true;
    await this.context.resume();
    this.fadeMasterTo(this.targetVolume(), 0.7);
    this.playStartSignal();
    this.scheduleLoop();
    this.interval = setInterval(() => this.scheduleLoop(), 7800);
  }

  stop() {
    if (!this.playing) {
      return;
    }

    this.playing = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    this.fadeMasterTo(0.0001, 0.6);
    window.setTimeout(() => {
      void this.context.close();
    }, 700);
  }

  setIntensity(intensity: number) {
    this.intensity = intensity;

    if (this.playing) {
      this.fadeMasterTo(this.targetVolume(), 0.4);
    }
  }

  setVolume(volume: number) {
    this.volume = volume;

    if (this.playing) {
      this.fadeMasterTo(this.targetVolume(), 0.2);
    }
  }

  private scheduleLoop() {
    const now = this.context.currentTime;
    const root = 82.41;
    const undercurrent = [root, root * 1.5, root * 2];
    const motif = [164.81, 196, 246.94, 220, 196, 174.61];

    undercurrent.forEach((frequency, index) => {
      this.playTone({
        frequency,
        start: now + index * 0.28,
        duration: 8.4,
        gain: 0.08 + index * 0.018,
        type: index === 0 ? "sine" : "triangle",
        pan: index === 1 ? -0.32 : 0.24
      });
    });

    motif.forEach((frequency, index) => {
      this.playTone({
        frequency,
        start: now + 1.1 + index * 0.92,
        duration: 1.9,
        gain: 0.072 * this.intensity,
        type: "sine",
        pan: index % 2 === 0 ? -0.42 : 0.36
      });
    });
  }

  private playStartSignal() {
    const now = this.context.currentTime;

    [246.94, 293.66, 329.63].forEach((frequency, index) => {
      this.playTone({
        frequency,
        start: now + index * 0.18,
        duration: 1.25,
        gain: 0.09,
        type: "triangle",
        pan: 0
      });
    });
  }

  private playTone({ frequency, start, duration, gain, type, pan }: ToneSettings) {
    const oscillator = this.context.createOscillator();
    const envelope = this.context.createGain();
    const stereo = this.context.createStereoPanner();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + 0.45);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    stereo.pan.setValueAtTime(pan, start);

    oscillator.connect(envelope);
    envelope.connect(stereo);
    stereo.connect(this.lowpass);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.1);
  }

  private fadeMasterTo(volume: number, duration: number) {
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(volume, now, duration / 3);
  }

  private targetVolume() {
    return this.volume * (0.2 + this.intensity * 0.11);
  }
}

interface ToneSettings {
  frequency: number;
  start: number;
  duration: number;
  gain: number;
  type: OscillatorType;
  pan: number;
}
