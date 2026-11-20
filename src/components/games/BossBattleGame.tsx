import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Heart,
  Lightbulb,
  Shield,
  ShieldAlert,
  Sparkles,
  Swords,
  Zap,
} from 'lucide-react';
import {
  AvatarId,
  BossConfig,
  MissionResult,
  PowerUpId,
  PowerUpInventory,
} from '../../types/game';
import { soundFX } from '../../utils/sound';
import { AvatarPortrait, BossVisual } from '../Artwork';

const BOSS_ARENA_BG = '/src/assets/images/boss_arena_backdrop_1795158144697.jpg';

interface BossBattleGameProps {
  missionId: string;
  xpReward: number;
  playerName: string;
  avatarId: AvatarId;
  boss: BossConfig;
  inventory: PowerUpInventory;
  onConsumePowerUp: (id: PowerUpId) => void;
  onFinish: (result: MissionResult) => void;
  onGameOver: () => void;
}

export const BossBattleGame: React.FC<BossBattleGameProps> = ({
  missionId,
  xpReward,
  playerName,
  avatarId,
  boss,
  inventory,
  onConsumePowerUp,
  onFinish,
  onGameOver,
}) => {
  const totalBossHp = boss.questions.length;
  const [qIdx, setQIdx] = useState(0);
  const [bossHp, setBossHp] = useState(totalBossHp);
  const [playerHearts, setPlayerHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Ultimate Charge: 2 correct answers charge SUPER STRIKE (2x Damage!)
  const [ultimateCharge, setUltimateCharge] = useState(0);
  const [lastDamageDealt, setLastDamageDealt] = useState(1);

  // Usable Power-Ups inside Boss Battle
  const [shieldActive, setShieldActive] = useState(false);
  const [eliminatedOptIds, setEliminatedOptIds] = useState<string[]>([]);

  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'IDLE' | 'CORRECT' | 'WRONG' | 'SHIELDED'>('IDLE');
  const [showHint, setShowHint] = useState(false);
  const [bossHitAnim, setBossHitAnim] = useState(false);
  const [playerHitAnim, setPlayerHitAnim] = useState(false);

  const currentQ = boss.questions[qIdx];
  const isUltimateReady = ultimateCharge >= 2;

  const handleUseShield = () => {
    if (shieldActive || inventory.shield <= 0 || answerState !== 'IDLE') return;
    soundFX.playHint();
    onConsumePowerUp('shield');
    setShieldActive(true);
  };

  const handleUseFiftyFifty = () => {
    if (eliminatedOptIds.length > 0 || inventory.insight <= 0 || answerState !== 'IDLE') return;
    const wrongOpts = currentQ.options
      .filter((o) => o.id !== currentQ.correctOptionId)
      .slice(0, 2)
      .map((o) => o.id);
    soundFX.playHint();
    onConsumePowerUp('insight');
    setEliminatedOptIds(wrongOpts);
  };

  const handleAnswer = (optId: string) => {
    if (answerState !== 'IDLE') return;
    setSelectedOptId(optId);

    if (optId === currentQ.correctOptionId) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));

      const dmg = isUltimateReady ? 2 : 1;
      setLastDamageDealt(dmg);
      setUltimateCharge(isUltimateReady ? 0 : ultimateCharge + 1);
      setScore((s) => s + (isUltimateReady ? 220 : 120) + nextCombo * 20);
      setBossHp((hp) => Math.max(0, hp - dmg));
      setAnswerState('CORRECT');
      setBossHitAnim(true);
      soundFX.playBossHit();
      window.setTimeout(() => setBossHitAnim(false), 680);
    } else {
      if (shieldActive) {
        setShieldActive(false);
        setAnswerState('SHIELDED');
        soundFX.playHint();
        return;
      }

      setCombo(0);
      setUltimateCharge(0);
      setMistakes((m) => m + 1);
      const nextHearts = playerHearts - 1;
      setPlayerHearts(nextHearts);
      setAnswerState('WRONG');
      setPlayerHitAnim(true);
      soundFX.playWrong();
      window.setTimeout(() => {
        setPlayerHitAnim(false);
        if (nextHearts <= 0) {
          onGameOver();
        }
      }, 480);
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    if (answerState === 'WRONG' || answerState === 'SHIELDED') {
      setSelectedOptId(null);
      setAnswerState('IDLE');
      setShowHint(true);
      return;
    }

    if (bossHp <= 0 || qIdx + 1 >= boss.questions.length) {
      const stars: 1 | 2 | 3 = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
      const earnedXp = xpReward + (stars === 3 ? 40 : stars === 2 ? 15 : 0);
      onFinish({
        missionId,
        stars,
        score,
        maxScore: totalBossHp * 180,
        maxCombo,
        earnedXp,
        mistakes,
      });
    } else {
      setQIdx((i) => i + 1);
      setSelectedOptId(null);
      setEliminatedOptIds([]);
      setAnswerState('IDLE');
      setShowHint(false);
    }
  };

  const bossHpPercent = Math.round((bossHp / totalBossHp) * 100);

  return (
    <div className="space-y-5">
      {/* Epic Illustrated Andalusian 2D RPG Battle Stage */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-[#0F3D35] shadow-[0_14px_34px_rgba(15,61,53,0.28)] text-white">
        <img
          src={BOSS_ARENA_BG}
          alt="Arena Pertarungan Penjaga Hikmah"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2621]/78 via-[#0D352E]/45 to-[#081F1B]/88" />

        <div className="relative z-10 p-5 sm:p-7">
          {/* Top Battle Turn + Ultimate Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#092722]/85 border border-amber-400/50 px-3 py-1.5 text-xs font-extrabold text-amber-300 tabular-nums">
              <Swords className="w-4 h-4" />
              PERTARUNGAN BOSS · RONDE {qIdx + 1}/{boss.questions.length}
            </span>

            <div className="flex items-center gap-2">
              {isUltimateReady ? (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-[#1A1406] px-3 py-1.5 text-xs font-extrabold shadow-lg animate-pop-in">
                  <Sparkles className="w-4 h-4" />
                  JURUS SUPER SIAP (2x DAMAGE!)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#092722]/80 border border-emerald-400/35 px-3 py-1.5 text-xs font-bold text-emerald-200 tabular-nums">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Energi Jurus: {ultimateCharge}/2
                </span>
              )}
              {combo >= 2 && (
                <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500 text-[#1A1406] px-2.5 py-1.5 text-xs font-extrabold shadow">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  x{combo}
                </span>
              )}
            </div>
          </div>

          {/* Left Hero vs Center Beam vs Right Boss */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            <div
              className={`md:col-span-4 flex items-center gap-3.5 rounded-2xl bg-[#0B2D27]/85 border-2 p-3.5 shadow-lg ${
                playerHitAnim
                  ? 'animate-shake-hit border-rose-400'
                  : shieldActive
                    ? 'border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.45)]'
                    : 'border-emerald-400/45'
              }`}
            >
              <AvatarPortrait avatarId={avatarId} size={66} className="shrink-0 drop-shadow-md" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-emerald-300">
                  {shieldActive ? 'Perisai Cahaya Aktif!' : 'Penjelajah Hikmah'}
                </p>
                <p className="font-display text-lg font-extrabold truncate">{playerName}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[1, 2, 3].map((h) => (
                    <Heart
                      key={h}
                      className={`w-5 h-5 ${
                        h <= playerHearts ? 'fill-rose-400 text-rose-400' : 'text-white/25'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col items-center justify-center min-h-[54px] relative">
              {bossHitAnim ? (
                <div className="flex flex-col items-center animate-beam-shoot">
                  <div
                    className={`rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-yellow-200 shadow-[0_0_26px_#FBBF24] ${
                      lastDamageDealt === 2 ? 'h-5 w-44' : 'h-3 w-36'
                    }`}
                  />
                  <span className="mt-1 inline-flex items-center gap-1 font-display text-sm font-extrabold text-amber-300 drop-shadow">
                    <Zap className="w-4 h-4 fill-amber-300" />
                    {lastDamageDealt === 2 ? 'JURUS SUPER 2x!' : 'CAHAYA HIKMAH!'}
                  </span>
                </div>
              ) : (
                <span className="font-display text-2xl font-extrabold text-amber-300/90 drop-shadow">
                  VS
                </span>
              )}
            </div>

            <div className="md:col-span-4 relative flex items-center gap-3 rounded-2xl bg-[#0B2D27]/85 border-2 border-amber-400/55 p-3.5 shadow-lg">
              {bossHitAnim && (
                <span className="pointer-events-none absolute -top-4 right-8 font-display text-2xl font-extrabold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-float-damage">
                  -{lastDamageDealt} HP!
                </span>
              )}
              <div className="shrink-0 w-16 h-16 flex items-center justify-center">
                <div className="scale-[0.58] origin-center">
                  <BossVisual bossVisualId={boss.bossVisualId} isHit={bossHitAnim} />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-amber-300 truncate">{boss.bossTitle}</p>
                <p className="font-display text-lg font-extrabold truncate">{boss.bossName}</p>
                <div className="mt-1.5 space-y-1">
                  <div className="h-3.5 w-full rounded-full bg-black/50 border border-white/20 p-0.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-300"
                      style={{ width: `${bossHpPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-extrabold text-amber-100 tabular-nums">
                    HP Boss: {bossHp}/{totalBossHp}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm font-semibold text-amber-100 text-center italic drop-shadow">
            {bossHp === 0 ? boss.defeatQuote : boss.introQuote}
          </p>
        </div>
      </div>

      {/* Boss Command Deck + Active Power-Up Bar */}
      <div className="game-panel rounded-3xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F3D35] leading-snug max-w-2xl">
            {currentQ.prompt}
          </h2>
          {answerState === 'IDLE' && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
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
                <Shield className="w-3.5 h-3.5 text-sky-600" />
                <span>Perisai ({inventory.shield})</span>
              </button>
              <button
                type="button"
                disabled={eliminatedOptIds.length > 0 || inventory.insight <= 0}
                onClick={handleUseFiftyFifty}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-extrabold border-2 transition-all ${
                  inventory.insight > 0 && eliminatedOptIds.length === 0
                    ? 'game-btn-gold cursor-pointer'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>50:50 ({inventory.insight})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playHint();
                  setShowHint(true);
                }}
                className="game-btn-cream inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-extrabold cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Petunjuk</span>
              </button>
            </div>
          )}
        </div>

        {currentQ.arabicSnippet && (
          <div className="rounded-2xl bg-[#0F3D35] border-2 border-[#D4BC8B] px-6 py-5 text-center shadow-inner">
            <p className="font-arabic text-3xl sm:text-4xl font-bold text-amber-200">
              {currentQ.arabicSnippet}
            </p>
          </div>
        )}

        {showHint && answerState === 'IDLE' && (
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3 text-xs sm:text-sm font-bold text-amber-950 animate-pop-in">
            Petunjuk: {currentQ.hint}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentQ.options.map((opt, idx) => {
            const isEliminated = eliminatedOptIds.includes(opt.id);
            const isPicked = selectedOptId === opt.id;
            const isCorrectOpt = opt.id === currentQ.correctOptionId;

            let btnStyle = 'game-btn-cream';
            if (isEliminated) {
              btnStyle = 'bg-slate-100 border-2 border-slate-200 opacity-30 line-through';
            } else if (answerState !== 'IDLE') {
              if (answerState === 'CORRECT' && isCorrectOpt) {
                btnStyle =
                  'bg-emerald-700 text-white border-2 border-emerald-900 shadow-[0_4px_0_#064E3B]';
              } else if ((answerState === 'WRONG' || answerState === 'SHIELDED') && isPicked) {
                btnStyle =
                  'bg-rose-100 text-rose-950 border-2 border-rose-500 shadow-[0_4px_0_#BE123C]';
              } else {
                btnStyle = 'bg-white/60 border-2 border-[#E2DDD0] opacity-55';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={answerState !== 'IDLE' || isEliminated}
                onClick={() => handleAnswer(opt.id)}
                className={`rounded-2xl p-4 sm:p-5 text-left transition-all flex items-center gap-3.5 min-h-[70px] ${btnStyle} ${
                  answerState === 'IDLE' && !isEliminated ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-extrabold shrink-0 ${
                    answerState === 'CORRECT' && isCorrectOpt
                      ? 'bg-amber-300 text-[#1A1406]'
                      : 'bg-[#0F3D35] text-amber-300'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="min-w-0 flex-1">
                  {opt.arabic && (
                    <p className="font-arabic text-3xl font-bold leading-relaxed">{opt.arabic}</p>
                  )}
                  <p className="text-sm sm:text-base font-extrabold leading-snug">{opt.text}</p>
                </div>
              </button>
            );
          })}
        </div>

        {answerState !== 'IDLE' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border-2 p-5 sm:p-6 space-y-3 ${
              answerState === 'CORRECT'
                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-amber-50/70'
                : answerState === 'SHIELDED'
                  ? 'border-sky-400 bg-sky-50'
                  : 'border-rose-400 bg-rose-50'
            }`}
          >
            <div className="flex items-center gap-2 font-display font-extrabold text-xl">
              {answerState === 'CORRECT' ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="text-emerald-950">
                    {lastDamageDealt === 2
                      ? 'JURUS SUPER TELAK! -2 HP Boss!'
                      : 'Telak! Serangan Hikmah Menembus Boss!'}
                  </span>
                </>
              ) : answerState === 'SHIELDED' ? (
                <>
                  <Shield className="w-6 h-6 text-sky-600 shrink-0" />
                  <span className="text-sky-950">Perisai Cahaya Menahan Serangan! Nyawamu Aman!</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
                  <span className="text-rose-950">Boss Bertahan! Yuk Pelajari &amp; Serang Lagi</span>
                </>
              )}
            </div>
            <p className="text-sm sm:text-base text-[#33524C] leading-relaxed">
              {answerState === 'CORRECT'
                ? currentQ.explanation
                : `Petunjuk serangan: ${currentQ.hint}`}
            </p>
            <div>
              <button
                type="button"
                onClick={handleNext}
                className={`inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-6 py-3.5 text-base cursor-pointer ${
                  answerState === 'CORRECT' ? 'game-btn-emerald' : 'game-btn-gold'
                }`}
              >
                <span>
                  {answerState === 'WRONG' || answerState === 'SHIELDED'
                    ? 'Coba Serang Lagi'
                    : bossHp <= 0 || qIdx + 1 >= boss.questions.length
                      ? 'Klaim Kemenangan Boss!'
                      : 'Lanjut Ronde Berikutnya'}
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
