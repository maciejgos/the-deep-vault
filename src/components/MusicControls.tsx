import { useEffect, useRef, useState } from "react";

const progression = [
  [196, 246.94, 293.66],
  [220, 261.63, 329.63],
  [174.61, 233.08, 293.66],
  [164.81, 220, 261.63]
] as const;

export function MusicControls() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(35);
  const [supported, setSupported] = useState(true);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopMusic();
      void contextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    const gain = gainRef.current;

    if (!context || !gain) {
      return;
    }

    const target = normalizeVolume(volume);
    gain.gain.setTargetAtTime(enabled ? target : 0.0001, context.currentTime, 0.3);
  }, [enabled, volume]);

  async function toggleMusic() {
    if (enabled) {
      stopMusic();
      setEnabled(false);
      return;
    }

    const context = await ensureContext();
    if (!context) {
      setSupported(false);
      return;
    }

    if (context.state === "suspended") {
      await context.resume();
    }

    const gain = ensureMasterGain(context);
    gain.gain.setTargetAtTime(normalizeVolume(volume), context.currentTime, 0.6);

    let step = 0;
    queueChord(context, gain, progression[step]);
    intervalRef.current = globalThis.setInterval(() => {
      step = (step + 1) % progression.length;
      queueChord(context, gain, progression[step]);
    }, 2200);

    setEnabled(true);
  }

  function stopMusic() {
    if (intervalRef.current !== null) {
      globalThis.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const context = contextRef.current;
    const gain = gainRef.current;

    if (context && gain) {
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(0.0001, context.currentTime, 0.4);
    }
  }

  async function ensureContext() {
    if (contextRef.current) {
      return contextRef.current;
    }

    if (typeof globalThis.AudioContext !== "function") {
      return null;
    }

    contextRef.current = new globalThis.AudioContext();
    return contextRef.current;
  }

  function ensureMasterGain(context: AudioContext) {
    if (gainRef.current) {
      return gainRef.current;
    }

    const gain = context.createGain();
    gain.gain.value = 0.0001;
    gain.connect(context.destination);
    gainRef.current = gain;
    return gain;
  }

  if (!supported) {
    return <p className="music-unsupported">Ambient audio unavailable in this browser.</p>;
  }

  return (
    <div className="music-controls" aria-label="Ambient audio controls">
      <button className="music-toggle" type="button" onClick={toggleMusic} aria-pressed={enabled}>
        {enabled ? "Ambient audio: on" : "Ambient audio: off"}
      </button>
      <label className="music-volume">
        <span>Volume</span>
        <input
          type="range"
          min={5}
          max={60}
          step={1}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Ambient music volume"
        />
      </label>
    </div>
  );
}

function queueChord(context: AudioContext, masterGain: GainNode, notes: readonly number[]) {
  const gain = context.createGain();
  gain.gain.value = 0.0001;
  gain.connect(masterGain);

  const startAt = context.currentTime;
  const releaseAt = startAt + 2.1;

  gain.gain.exponentialRampToValueAtTime(0.02, startAt + 0.6);
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  for (const frequency of notes) {
    const oscillator = context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = 0;
    oscillator.connect(gain);
    oscillator.start(startAt);
    oscillator.stop(releaseAt);
  }

  globalThis.setTimeout(() => gain.disconnect(), 2500);
}

function normalizeVolume(volume: number) {
  return Math.max(0.005, Math.min(0.06, volume / 1000));
}
