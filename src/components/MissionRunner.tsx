import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Coins,
  FlaskConical,
  Map,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BADGES, getIslandById } from '../data/curriculum';
import { Mission, MissionResult, PlayerProgress, PowerUpId } from '../types/game';
import { soundFX } from '../utils/sound';
import { IslandLandmarkIcon } from './Artwork';
import { ArcadeCatcherGame } from './games/ArcadeCatcherGame';
import { AyatSequencerGame } from './games/AyatSequencerGame';
import { BossBattleGame } from './games/BossBattleGame';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { StoryCaseGame } from './games/StoryCaseGame';
import { TajwidDetectiveGame } from './games/TajwidDetectiveGame';

interface MissionRunnerProps {
  mission: Mission;
  progress: PlayerProgress;
  onConsumePowerUp: (id: PowerUpId) => void;
  onCompleteMission: (result: MissionResult) => string[];
  onExitToMap: () => void;
  onOpenLibrary: () => void;
  onToggleMute: () => void;
}

export const MissionRunner: React.FC<MissionRunnerProps> = ({
  mission,
  progress,
  onConsumePowerUp,
  onCompleteMission,
  onExitToMap,
  onOpenLibrary,
  onToggleMute,
}) => {
  const [phase, setPhase] = useState<'BRIEFING' | 'ACTIVE' | 'VICTORY' | 'GAME_OVER'>('BRIEFING');
  const [attemptKey, setAttemptKey] = useState(0);
  const [doubleXpArmed, setDoubleXpArmed] = useState(false);
  const [finalResult, setFinalResult] = useState<MissionResult | null>(null);
  const [newBadgeIds, setNewBadgeIds] = useState<string[]>([]);

  const island = getIslandById(mission.islandId);

  const handleStartMission = () => {
    soundFX.playClick();
    if (doubleXpArmed && progress.inventory.doubleXp > 0) {
      onConsumePowerUp('doubleXp');
    }
    setPhase('ACTIVE');
  };

  const handleFinish = (rawResult: MissionResult) => {
    soundFX.playVictory();
    const earnedCoins = 45 + rawResult.stars * 15 + Math.min(30, rawResult.maxCombo * 5);
    const boostedResult: MissionResult = {
      ...rawResult,
      earnedXp: doubleXpArmed ? rawResult.earnedXp * 2 : rawResult.earnedXp,
      earnedCoins,
    };
    const newlyUnlocked = onCompleteMission(boostedResult);
    setFinalResult(boostedResult);
    setNewBadgeIds(newlyUnlocked);
    setPhase('VICTORY');
  };

  const handleGameOver = () => {
    setPhase('GAME_OVER');
  };

  const handleRetry = () => {
    soundFX.playClick();
    setAttemptKey((k) => k + 1);
    setFinalResult(null);
    setNewBadgeIds([]);
    setPhase('ACTIVE');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1EBD9] bg-islamic-lattice text-[#102A26]">
      {/* Rich Emerald Mission Header */}
      <header className="sticky top-0 z-30 bg-[#0F3D35] text-white border-b-4 border-[#092722] shadow-md px-4 sm:px-6 py-3">
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onExitToMap();
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] active:translate-y-[2px] px-3.5 py-2 text-xs sm:text-sm font-bold text-amber-50 transition-all cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            <span>Peta Pulau</span>
          </button>

          <div className="min-w-0 text-center hidden sm:block">
            <p className="text-xs font-bold text-amber-300 truncate">
              {island?.babLabel} · {island?.name}
            </p>
            <h1 className="font-display text-base font-extrabold text-white truncate">
              {mission.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenLibrary();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] px-3 py-2 text-xs font-bold text-amber-50 transition-all cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Pustaka</span>
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={progress.soundMuted ? 'Aktifkan suara' : 'Matikan suara'}
              className="inline-flex items-center justify-center rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] p-2 text-amber-50 transition-all cursor-pointer"
            >
              {progress.soundMuted ? (
                <VolumeX className="w-4 h-4 text-rose-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Mission Stage */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 py-6 sm:py-8">
        {/* Phase 1: Mission Briefing + Ramuan 2x XP Toggle */}
        {phase === 'BRIEFING' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel rounded-3xl overflow-hidden max-w-2xl mx-auto"
          >
            <div className="bg-[#0F3D35] text-white p-6 sm:p-7 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-islamic-lattice-light opacity-70" />
              <div className="relative z-10 flex items-center gap-4">
                {island && (
                  <div className="rounded-2xl bg-white p-1.5 shadow-lg shrink-0">
                    <IslandLandmarkIcon islandId={island.id} size={56} />
                  </div>
                )}
                <div>
                  <p className="text-xs font-extrabold text-amber-300">
                    {island?.babLabel} · {mission.shortSubtitle} · +{mission.xpReward} XP
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                    {mission.title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-base sm:text-lg text-[#102A26] font-medium leading-relaxed">
                {mission.briefing}
              </p>

              {/* Optional Ramuan XP 2x Pre-Mission Activator */}
              {progress.inventory.doubleXp > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playHint();
                    setDoubleXpArmed((a) => !a);
                  }}
                  className={`w-full rounded-2xl border-2 p-4 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    doubleXpArmed
                      ? 'bg-amber-100 border-amber-500 shadow-[0_4px_0_#D97706]'
                      : 'bg-white border-[#D4C8AE] hover:border-amber-500'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#1A1406] flex items-center justify-center shrink-0">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm sm:text-base font-extrabold text-[#0F3D35]">
                        Gunakan Ramuan XP 2x (Stok: {progress.inventory.doubleXp})
                      </p>
                      <p className="text-xs font-semibold text-[#4A635E]">
                        Gandakan seluruh XP yang didapat pada misi ini!
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-extrabold ${
                      doubleXpArmed ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {doubleXpArmed ? 'AKTIF 2x!' : 'Pakai'}
                  </span>
                </button>
              )}

              <div className="rounded-2xl border-2 border-[#E2D8C0] bg-white p-4 text-xs sm:text-sm text-[#33524C] space-y-1.5">
                <p className="font-extrabold text-[#0F3D35] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Bekal Penjelajah:</span>
                </p>
                <p>• Setiap misi menghadiahkan <strong>XP + Koin Hikmah</strong> untuk belanja Power-Up!</p>
                <p>• Raih <strong>6+ Bintang</strong> di satu pulau untuk membuka <strong>Peti Harta Pulau</strong>!</p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={handleStartMission}
                  className="game-btn-gold inline-flex items-center gap-2.5 rounded-2xl font-display font-extrabold px-8 py-4 text-base sm:text-lg cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Mulai Misi!</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    onOpenLibrary();
                  }}
                  className="game-btn-cream inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-5 py-4 text-sm sm:text-base cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Intip Pustaka Dulu</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 2: All 6 Distinct Mini-Game Engines */}
        {phase === 'ACTIVE' && (
          <div key={attemptKey}>
            {mission.type === 'AYAT_SEQUENCER' && mission.sequencerRounds && (
              <AyatSequencerGame
                missionId={mission.id}
                xpReward={mission.xpReward}
                rounds={mission.sequencerRounds}
                onFinish={handleFinish}
                onGameOver={handleGameOver}
              />
            )}

            {mission.type === 'TAJWID_DETECTIVE' && mission.detectiveQuestions && (
              <TajwidDetectiveGame
                missionId={mission.id}
                xpReward={mission.xpReward}
                questions={mission.detectiveQuestions}
                onFinish={handleFinish}
                onGameOver={handleGameOver}
              />
            )}

            {mission.type === 'ARCADE_CATCHER' && mission.arcadeWaves && (
              <ArcadeCatcherGame
                missionId={mission.id}
                xpReward={mission.xpReward}
                waves={mission.arcadeWaves}
                inventory={progress.inventory}
                onConsumePowerUp={onConsumePowerUp}
                onFinish={handleFinish}
                onGameOver={handleGameOver}
              />
            )}

            {mission.type === 'MEMORY_MATCH' && mission.memoryPairs && (
              <MemoryMatchGame
                missionId={mission.id}
                xpReward={mission.xpReward}
                pairs={mission.memoryPairs}
                inventory={progress.inventory}
                onConsumePowerUp={onConsumePowerUp}
                onFinish={handleFinish}
              />
            )}

            {mission.type === 'STORY_CASE' && mission.storyScenes && (
              <StoryCaseGame
                missionId={mission.id}
                xpReward={mission.xpReward}
                scenes={mission.storyScenes}
                onFinish={handleFinish}
              />
            )}

            {mission.type === 'BOSS_BATTLE' && mission.bossConfig && (
              <BossBattleGame
                missionId={mission.id}
                xpReward={mission.xpReward}
                playerName={progress.playerName || 'Penjelajah MI'}
                avatarId={progress.avatarId}
                boss={mission.bossConfig}
                inventory={progress.inventory}
                onConsumePowerUp={onConsumePowerUp}
                onFinish={handleFinish}
                onGameOver={handleGameOver}
              />
            )}
          </div>
        )}

        {/* Phase 3: Celebratory Victory Screen with XP + Koin Hikmah */}
        {phase === 'VICTORY' && finalResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="game-panel rounded-3xl overflow-hidden max-w-xl mx-auto text-center"
          >
            <div className="bg-gradient-to-b from-[#0F3D35] to-[#15574B] text-white p-7 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-islamic-lattice-light opacity-70" />
              <div className="relative z-10 space-y-3">
                <motion.div
                  initial={{ rotate: -15, scale: 0.6 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-b from-amber-300 to-amber-500 text-[#1A1406] border-2 border-amber-700 shadow-lg flex items-center justify-center"
                >
                  <Trophy className="w-11 h-11" />
                </motion.div>
                <p className="text-xs font-extrabold text-amber-300 tracking-wide">
                  MISI BERHASIL DITAKLUKKAN!
                </p>
                <h2 className="font-display text-3xl font-extrabold">Alhamdulillah, Hebat!</h2>

                <div className="flex items-center justify-center gap-3 pt-2">
                  {[1, 2, 3].map((s) => (
                    <motion.div
                      key={s}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.14 * s, type: 'spring', stiffness: 320, damping: 14 }}
                    >
                      <Star
                        className={`w-12 h-12 ${
                          s <= finalResult.stars
                            ? 'fill-amber-400 text-amber-300 drop-shadow-[0_4px_10px_rgba(251,191,36,0.5)]'
                            : 'text-white/20'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <div className="grid grid-cols-3 gap-3 rounded-2xl border-2 border-[#E2D8C0] bg-white p-4 tabular-nums">
                <div>
                  <p className="text-xs font-bold text-[#556E68]">XP Diraih</p>
                  <p className="font-display text-2xl font-extrabold text-emerald-700">
                    +{finalResult.earnedXp}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#556E68]">Koin Hikmah</p>
                  <p className="font-display text-2xl font-extrabold text-amber-600 inline-flex items-center gap-1 justify-center">
                    <Coins className="w-5 h-5 text-amber-500" />
                    +{finalResult.earnedCoins ?? 50}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#556E68]">Kombo</p>
                  <p className="font-display text-2xl font-extrabold text-[#0F3D35]">
                    x{Math.max(1, finalResult.maxCombo)}
                  </p>
                </div>
              </div>

              {newBadgeIds.length > 0 && (
                <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 text-left space-y-2">
                  <p className="text-xs font-extrabold text-amber-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Lencana Baru Terbuka!</span>
                  </p>
                  {newBadgeIds.map((bId) => {
                    const badge = BADGES.find((b) => b.id === bId);
                    if (!badge) return null;
                    return (
                      <div key={bId} className="text-sm font-extrabold text-[#0F3D35]">
                        {badge.title}{' '}
                        <span className="font-medium text-xs text-[#4A635E]">
                          — {badge.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    onExitToMap();
                  }}
                  className="game-btn-emerald inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-7 py-3.5 text-base cursor-pointer"
                >
                  <Map className="w-5 h-5" />
                  <span>Lanjut ke Peta</span>
                </button>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="game-btn-cream inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-5 py-3.5 text-sm sm:text-base cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 4: Encouraging Retry Modal */}
        {phase === 'GAME_OVER' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="game-panel rounded-3xl p-7 sm:p-8 max-w-lg mx-auto text-center space-y-5"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F3D35]">
              Nyawa Habis — Tetap Semangat!
            </h2>
            <p className="text-sm sm:text-base text-[#4A635E] leading-relaxed">
              Kamu bisa menggunakan <strong>Perisai Cahaya</strong> dari Toko Bekal atau mengintip{' '}
              <strong>Pustaka Kitab</strong> dulu sebelum mencoba lagi!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                className="game-btn-gold inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-7 py-3.5 text-base cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Coba Lagi!</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onOpenLibrary();
                }}
                className="game-btn-cream inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-5 py-3.5 text-sm sm:text-base cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Buka Pustaka</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};
