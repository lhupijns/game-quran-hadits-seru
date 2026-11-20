import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Eye, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { MemoryPair, MissionResult, PowerUpId, PowerUpInventory } from '../../types/game';
import { soundFX } from '../../utils/sound';

interface MemoryMatchGameProps {
  missionId: string;
  xpReward: number;
  pairs: MemoryPair[];
  inventory: PowerUpInventory;
  onConsumePowerUp: (id: PowerUpId) => void;
  onFinish: (result: MissionResult) => void;
}

interface FlipCard {
  uid: string;
  pairId: string;
  kind: 'ARABIC' | 'MEANING';
  content: string;
  note: string;
}

function shuffleCards(cards: FlipCard[], seedStr: string): FlipCard[] {
  const arr = [...cards];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 37 + seedStr.charCodeAt(i)) % 9973;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({
  missionId,
  xpReward,
  pairs,
  inventory,
  onConsumePowerUp,
  onFinish,
}) => {
  const cards = useMemo(() => {
    const raw: FlipCard[] = [];
    pairs.forEach((p) => {
      raw.push({
        uid: `${p.id}-ar`,
        pairId: p.id,
        kind: 'ARABIC',
        content: p.arabic,
        note: p.note,
      });
      raw.push({
        uid: `${p.id}-id`,
        pairId: p.id,
        kind: 'MEANING',
        content: p.meaning,
        note: p.note,
      });
    });
    return shuffleCards(raw, missionId);
  }, [pairs, missionId]);

  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [peekActive, setPeekActive] = useState(false);
  const [lastMatchNote, setLastMatchNote] = useState<string | null>(null);

  const allMatched = matchedPairIds.length === pairs.length;

  const handleCardTap = (card: FlipCard) => {
    if (locked || peekActive || allMatched) return;
    if (matchedPairIds.includes(card.pairId)) return;
    if (flippedUids.includes(card.uid)) return;

    soundFX.playTilePlace(flippedUids.length);
    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [firstUid, secondUid] = nextFlipped;
      const firstCard = cards.find((c) => c.uid === firstUid)!;
      const secondCard = cards.find((c) => c.uid === secondUid)!;

      if (firstCard.pairId === secondCard.pairId && firstCard.kind !== secondCard.kind) {
        const nextCombo = combo + 1;
        setCombo(nextCombo);
        setMaxCombo((m) => Math.max(m, nextCombo));
        setScore((s) => s + 100 + nextCombo * 20);
        setLastMatchNote(firstCard.note);
        soundFX.playCorrect(nextCombo);

        window.setTimeout(() => {
          setMatchedPairIds((prev) => [...prev, firstCard.pairId]);
          setFlippedUids([]);
          setLocked(false);
        }, 360);
      } else {
        setCombo(0);
        setMistakes((m) => m + 1);
        soundFX.playWrong();
        window.setTimeout(() => {
          setFlippedUids([]);
          setLocked(false);
        }, 780);
      }
    }
  };

  const handleUsePeek = () => {
    if (peekActive || inventory.insight <= 0 || allMatched) return;
    soundFX.playHint();
    onConsumePowerUp('insight');
    setPeekActive(true);
    window.setTimeout(() => setPeekActive(false), 2600);
  };

  const handleClaimVictory = () => {
    const stars: 1 | 2 | 3 = mistakes <= 3 ? 3 : mistakes <= 6 ? 2 : 1;
    const earnedXp = xpReward + (stars === 3 ? 30 : 15);
    onFinish({
      missionId,
      stars,
      score,
      maxScore: pairs.length * 160,
      maxCombo,
      earnedXp,
      mistakes,
    });
  };

  return (
    <div className="space-y-5">
      {/* Memory Board HUD */}
      <div className="rounded-2xl bg-[#0F3D35] text-white border-2 border-[#08241F] shadow-md px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-extrabold tabular-nums">
          <span className="text-amber-300">
            Pasangan Ditemukan: {matchedPairIds.length}/{pairs.length}
          </span>
          <span className="opacity-40" aria-hidden="true">|</span>
          <span className="text-emerald-200">Langkah: {moves}</span>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-extrabold tabular-nums">
          {combo >= 2 && (
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Flame className="w-4 h-4 fill-amber-400" />
              Kombo x{combo}
            </span>
          )}
          <span className="text-amber-300">Skor {score}</span>
          <button
            type="button"
            disabled={peekActive || inventory.insight <= 0 || allMatched}
            onClick={handleUsePeek}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all ${
              peekActive
                ? 'bg-amber-300 text-[#1A1406]'
                : inventory.insight > 0
                  ? 'bg-amber-400 hover:bg-amber-300 text-[#1A1406] cursor-pointer'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Intip Semua ({inventory.insight})</span>
          </button>
        </div>
      </div>

      {/* Live Educational Note after matching */}
      {lastMatchNote && (
        <motion.div
          key={lastMatchNote}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{lastMatchNote}</span>
        </motion.div>
      )}

      {/* 3x4 / 4x3 Tactile Flip-Card Board */}
      <div className="game-panel rounded-3xl p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-bold text-[#4A635E] mb-4">
          Cocokkan setiap <strong>Kartu Lafal Arab</strong> dengan <strong>Kartu Artinya</strong> yang tepat!
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card) => {
            const isMatched = matchedPairIds.includes(card.pairId);
            const isFaceUp = isMatched || peekActive || flippedUids.includes(card.uid);

            return (
              <motion.button
                key={card.uid}
                type="button"
                whileTap={!isFaceUp ? { scale: 0.94 } : undefined}
                onClick={() => handleCardTap(card)}
                className={`relative min-h-[112px] sm:min-h-[126px] rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all border-2 ${
                  isMatched
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[0_4px_0_#047857]'
                    : isFaceUp
                      ? 'bg-gradient-to-b from-[#FFFDF7] to-[#FEF3C7] border-amber-500 text-[#0F3D35] shadow-[0_5px_0_#D97706]'
                      : 'bg-gradient-to-b from-[#134E44] to-[#0B302A] border-amber-400/70 text-amber-200 shadow-[0_5px_0_#061E1A] hover:-translate-y-1 cursor-pointer'
                }`}
              >
                {isFaceUp ? (
                  <motion.div
                    initial={{ rotateY: 90, opacity: 0.4 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <span
                      className={`text-[10px] font-extrabold block mb-1 ${
                        isMatched ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {card.kind === 'ARABIC' ? 'LAFAL ARAB' : 'ARTI / MAKNA'}
                    </span>
                    <span
                      className={
                        card.kind === 'ARABIC'
                          ? 'font-arabic text-2xl sm:text-3xl font-bold leading-snug block'
                          : 'text-xs sm:text-sm font-extrabold leading-snug block'
                      }
                    >
                      {card.content}
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 opacity-90">
                    <span className="w-9 h-9 rounded-xl border-2 border-amber-300/60 bg-white/10 flex items-center justify-center font-display font-extrabold text-amber-300 text-lg">
                      ✦
                    </span>
                    <span className="text-[10px] font-bold text-emerald-200">Buka Kartu</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* All Matched Banner */}
        {allMatched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-amber-50 p-5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-display text-xl font-extrabold text-[#0F3D35]">
                  Semua Pasangan Kartu Terbuka!
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#4A635E]">
                  Ingatanmu tajam sekali — tuntas dalam {moves} langkah!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClaimVictory}
              className="game-btn-gold inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-6 py-3.5 text-base cursor-pointer"
            >
              <span>Klaim Kemenangan!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
