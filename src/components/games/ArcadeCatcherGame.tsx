import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Heart,
  Shield,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Pause,
  Play,
  ArrowRight,
} from 'lucide-react';
import { ArcadeWave, ArcadeWaveItem, MissionResult, PowerUpId, PowerUpInventory } from '../../types/game';
import { soundFX } from '../../utils/sound';

interface ArcadeCatcherGameProps {
  missionId: string;
  xpReward: number;
  waves: ArcadeWave[];
  inventory: PowerUpInventory;
  onConsumePowerUp: (id: PowerUpId) => void;
  onFinish: (result: MissionResult) => void;
  onGameOver: () => void;
}

interface FallingLantern {
  uid: number;
  lane: number; // 0..3
  y: number; // 0..100 (% of arena height)
  speed: number; // % per second
  item: ArcadeWaveItem;
}

export const ArcadeCatcherGame: React.FC<ArcadeCatcherGameProps> = ({
  missionId,
  xpReward,
  waves,
  inventory,
  onConsumePowerUp,
  onFinish,
  onGameOver,
}) => {
  const [waveIdx, setWaveIdx] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [paused, setPaused] = useState(false);
  const [waveCleared, setWaveCleared] = useState(false);

  // Active Power-Up states
  const [shieldActive, setShieldActive] = useState(false);
  const [insightActive, setInsightActive] = useState(false);

  // Live feedback banner & floating sparks
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);
  const [lanterns, setLanterns] = useState<FallingLantern[]>([]);

  const currentWave = waves[waveIdx];
  const uidRef = useRef(1);
  const spawnTimerRef = useRef(0);
  const lastLaneRef = useRef(-1);
  const pausedRef = useRef(false);
  const waveClearedRef = useRef(false);

  pausedRef.current = paused;
  waveClearedRef.current = waveCleared;

  // Reset wave spawns when waveIdx changes
  useEffect(() => {
    setLanterns([]);
    setCaughtCount(0);
    setWaveCleared(false);
    setFeedback(null);
    spawnTimerRef.current = 0.6;
  }, [waveIdx]);

  // 60fps clamped-delta simulation loop
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      if (!pausedRef.current && !waveClearedRef.current) {
        spawnTimerRef.current -= dt;

        setLanterns((prev) => {
          const moved = prev
            .map((l) => ({ ...l, y: l.y + l.speed * dt }))
            .filter((l) => l.y < 104);

          if (spawnTimerRef.current <= 0 && moved.length < 4) {
            // Reset spawn interval (calm, comfortable rhythm for 10-11yo MI students)
            spawnTimerRef.current = 1.45;
            const pool = currentWave.items;
            // Slightly favor target items so game stays exciting and never dry
            const targetItems = pool.filter((it) => it.isTarget);
            const decoyItems = pool.filter((it) => !it.isTarget);
            const pickTarget = Math.random() < 0.62 || decoyItems.length === 0;
            const chosenPool = pickTarget ? targetItems : decoyItems;
            const item = chosenPool[Math.floor(Math.random() * chosenPool.length)];

            // Pick a lane that isn't crowded near top
            const candidateLanes = [0, 1, 2, 3].filter(
              (lane) => lane !== lastLaneRef.current && !moved.some((m) => m.lane === lane && m.y < 28)
            );
            const lane =
              candidateLanes.length > 0
                ? candidateLanes[Math.floor(Math.random() * candidateLanes.length)]
                : Math.floor(Math.random() * 4);
            lastLaneRef.current = lane;

            moved.push({
              uid: uidRef.current++,
              lane,
              y: -8,
              speed: 14 + Math.random() * 5, // gentle readable falling speed
              item,
            });
          }

          return moved;
        });
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [currentWave]);

  const handleCatchLantern = (lantern: FallingLantern) => {
    if (paused || waveCleared) return;
    setLanterns((prev) => prev.filter((l) => l.uid !== lantern.uid));

    if (lantern.item.isTarget) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));
      setScore((s) => s + 60 + nextCombo * 15);
      setFeedback({ text: `Tepat! ${lantern.item.feedback}`, ok: true });
      soundFX.playCorrect(nextCombo);

      const nextCaught = caughtCount + 1;
      setCaughtCount(nextCaught);
      if (nextCaught >= currentWave.targetGoalCount) {
        setWaveCleared(true);
        setLanterns([]);
        soundFX.playVictory();
      }
    } else {
      if (shieldActive) {
        setShieldActive(false);
        setFeedback({
          text: `Perisai Cahaya melindungimu! (${lantern.item.feedback})`,
          ok: true,
        });
        soundFX.playHint();
        return;
      }

      setCombo(0);
      setMistakes((m) => m + 1);
      setFeedback({ text: `Bukan target! ${lantern.item.feedback}`, ok: false });
      soundFX.playWrong();
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      if (nextHearts <= 0) {
        onGameOver();
      }
    }
  };

  // Keyboard support: keys 1, 2, 3, 4 catch lowest lantern in that lane!
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'Escape') {
        setPaused((p) => !p);
        return;
      }
      const laneIdx = ['1', '2', '3', '4'].indexOf(e.key);
      if (laneIdx !== -1 && !pausedRef.current && !waveClearedRef.current) {
        setLanterns((prev) => {
          const inLane = prev.filter((l) => l.lane === laneIdx).sort((a, b) => b.y - a.y);
          if (inLane.length > 0) {
            window.setTimeout(() => handleCatchLantern(inLane[0]), 0);
          }
          return prev;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleUseShield = () => {
    if (shieldActive || inventory.shield <= 0) return;
    soundFX.playHint();
    onConsumePowerUp('shield');
    setShieldActive(true);
  };

  const handleUseInsight = () => {
    if (insightActive || inventory.insight <= 0) return;
    soundFX.playHint();
    onConsumePowerUp('insight');
    setInsightActive(true);
    window.setTimeout(() => setInsightActive(false), 6000);
  };

  const handleNextWave = () => {
    soundFX.playClick();
    if (waveIdx + 1 < waves.length) {
      setWaveIdx((i) => i + 1);
    } else {
      const stars: 1 | 2 | 3 = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
      const earnedXp = xpReward + (stars === 3 ? 30 : 15);
      onFinish({
        missionId,
        stars,
        score,
        maxScore: waves.length * 400,
        maxCombo,
        earnedXp,
        mistakes,
      });
    }
  };

  const progressPct = Math.min(100, Math.round((caughtCount / currentWave.targetGoalCount) * 100));

  return (
    <div className="space-y-4">
      {/* Arcade Top HUD */}
      <div className="rounded-2xl bg-[#0F3D35] text-white border-2 border-[#08241F] shadow-md px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-amber-400 text-[#1A1406] font-display font-extrabold text-xs px-2.5 py-1">
            GELOMBANG {waveIdx + 1}/{waves.length}
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 ${
                  h <= hearts ? 'fill-rose-400 text-rose-400' : 'text-white/20'
                }`}
              />
            ))}
          </div>
          {shieldActive && (
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-300">
              <Shield className="w-4 h-4 fill-sky-400/30" />
              Perisai Aktif
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-extrabold tabular-nums">
          {combo >= 2 && (
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Flame className="w-4 h-4 fill-amber-400" />
              FEVER x{combo}
            </span>
          )}
          <span className="text-amber-300">Skor {score}</span>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setPaused((p) => !p);
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-white/15 hover:bg-white/25 px-2.5 py-1.5 text-xs font-bold cursor-pointer"
          >
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{paused ? 'Lanjut' : 'Jeda'}</span>
          </button>
        </div>
      </div>

      {/* Mission Target Banner + Power-Up Quick Bar */}
      <div className="game-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold text-emerald-700">{currentWave.targetRuleHint}</p>
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#0F3D35]">
            {currentWave.targetTitle}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 max-w-xs h-3 rounded-full bg-[#E5DEC9] overflow-hidden border border-[#CFC3A4]">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-[#0F3D35] tabular-nums">
              Tertangkap: {caughtCount}/{currentWave.targetGoalCount}
            </span>
          </div>
        </div>

        {/* Usable Power-Up Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={shieldActive || inventory.shield <= 0}
            onClick={handleUseShield}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-extrabold border-2 transition-all ${
              shieldActive
                ? 'bg-sky-100 border-sky-500 text-sky-900'
                : inventory.shield > 0
                  ? 'game-btn-cream cursor-pointer'
                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Shield className="w-4 h-4 text-sky-600" />
            <span>Perisai ({inventory.shield})</span>
          </button>
          <button
            type="button"
            disabled={insightActive || inventory.insight <= 0}
            onClick={handleUseInsight}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-extrabold border-2 transition-all ${
              insightActive
                ? 'bg-amber-200 border-amber-500 text-amber-950'
                : inventory.insight > 0
                  ? 'game-btn-gold cursor-pointer'
                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Sorot Target ({inventory.insight})</span>
          </button>
        </div>
      </div>

      {/* Live 4-Lane Falling Lantern Sky Arena */}
      <div className="relative h-[380px] sm:h-[420px] w-full rounded-3xl overflow-hidden border-4 border-[#0F3D35] bg-gradient-to-b from-[#092C27] via-[#124E45] to-[#1D6E61] shadow-[0_12px_30px_rgba(15,61,53,0.28)] select-none">
        <div className="pointer-events-none absolute inset-0 bg-islamic-lattice-light opacity-50" />

        {/* 4 Subtle Vertical Guide Lanes */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-4">
          {[0, 1, 2, 3].map((lane) => (
            <div
              key={lane}
              className="border-r last:border-r-0 border-white/10 flex flex-col justify-end items-center pb-3"
            >
              <span className="text-[11px] font-extrabold text-amber-200/45 tabular-nums">
                Jalur {lane + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Falling Interactive Lanterns */}
        {lanterns.map((lantern) => {
          const leftPercent = lantern.lane * 25 + 12.5;
          const highlightTrue = insightActive && lantern.item.isTarget;
          return (
            <button
              key={lantern.uid}
              type="button"
              onClick={() => handleCatchLantern(lantern)}
              style={{
                left: `${leftPercent}%`,
                top: `${lantern.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-[23%] min-w-[92px] max-w-[175px] rounded-2xl px-2.5 py-3 text-center transition-transform active:scale-90 cursor-pointer border-2 ${
                highlightTrue
                  ? 'bg-gradient-to-b from-amber-200 to-amber-400 text-[#1A1406] border-yellow-200 shadow-[0_0_24px_rgba(251,191,36,0.9)]'
                  : 'bg-gradient-to-b from-[#FFFDF7] to-[#F4E6C3] text-[#0F3D35] border-amber-500 shadow-[0_6px_0_#92400E,0_10px_20px_rgba(0,0,0,0.35)] hover:scale-105'
              }`}
            >
              {/* Lantern Top Hook */}
              <span className="mx-auto mb-1 block w-5 h-1.5 rounded-full bg-amber-600/70" />
              {lantern.item.arabic && (
                <p className="font-arabic text-2xl sm:text-3xl font-bold leading-snug text-[#0F3D35]">
                  {lantern.item.arabic}
                </p>
              )}
              <p className="text-[11px] sm:text-xs font-extrabold leading-tight mt-0.5 text-[#224640]">
                {lantern.item.label}
              </p>
            </button>
          );
        })}

        {/* Pause Overlay */}
        {paused && !waveCleared && (
          <div className="absolute inset-0 z-20 bg-[#08241F]/80 flex flex-col items-center justify-center text-white gap-4">
            <h3 className="font-display text-2xl font-extrabold">Permainan Dijeda</h3>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setPaused(false);
              }}
              className="game-btn-gold rounded-2xl px-7 py-3 font-display font-extrabold text-base cursor-pointer"
            >
              Lanjutkan Menangkap!
            </button>
          </div>
        )}

        {/* Wave Cleared Overlay */}
        {waveCleared && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 bg-[#08241F]/88 flex flex-col items-center justify-center text-center text-white p-6 gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#1A1406] flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-amber-300">GELOMBANG TUNTAS!</p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
                Luar Biasa! Semua Lentera Target Tertangkap!
              </h3>
            </div>
            <button
              type="button"
              onClick={handleNextWave}
              className="game-btn-gold inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-display font-extrabold text-base cursor-pointer"
            >
              <span>
                {waveIdx + 1 < waves.length ? 'Lanjut Gelombang Berikutnya' : 'Klaim Kemenangan Misi!'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Live Educational Feedback Strip */}
      <AnimatePresence mode="wait">
        {feedback ? (
          <motion.div
            key={feedback.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl border-2 px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 ${
              feedback.ok
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-rose-50 border-rose-400 text-rose-950'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{feedback.text}</span>
          </motion.div>
        ) : (
          <p className="text-center text-xs font-semibold text-[#556E68]">
            Ketuk lentera yang sesuai target (atau tekan tombol angka 1–4 pada keyboard) · Tekan P untuk jeda
          </p>
        )}
      </AnimatePresence>
    </div>
  );
};
