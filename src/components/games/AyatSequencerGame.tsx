import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Flame, Heart, Lightbulb, RotateCcw, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { MissionResult, SequencerRound } from '../../types/game';
import { soundFX } from '../../utils/sound';

interface AyatSequencerGameProps {
  missionId: string;
  xpReward: number;
  rounds: SequencerRound[];
  onFinish: (result: MissionResult) => void;
  onGameOver: () => void;
}

interface TileItem {
  uid: string;
  text: string;
  originalIndex: number;
}

function deterministicShuffle<T>(items: T[], seedStr: string): T[] {
  const arr = [...items];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) % 9973;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.length > 1 && arr.every((v, idx) => v === items[idx])) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export const AyatSequencerGame: React.FC<AyatSequencerGameProps> = ({
  missionId,
  xpReward,
  rounds,
  onFinish,
  onGameOver,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [placedTiles, setPlacedTiles] = useState<TileItem[]>([]);
  const [status, setStatus] = useState<'PLAYING' | 'WRONG_SHAKE' | 'ROUND_WON'>('PLAYING');
  const [hintTileUid, setHintTileUid] = useState<string | null>(null);
  const [bonusSeconds, setBonusSeconds] = useState(30);
  const [draggedUid, setDraggedUid] = useState<string | null>(null);
  const [popToast, setPopToast] = useState<string | null>(null);

  const currentRound = rounds[roundIdx];

  const poolTiles: TileItem[] = useMemo(() => {
    const base = currentRound.chunks.map((text, idx) => ({
      uid: `${currentRound.id}-${idx}`,
      text,
      originalIndex: idx,
    }));
    return deterministicShuffle(base, currentRound.id);
  }, [currentRound]);

  useEffect(() => {
    if (status !== 'PLAYING') return;
    const timer = window.setInterval(() => {
      setBonusSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status, roundIdx]);

  const placedIds = new Set(placedTiles.map((t) => t.uid));
  const availableTiles = poolTiles.filter((t) => !placedIds.has(t.uid));

  const triggerToast = (msg: string) => {
    setPopToast(msg);
    window.setTimeout(() => setPopToast(null), 700);
  };

  const handlePlaceTile = (tile: TileItem) => {
    if (status !== 'PLAYING') return;
    const expectedIndex = placedTiles.length;

    if (tile.originalIndex === expectedIndex) {
      const nextPlaced = [...placedTiles, tile];
      setPlacedTiles(nextPlaced);
      setHintTileUid(null);
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));
      soundFX.playTilePlace(expectedIndex);
      triggerToast(nextCombo >= 2 ? `KOMBO x${nextCombo}!` : 'TEPAT!');

      if (nextPlaced.length === currentRound.chunks.length) {
        const speedBonus = bonusSeconds > 0 ? Math.round(bonusSeconds * 2) : 0;
        const roundPoints = 100 + nextCombo * 15 + speedBonus;
        setScore((s) => s + roundPoints);
        setStatus('ROUND_WON');
        soundFX.playCorrect(nextCombo);
      }
    } else {
      soundFX.playWrong();
      setCombo(0);
      setMistakes((m) => m + 1);
      setStatus('WRONG_SHAKE');

      const nextHearts = hearts - 1;
      setHearts(nextHearts);

      window.setTimeout(() => {
        if (nextHearts <= 0) {
          onGameOver();
        } else {
          setStatus('PLAYING');
        }
      }, 460);
    }
  };

  const handleShowHint = () => {
    if (status !== 'PLAYING') return;
    const expectedIndex = placedTiles.length;
    const target = availableTiles.find((t) => t.originalIndex === expectedIndex);
    if (target) {
      soundFX.playHint();
      setHintTileUid(target.uid);
    }
  };

  const handleResetRound = () => {
    if (status !== 'PLAYING') return;
    soundFX.playClick();
    setPlacedTiles([]);
    setHintTileUid(null);
  };

  const handleNextRound = () => {
    soundFX.playClick();
    if (roundIdx + 1 < rounds.length) {
      setRoundIdx((i) => i + 1);
      setPlacedTiles([]);
      setHintTileUid(null);
      setBonusSeconds(30);
      setStatus('PLAYING');
    } else {
      const stars: 1 | 2 | 3 = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
      const earnedXp = xpReward + (stars === 3 ? 25 : stars === 2 ? 10 : 0);
      onFinish({
        missionId,
        stars,
        score,
        maxScore: rounds.length * 180,
        maxCombo,
        earnedXp,
        mistakes,
      });
    }
  };

  const bonusPercent = Math.round((bonusSeconds / 30) * 100);

  return (
    <div className="space-y-5">
      {/* Vibrant Tactile Mission HUD */}
      <div className="rounded-2xl bg-[#0F3D35] text-white border-2 border-[#08241F] shadow-md px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {rounds.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 rounded-full transition-all ${
                  idx < roundIdx
                    ? 'w-7 bg-emerald-400'
                    : idx === roundIdx
                      ? 'w-9 bg-amber-400'
                      : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-amber-200 tabular-nums">
            Ronde {roundIdx + 1}/{rounds.length}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm font-extrabold tabular-nums">
          <span className="inline-flex items-center gap-1">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 transition-transform ${
                  h <= hearts ? 'fill-rose-400 text-rose-400 scale-100' : 'text-white/20 scale-90'
                }`}
              />
            ))}
          </span>

          {combo >= 2 && (
            <motion.span
              key={combo}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-1 text-amber-300"
            >
              <Flame className="w-4 h-4 fill-amber-400" />
              x{combo}
            </motion.span>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-emerald-200">
            <Clock className="w-4 h-4 text-amber-300" />
            <div className="w-16 h-2 rounded-full bg-black/35 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-700"
                style={{ width: `${bonusPercent}%` }}
              />
            </div>
            <span>{bonusSeconds}d</span>
          </div>

          <span className="text-amber-300">Skor {score}</span>
        </div>
      </div>

      {/* Illuminated Rehal Manuscript Workspace */}
      <div
        className={`relative game-panel rounded-3xl p-5 sm:p-8 ${
          status === 'WRONG_SHAKE' ? 'animate-shake-hit border-rose-500' : ''
        }`}
      >
        {/* Floating Juicy Feedback Toast */}
        <AnimatePresence>
          {popToast && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{ opacity: 1, y: -12, scale: 1.08 }}
              exit={{ opacity: 0, y: -28 }}
              className="pointer-events-none absolute top-4 right-6 z-20 rounded-xl bg-amber-400 text-[#1A1406] font-display font-extrabold text-sm px-3.5 py-1.5 shadow-lg border-2 border-amber-700"
            >
              {popToast}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <p className="text-xs font-extrabold text-emerald-700">{currentRound.referenceLabel}</p>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F3D35] mt-0.5">
              {currentRound.prompt}
            </h2>
          </div>
          {status === 'PLAYING' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShowHint}
                className="game-btn-gold inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold cursor-pointer"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Petunjuk</span>
              </button>
              <button
                type="button"
                onClick={handleResetRound}
                className="game-btn-cream inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>
            </div>
          )}
        </div>

        {/* Illuminated Emerald Rehal Answer Tray */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!draggedUid) return;
            const found = availableTiles.find((t) => t.uid === draggedUid);
            setDraggedUid(null);
            if (found) handlePlaceTile(found);
          }}
          className="rounded-2xl bg-gradient-to-b from-[#0E3C34] to-[#144F45] border-4 border-[#BFA16A] p-5 sm:p-6 min-h-[132px] shadow-inner flex flex-col justify-center"
        >
          <p className="text-xs font-bold text-amber-200/90 mb-3.5">
            {currentRound.isArabic
              ? 'Papan Susun Ayat (Kanan → Kiri / RTL) — Ketuk atau seret ubin ke sini:'
              : 'Papan Susun Urutan (Kiri → Kanan) — Ketuk atau seret ubin ke sini:'}
          </p>

          <div
            dir={currentRound.isArabic ? 'rtl' : 'ltr'}
            className="flex flex-wrap items-center gap-3"
          >
            {currentRound.chunks.map((_, slotIndex) => {
              const placed = placedTiles[slotIndex];
              const isNextSlot = slotIndex === placedTiles.length;
              return (
                <div
                  key={slotIndex}
                  className={`min-h-[60px] min-w-[100px] rounded-2xl px-5 py-2.5 flex items-center justify-center border-2 transition-all ${
                    placed
                      ? 'bg-gradient-to-b from-amber-300 to-amber-400 text-[#1A1406] border-amber-600 shadow-[0_4px_0_#92400E] animate-pop-in'
                      : isNextSlot
                        ? 'bg-white/15 border-amber-300 border-dashed text-amber-200'
                        : 'bg-black/20 border-white/15 border-dashed text-emerald-200/50'
                  }`}
                >
                  {placed ? (
                    <span
                      className={
                        currentRound.isArabic
                          ? 'font-arabic text-3xl sm:text-4xl font-bold leading-relaxed'
                          : 'text-sm sm:text-base font-extrabold'
                      }
                    >
                      {placed.text}
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold tabular-nums">
                      {isNextSlot ? `Isi #${slotIndex + 1}` : `#${slotIndex + 1}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {status === 'WRONG_SHAKE' && (
          <p className="mt-3 text-sm font-extrabold text-rose-700 animate-pop-in">
            Ups, urutan potongan belum pas! Perhatikan kata sebelumnya atau klik Petunjuk.
          </p>
        )}

        {/* Tactile 3D Ivory Tile Pool */}
        {status !== 'ROUND_WON' && (
          <div className="mt-6">
            <p className="text-xs font-extrabold text-[#4A635E] mb-3">
              Ubin Potongan Tersedia (Ketuk berurutan atau seret ke papan hijau):
            </p>
            <div dir={currentRound.isArabic ? 'rtl' : 'ltr'} className="flex flex-wrap gap-3.5">
              {availableTiles.map((tile) => {
                const isHinted = hintTileUid === tile.uid;
                return (
                  <motion.button
                    layout
                    key={tile.uid}
                    type="button"
                    draggable
                    onDragStart={() => setDraggedUid(tile.uid)}
                    onDragEnd={() => setDraggedUid(null)}
                    onClick={() => handlePlaceTile(tile)}
                    className={`min-h-[62px] rounded-2xl px-6 py-3 cursor-pointer ${
                      isHinted
                        ? 'game-btn-gold ring-4 ring-amber-400/40'
                        : 'game-tile-arabic'
                    }`}
                  >
                    <span
                      className={
                        currentRound.isArabic
                          ? 'font-arabic text-3xl sm:text-4xl font-bold leading-relaxed'
                          : 'text-sm sm:text-base font-extrabold'
                      }
                    >
                      {tile.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Round Complete Celebration Card */}
        {status === 'ROUND_WON' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-6 rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-amber-50/70 p-5 sm:p-6 space-y-3 shadow-sm"
          >
            <div className="flex items-center gap-2 text-emerald-900 font-display font-extrabold text-xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>MasyaAllah, Susunan Sempurna!</span>
              <Sparkles className="w-5 h-5 text-amber-500 ml-1" />
            </div>
            <p className="text-sm sm:text-base font-bold text-[#0F3D35]">
              Artinya: &ldquo;{currentRound.translation}&rdquo;
            </p>
            <p className="text-sm text-[#33524C] leading-relaxed">{currentRound.explanation}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextRound}
                className="game-btn-emerald inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-6 py-3.5 text-base cursor-pointer"
              >
                <span>{roundIdx + 1 < rounds.length ? 'Ronde Berikutnya' : 'Klaim Kemenangan Misi'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
