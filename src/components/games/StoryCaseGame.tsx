import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpenCheck, CheckCircle2, HeartHandshake, AlertCircle, Sparkles } from 'lucide-react';
import { MissionResult, StoryChoice, StoryScene } from '../../types/game';
import { soundFX } from '../../utils/sound';

const STORY_MADRASAH_ART = '/src/assets/images/story_madrasah_scene_1795158146015.jpg';

interface StoryCaseGameProps {
  missionId: string;
  xpReward: number;
  scenes: StoryScene[];
  onFinish: (result: MissionResult) => void;
}

const SCENE_TINT: Record<StoryScene['sceneIllustration'], string> = {
  'fauzi-school': 'from-emerald-950/75 via-emerald-900/20 to-transparent',
  'neighbor-help': 'from-amber-950/75 via-amber-900/20 to-transparent',
  'sinai-scroll': 'from-sky-950/75 via-sky-900/20 to-transparent',
  'orphan-friend': 'from-violet-950/75 via-violet-900/20 to-transparent',
};

export const StoryCaseGame: React.FC<StoryCaseGameProps> = ({
  missionId,
  xpReward,
  scenes,
  onFinish,
}) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(null);
  const [wiseCount, setWiseCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const currentScene = scenes[sceneIdx];

  const handleChoose = (choice: StoryChoice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    if (choice.isWise) {
      setWiseCount((c) => c + 1);
      soundFX.playCorrect(wiseCount + 1);
    } else {
      setMistakes((m) => m + 1);
      soundFX.playWrong();
    }
  };

  const handleContinue = () => {
    soundFX.playClick();
    if (sceneIdx + 1 < scenes.length) {
      setSceneIdx((i) => i + 1);
      setSelectedChoice(null);
    } else {
      const stars: 1 | 2 | 3 = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
      const earnedXp = xpReward + (stars === 3 ? 25 : 10);
      onFinish({
        missionId,
        stars,
        score: wiseCount * 120 + (scenes.length - wiseCount) * 40,
        maxScore: scenes.length * 120,
        maxCombo: wiseCount,
        earnedXp,
        mistakes,
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Storybook HUD Bar */}
      <div className="rounded-2xl bg-[#3B1E6E] text-white border-2 border-[#26114B] shadow-md px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs sm:text-sm font-extrabold text-amber-200 tabular-nums">
          Babak {sceneIdx + 1}/{scenes.length} · {currentScene.chapterTag}
        </div>
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-200 tabular-nums">
          <HeartHandshake className="w-4 h-4 text-amber-300" />
          <span>Poin Akhlak Bijak: {wiseCount}/{scenes.length}</span>
        </div>
      </div>

      {/* Visual Novel Stage Card */}
      <div className="game-panel rounded-3xl overflow-hidden">
        {/* Lush Illustrated Storybook Backdrop */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden">
          <img
            src={STORY_MADRASAH_ART}
            alt={currentScene.chapterTag}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${SCENE_TINT[currentScene.sceneIllustration]}`}
          />
          {/* Floating Dialogue Ribbon anchored inside storybook scene */}
          <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6">
            <div className="rounded-2xl bg-[#FFFDF8]/95 border-2 border-[#0F3D35] p-3.5 sm:p-4 shadow-xl">
              <p className="text-xs font-extrabold text-emerald-800 mb-0.5">
                {currentScene.characterName}
              </p>
              <p className="text-sm sm:text-base font-bold text-[#102A26] italic leading-snug">
                {currentScene.dialogue}
              </p>
            </div>
          </div>
        </div>

        {/* Story Narration & Interactive Decisions */}
        <div className="p-5 sm:p-7 space-y-5">
          <p className="text-sm sm:text-base text-[#33524C] leading-relaxed font-medium">
            {currentScene.narration}
          </p>

          <div className="pt-3 border-t-2 border-[#E8DEC8]">
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#0F3D35] mb-4">
              {currentScene.question}
            </h2>

            <div className="grid grid-cols-1 gap-3.5">
              {currentScene.choices.map((choice, idx) => {
                const isPicked = selectedChoice?.id === choice.id;
                const disabled = Boolean(selectedChoice);

                let styleClass = 'game-btn-cream';
                if (selectedChoice) {
                  if (isPicked && choice.isWise) {
                    styleClass =
                      'bg-emerald-100 border-2 border-emerald-600 text-emerald-950 shadow-[0_4px_0_#047857]';
                  } else if (isPicked && !choice.isWise) {
                    styleClass =
                      'bg-amber-100 border-2 border-amber-500 text-[#102A26] shadow-[0_4px_0_#D97706]';
                  } else {
                    styleClass = 'bg-white/60 border-2 border-[#E2DDD0] opacity-50';
                  }
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleChoose(choice)}
                    className={`w-full rounded-2xl p-4 sm:p-5 text-left transition-all flex items-start gap-3.5 ${styleClass} ${
                      disabled ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#0F3D35] text-amber-300 text-sm font-extrabold shrink-0 mt-0.5">
                      {idx === 0 ? 'A' : 'B'}
                    </span>
                    <span className="text-sm sm:text-base font-bold leading-snug">
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Branching Reflection Panel */}
          {selectedChoice && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border-2 p-5 sm:p-6 space-y-3 ${
                selectedChoice.isWise
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-amber-50/70'
                  : 'border-amber-400 bg-amber-50'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-display font-extrabold text-xl text-[#0F3D35]">
                  {selectedChoice.isWise ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  )}
                  <span>{selectedChoice.outcomeTitle}</span>
                  {selectedChoice.isWise && <Sparkles className="w-5 h-5 text-amber-500" />}
                </div>
                <span className="text-xs font-extrabold text-emerald-800">
                  Panca Cinta: {selectedChoice.pancaCintaTag}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#33524C] leading-relaxed">
                {selectedChoice.outcomeText}
              </p>

              <div className="rounded-xl bg-white/90 border border-[#D4C8AE] p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-[#0F3D35]">
                <BookOpenCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Hikmah Al-Qur&apos;an Hadits:</strong> {selectedChoice.dalilNote}
                </span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="game-btn-emerald inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-6 py-3.5 text-base cursor-pointer"
                >
                  <span>
                    {sceneIdx + 1 < scenes.length ? 'Babak Cerita Berikutnya' : 'Selesaikan Studi Kasus'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
