import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Flame, Heart, Search, Sparkles, XCircle } from 'lucide-react';
import { DetectiveQuestion, MissionResult } from '../../types/game';
import { soundFX } from '../../utils/sound';

interface TajwidDetectiveGameProps {
  missionId: string;
  xpReward: number;
  questions: DetectiveQuestion[];
  onFinish: (result: MissionResult) => void;
  onGameOver: () => void;
}

export const TajwidDetectiveGame: React.FC<TajwidDetectiveGameProps> = ({
  missionId,
  xpReward,
  questions,
  onFinish,
  onGameOver,
}) => {
  const [qIdx, setQIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [step, setStep] = useState<'FIND_TOKEN' | 'CLASSIFY' | 'EXPLAIN'>('FIND_TOKEN');
  const [foundTokenId, setFoundTokenId] = useState<string | null>(null);
  const [wrongFlashId, setWrongFlashId] = useState<string | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [choiceCorrect, setChoiceCorrect] = useState<boolean>(false);

  const current = questions[qIdx];

  const triggerMistake = (flashId: string) => {
    soundFX.playWrong();
    setCombo(0);
    setMistakes((m) => m + 1);
    setWrongFlashId(flashId);
    const nextHearts = hearts - 1;
    setHearts(nextHearts);

    window.setTimeout(() => {
      setWrongFlashId(null);
      if (nextHearts <= 0) {
        onGameOver();
      }
    }, 460);
  };

  const handleTokenClick = (tokenId: string) => {
    if (step !== 'FIND_TOKEN') return;
    if (current.targetTokenIds.includes(tokenId)) {
      soundFX.playTilePlace(2);
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));
      setScore((s) => s + 60);
      setFoundTokenId(tokenId);
      setStep('CLASSIFY');
    } else {
      triggerMistake(tokenId);
    }
  };

  const handleChoiceSelect = (choiceId: string) => {
    if (step !== 'CLASSIFY') return;
    setSelectedChoiceId(choiceId);
    if (choiceId === current.correctChoiceId) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));
      setScore((s) => s + 90 + nextCombo * 10);
      setChoiceCorrect(true);
      setStep('EXPLAIN');
      soundFX.playCorrect(nextCombo);
    } else {
      setChoiceCorrect(false);
      triggerMistake(choiceId);
      if (hearts - 1 > 0) {
        setStep('EXPLAIN');
      }
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    if (qIdx + 1 < questions.length) {
      setQIdx((i) => i + 1);
      setStep('FIND_TOKEN');
      setFoundTokenId(null);
      setSelectedChoiceId(null);
      setChoiceCorrect(false);
    } else {
      const stars: 1 | 2 | 3 = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
      const earnedXp = xpReward + (stars === 3 ? 25 : stars === 2 ? 10 : 0);
      onFinish({
        missionId,
        stars,
        score,
        maxScore: questions.length * 180,
        maxCombo,
        earnedXp,
        mistakes,
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Detective Observatory HUD */}
      <div className="rounded-2xl bg-[#0C3B56] text-white border-2 border-[#082638] shadow-md px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {questions.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 rounded-full transition-all ${
                  idx < qIdx ? 'w-7 bg-emerald-400' : idx === qIdx ? 'w-9 bg-amber-400' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-sky-200 tabular-nums">
            Kasus {qIdx + 1}/{questions.length}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm font-extrabold tabular-nums">
          <span className="inline-flex items-center gap-1">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 ${
                  h <= hearts ? 'fill-rose-400 text-rose-400' : 'text-white/20'
                }`}
              />
            ))}
          </span>
          {combo >= 2 && (
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Flame className="w-4 h-4 fill-amber-400" />
              x{combo}
            </span>
          )}
          <span className="text-amber-300">Skor {score}</span>
        </div>
      </div>

      {/* Magnifying Lens Inspection Desk */}
      <div className="game-panel rounded-3xl p-5 sm:p-8 space-y-6">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white shadow-[0_4px_0_#075985] flex items-center justify-center shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-sky-700">
              {current.referenceLabel} ·{' '}
              {step === 'FIND_TOKEN' ? 'Langkah 1/2: Tangkap Lafal di Ayat' : 'Langkah 2/2: Tentukan Hukum / Arti'}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F3D35] mt-0.5">
              {step === 'FIND_TOKEN'
                ? current.instruction
                : current.mode === 'TAJWID_TWO_STEP'
                  ? 'Tertangkap! Sekarang tentukan hukum bacaan Mim Sukun-nya:'
                  : 'Tertangkap! Sekarang pilih arti yang tepat untuk lafal tersebut:'}
            </h2>
          </div>
        </div>

        {/* Illuminated RTL Arabic Inspection Stage */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0C3B56] to-[#114D6E] border-4 border-[#D4BC8B] p-6 sm:p-8 text-center shadow-inner">
          <div dir="rtl" className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {current.verseTokens.map((token) => {
              const isTargetFound =
                foundTokenId === token.id ||
                (step === 'EXPLAIN' && current.targetTokenIds.includes(token.id));
              const isWrong = wrongFlashId === token.id;

              return (
                <button
                  key={token.id}
                  type="button"
                  disabled={step !== 'FIND_TOKEN'}
                  onClick={() => handleTokenClick(token.id)}
                  className={`rounded-2xl px-6 py-3.5 transition-all ${
                    isTargetFound
                      ? 'bg-gradient-to-b from-amber-300 to-amber-400 text-[#1A1406] border-2 border-amber-700 shadow-[0_5px_0_#92400E] scale-105'
                      : isWrong
                        ? 'bg-rose-100 text-rose-900 border-2 border-rose-500 animate-shake-hit'
                        : step === 'FIND_TOKEN'
                          ? 'game-tile-arabic cursor-pointer'
                          : 'bg-white/15 text-white/60 border-2 border-white/15'
                  }`}
                >
                  <span className="font-arabic text-3xl sm:text-4xl font-bold leading-relaxed block">
                    {token.arabic}
                  </span>
                </button>
              );
            })}
          </div>
          {step === 'FIND_TOKEN' && (
            <p className="text-xs font-bold text-sky-100/90 mt-4">
              Arahkan kaca pembesar &amp; ketuk langsung potongan ayat Arab di atas!
            </p>
          )}
        </div>

        {/* Step 2: Chunky Tactile Choice Cards */}
        {step === 'CLASSIFY' && current.choices && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
          >
            {current.choices.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => handleChoiceSelect(ch.id)}
                className="game-btn-cream rounded-2xl p-4 sm:p-5 text-left cursor-pointer min-h-[88px]"
              >
                <p className="font-display text-lg font-extrabold text-[#0F3D35]">{ch.label}</p>
                {ch.sublabel && (
                  <p className="text-xs font-bold text-sky-700 mt-1">{ch.sublabel}</p>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Educational Breakdown Card */}
        {step === 'EXPLAIN' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl border-2 p-5 sm:p-6 space-y-3 ${
              choiceCorrect
                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-amber-50/60'
                : 'border-amber-400 bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2 font-display font-extrabold text-xl">
              {choiceCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="text-emerald-950">Brilian! Analisis Detektif Tepat!</span>
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <span className="text-[#0F3D35]">Catatan Detektif — Yuk Pahami!</span>
                </>
              )}
            </div>
            {selectedChoiceId && !choiceCorrect && current.choices && (
              <p className="text-sm font-extrabold text-emerald-800">
                Jawaban yang tepat:{' '}
                {current.choices.find((c) => c.id === current.correctChoiceId)?.label}
              </p>
            )}
            <p className="text-sm sm:text-base text-[#33524C] leading-relaxed">
              {current.explanation}
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={handleNext}
                className="game-btn-emerald inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-6 py-3.5 text-base cursor-pointer"
              >
                <span>
                  {qIdx + 1 < questions.length ? 'Kasus Berikutnya' : 'Klaim Kemenangan Misi'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
