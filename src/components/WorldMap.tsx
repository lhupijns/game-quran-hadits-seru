import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Coins,
  Compass,
  Crown,
  FileBadge,
  Gift,
  Home,
  Info,
  Lock,
  Play,
  ShoppingBag,
  Sparkles,
  Star,
  Swords,
  Unlock,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ALL_MISSIONS, ISLANDS } from '../data/curriculum';
import { APP_IDENTITY } from '../data/identity';
import { Island, IslandId, Mission, PlayerProgress } from '../types/game';
import {
  canClaimIslandChest,
  computeLevelInfo,
  countConqueredIslands,
  countTotalStars,
  getIslandStars,
  isIslandCompleted,
  isIslandUnlocked,
  isMissionUnlocked,
} from '../utils/storage';
import { soundFX } from '../utils/sound';
import { AvatarPortrait, IslandLandmarkIcon } from './Artwork';

const WORLD_MAP_ART_URL = '/src/assets/images/world_map_canvas_1795158144188.jpg';

interface WorldMapProps {
  progress: PlayerProgress;
  onSelectMission: (mission: Mission) => void;
  onClaimChest: (islandId: IslandId) => void;
  onBackToTitle: () => void;
  onOpenShop: () => void;
  onOpenLibrary: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onOpenAbout: () => void;
  onToggleMute: () => void;
  onToggleFreeMode: () => void;
}

const MISSION_TYPE_META: Record<
  Mission['type'],
  { label: string; colorClass: string }
> = {
  AYAT_SEQUENCER: { label: 'Susun Ayat RTL', colorClass: 'text-emerald-800' },
  TAJWID_DETECTIVE: { label: 'Detektif Tajwid', colorClass: 'text-sky-800' },
  ARCADE_CATCHER: { label: 'Arcade Lentera', colorClass: 'text-orange-700' },
  MEMORY_MATCH: { label: 'Kartu Memori 3D', colorClass: 'text-indigo-800' },
  STORY_CASE: { label: 'Cerita Interaktif', colorClass: 'text-violet-800' },
  BOSS_BATTLE: { label: 'Boss Battle RPG', colorClass: 'text-amber-800' },
};

export const WorldMap: React.FC<WorldMapProps> = ({
  progress,
  onSelectMission,
  onClaimChest,
  onBackToTitle,
  onOpenShop,
  onOpenLibrary,
  onOpenBadges,
  onOpenCertificate,
  onOpenAbout,
  onToggleMute,
  onToggleFreeMode,
}) => {
  const initialSelected: IslandId =
    ISLANDS.find((isl) => isIslandUnlocked(progress, isl.id) && !isIslandCompleted(progress, isl.id))?.id ??
    ISLANDS[0].id;

  const [selectedIslandId, setSelectedIslandId] = useState<IslandId>(initialSelected);
  const [chestToast, setChestToast] = useState<string | null>(null);

  const selectedIsland: Island =
    ISLANDS.find((i) => i.id === selectedIslandId) ?? ISLANDS[0];

  const levelInfo = computeLevelInfo(progress.xp);
  const conqueredCount = countConqueredIslands(progress);
  const totalStars = countTotalStars(progress);
  const maxStars = ALL_MISSIONS.length * 3;
  const selectedUnlocked = isIslandUnlocked(progress, selectedIsland.id);
  const selectedStars = getIslandStars(progress, selectedIsland.id);
  const chestReady = canClaimIslandChest(progress, selectedIsland.id);
  const chestClaimed = progress.claimedChests.includes(selectedIsland.id);

  const handleOpenChest = () => {
    if (!chestReady) return;
    soundFX.playVictory();
    onClaimChest(selectedIsland.id);
    setChestToast(`Peti Harta ${selectedIsland.name} terbuka! +100 Koin Hikmah & +1 Perisai Cahaya!`);
    window.setTimeout(() => setChestToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1EBD9] bg-islamic-lattice text-[#102A26]">
      {/* Rich Emerald-and-Gold Expedition HUD Top Bar */}
      <header className="sticky top-0 z-30 bg-[#0F3D35] text-white border-b-4 border-[#092722] shadow-lg px-4 sm:px-6 py-2.5">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between gap-3">
          {/* Left: Explorer Avatar + XP + Koin Hikmah */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onBackToTitle();
              }}
              title="Kembali ke Layar Pembuka"
              className="shrink-0 rounded-full ring-2 ring-amber-400 hover:scale-105 transition-transform cursor-pointer"
            >
              <AvatarPortrait avatarId={progress.avatarId} size={44} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-extrabold text-white truncate">
                <span className="truncate">{progress.playerName || 'Penjelajah MI'}</span>
                <span className="text-amber-300 whitespace-nowrap tabular-nums">
                  Lv.{levelInfo.level}
                </span>
                <span className="hidden xl:inline text-xs font-semibold text-emerald-200 truncate">
                  · {levelInfo.title}
                </span>
              </div>
              <div className="flex items-center gap-2.5 mt-1">
                <div className="w-20 sm:w-28 h-3 rounded-full bg-[#08241F] border border-emerald-700 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(8, levelInfo.progressPercent)}%` }}
                  />
                </div>
                <span className="text-xs font-extrabold text-emerald-200 tabular-nums whitespace-nowrap">
                  {progress.xp} XP
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 tabular-nums whitespace-nowrap">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  {progress.coins}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold text-amber-200 tabular-nums whitespace-nowrap">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {totalStars}/{maxStars}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Tactile Game HUD Buttons including Toko Bekal */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenShop();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#1A1406] border border-amber-700 shadow-[0_3px_0_#92400E] active:translate-y-[2px] px-3 py-2 text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Toko Bekal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenLibrary();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] active:translate-y-[2px] px-3 py-2 text-xs sm:text-sm font-bold text-amber-50 transition-all cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">Pustaka</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenBadges();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] active:translate-y-[2px] px-3 py-2 text-xs sm:text-sm font-bold text-amber-50 transition-all cursor-pointer whitespace-nowrap tabular-nums"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span className="hidden lg:inline">Lencana</span>
              <span className="text-amber-300">({progress.unlockedBadges.length}/8)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenCertificate();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] active:translate-y-[2px] px-3 py-2 text-xs sm:text-sm font-bold text-amber-50 transition-all cursor-pointer whitespace-nowrap"
            >
              <FileBadge className="w-4 h-4 text-amber-300" />
              <span className="hidden xl:inline">Sertifikat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenAbout();
              }}
              aria-label="Tentang Aplikasi"
              className="inline-flex items-center justify-center rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] p-2 text-amber-50 transition-all cursor-pointer"
            >
              <Info className="w-4 h-4" />
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

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onBackToTitle();
              }}
              aria-label="Kembali ke Beranda"
              className="inline-flex items-center justify-center rounded-xl bg-[#165449] hover:bg-[#1C6A5C] border border-emerald-500/40 shadow-[0_3px_0_#08241F] p-2 text-amber-50 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Treasure Chest Celebration Banner */}
      <AnimatePresence>
        {chestToast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-2xl rounded-2xl bg-amber-400 text-[#1A1406] border-2 border-amber-700 px-5 py-3 shadow-lg font-display font-extrabold text-sm sm:text-base flex items-center gap-2.5"
          >
            <Gift className="w-5 h-5 shrink-0" />
            <span>{chestToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Expedition Layout */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 sm:px-6 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 cols: Full-Bleed Illustrated 4-Island World Map */}
        <section className="lg:col-span-8 flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F3D35] text-amber-300 flex items-center justify-center shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F3D35] leading-tight">
                  Peta {APP_IDENTITY.adventureTitle}
                </h1>
                <p className="text-xs font-semibold text-[#4A635E]">
                  {APP_IDENTITY.appName} · {APP_IDENTITY.school} · {conqueredCount}/4 Pulau Ditaklukkan · 6 Mode Permainan
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onToggleFreeMode();
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold border-2 transition-all cursor-pointer whitespace-nowrap ${
                progress.classroomFreeMode
                  ? 'bg-emerald-700 text-white border-emerald-900 shadow-[0_3px_0_#064E3B]'
                  : 'bg-white text-[#0F3D35] border-[#D4C8AE] shadow-[0_3px_0_#C4B596] hover:border-emerald-600'
              }`}
              title="Buka semua pulau sekaligus untuk presentasi guru di kelas"
            >
              {progress.classroomFreeMode ? (
                <Unlock className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              <span>{progress.classroomFreeMode ? 'Mode Kelas Aktif' : 'Mode Kelas (Buka Semua)'}</span>
            </button>
          </div>

          {/* Illustrated Hand-Painted Adventure World Map Frame */}
          <div className="relative rounded-3xl border-4 border-[#0F3D35] bg-[#1D7F8E] shadow-[0_12px_32px_rgba(15,61,53,0.22)] overflow-hidden">
            <div className="relative aspect-[16/9] w-full select-none">
              <img
                src={WORLD_MAP_ART_URL}
                alt="Peta 4 Pulau Petualangan Al-Qur'an Hadits Kelas 5 MI"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover block"
              />

              {/* Dotted Golden Sea Routes */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M 22 66 Q 31 46 44 34"
                  fill="none"
                  stroke={isIslandUnlocked(progress, 'at-tin') ? '#FDE047' : '#FFFFFF'}
                  strokeOpacity={isIslandUnlocked(progress, 'at-tin') ? '0.9' : '0.45'}
                  strokeWidth="0.7"
                  strokeDasharray="1.8 1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 44 34 Q 61 52 77 70"
                  fill="none"
                  stroke={isIslandUnlocked(progress, 'mim-sukun') ? '#FDE047' : '#FFFFFF'}
                  strokeOpacity={isIslandUnlocked(progress, 'mim-sukun') ? '0.9' : '0.45'}
                  strokeWidth="0.7"
                  strokeDasharray="1.8 1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 77 70 Q 82 51 78 32"
                  fill="none"
                  stroke={isIslandUnlocked(progress, 'hadis-yatim') ? '#FDE047' : '#FFFFFF'}
                  strokeOpacity={isIslandUnlocked(progress, 'hadis-yatim') ? '0.9' : '0.45'}
                  strokeWidth="0.7"
                  strokeDasharray="1.8 1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Floating 3D Island Markers */}
              {ISLANDS.map((island) => {
                const unlocked = isIslandUnlocked(progress, island.id);
                const conquered = isIslandCompleted(progress, island.id);
                const isSelected = selectedIslandId === island.id;
                const islandStars = getIslandStars(progress, island.id);
                const hasChest = canClaimIslandChest(progress, island.id);

                return (
                  <button
                    key={island.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedIslandId(island.id);
                    }}
                    style={{ left: `${island.mapX}%`, top: `${island.mapY}%` }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer focus-visible:outline-none ${
                      isSelected ? 'z-20' : ''
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="explorer-map-avatar"
                        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                        className="mb-1 flex items-center gap-1 rounded-full bg-[#0F3D35] border-2 border-amber-400 p-0.5 pr-2.5 shadow-lg"
                      >
                        <AvatarPortrait avatarId={progress.avatarId} size={28} />
                        <span className="text-[11px] font-extrabold text-amber-300 whitespace-nowrap">
                          Di Sini
                        </span>
                      </motion.div>
                    )}

                    <div
                      className={`relative flex items-center justify-center rounded-full border-[3px] transition-transform duration-150 ${
                        isSelected
                          ? 'w-14 h-14 sm:w-16 sm:h-16 scale-110 bg-white border-amber-400 shadow-[0_6px_0_#92400E,0_10px_22px_rgba(0,0,0,0.38)]'
                          : unlocked
                            ? 'w-12 h-12 sm:w-14 sm:h-14 bg-white border-[#0F3D35] shadow-[0_5px_0_#092722,0_8px_16px_rgba(0,0,0,0.3)] group-hover:scale-110'
                            : 'w-11 h-11 sm:w-13 sm:h-13 bg-slate-200/95 border-slate-500 shadow-[0_4px_0_#475569] opacity-90'
                      }`}
                    >
                      {!unlocked ? (
                        <Lock className="w-5 h-5 text-slate-600" />
                      ) : (
                        <IslandLandmarkIcon islandId={island.id} size={isSelected ? 46 : 38} />
                      )}

                      {conquered && (
                        <span className="absolute -top-2.5 -right-2 w-6 h-6 rounded-full bg-amber-400 border-2 border-[#0F3D35] flex items-center justify-center shadow">
                          <Crown className="w-3.5 h-3.5 text-[#0F3D35] fill-current" />
                        </span>
                      )}

                      {hasChest && (
                        <span className="absolute -top-2.5 -left-2 w-6 h-6 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow animate-bob-pin">
                          <Gift className="w-3.5 h-3.5 text-white" />
                        </span>
                      )}
                    </div>

                    <div
                      className={`mt-1.5 rounded-xl px-2.5 py-1 text-center border-2 shadow-md transition-colors ${
                        isSelected
                          ? 'bg-[#0F3D35] text-white border-amber-400'
                          : 'bg-[#FFFDF8]/95 text-[#0F3D35] border-[#0F3D35]/70 group-hover:bg-[#0F3D35] group-hover:text-white'
                      }`}
                    >
                      <p className="font-display text-[11px] sm:text-xs font-extrabold whitespace-nowrap leading-tight">
                        {island.babLabel} · {island.name}
                      </p>
                      <p
                        className={`text-[10px] font-bold tabular-nums leading-tight mt-0.5 ${
                          isSelected ? 'text-amber-300' : 'text-amber-700 group-hover:text-amber-300'
                        }`}
                      >
                        {unlocked ? `${islandStars}/12 ★` : 'Terkunci'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick-Jump Island Selector Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#0F3D35] border-t-2 border-amber-400/50">
              {ISLANDS.map((isl) => {
                const active = isl.id === selectedIslandId;
                const unlocked = isIslandUnlocked(progress, isl.id);
                const conquered = isIslandCompleted(progress, isl.id);
                return (
                  <button
                    key={isl.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedIslandId(isl.id);
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-3 text-left border-r last:border-r-0 border-emerald-800/70 transition-colors cursor-pointer ${
                      active
                        ? 'bg-amber-400 text-[#102A26]'
                        : 'text-emerald-50 hover:bg-[#17554A]'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-extrabold shrink-0 ${
                        active
                          ? 'bg-[#0F3D35] text-amber-300'
                          : unlocked
                            ? 'bg-emerald-800 text-amber-300'
                            : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {isl.number}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold truncate">{isl.name}</p>
                      <p
                        className={`text-[11px] font-semibold truncate ${
                          active ? 'text-[#0F3D35]/80' : 'text-emerald-200/80'
                        }`}
                      >
                        {conquered ? 'Ditaklukkan ★' : unlocked ? isl.babLabel : 'Terkunci'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right 4 cols: Illuminated Mission Scroll + Island Treasure Chest */}
        <aside className="lg:col-span-4 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIsland.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="game-panel rounded-3xl overflow-hidden"
            >
              {/* Island Header */}
              <div
                className="p-5 text-white relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, #0F3D35 0%, ${selectedIsland.accentHex} 140%)`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-islamic-lattice-light opacity-60" />
                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="rounded-2xl bg-white/95 p-1 shadow-md shrink-0">
                    <IslandLandmarkIcon islandId={selectedIsland.id} size={46} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-amber-300">
                      {selectedIsland.babLabel} · {selectedIsland.topicTitle}
                    </p>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold leading-tight mt-0.5">
                      {selectedIsland.name}
                    </h2>
                  </div>
                </div>
                <p className="relative z-10 text-xs sm:text-sm text-emerald-50/95 mt-3 leading-relaxed">
                  {selectedIsland.description}
                </p>
              </div>

              {/* Interactive Island Treasure Chest Bar */}
              <div className="px-4 sm:px-5 pt-4">
                <div
                  className={`rounded-2xl border-2 p-3.5 flex items-center justify-between gap-3 ${
                    chestReady
                      ? 'bg-gradient-to-r from-amber-100 to-yellow-50 border-amber-500 shadow-sm'
                      : chestClaimed
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-[#F7F3E7] border-[#DDD4BE]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        chestReady
                          ? 'bg-amber-400 text-[#1A1406] animate-bob-pin'
                          : chestClaimed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#E5DEC9] text-[#6B7E79]'
                      }`}
                    >
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-xs sm:text-sm font-extrabold text-[#0F3D35] truncate">
                        Peti Harta Pulau
                      </p>
                      <p className="text-[11px] font-semibold text-[#4A635E] tabular-nums">
                        {chestClaimed
                          ? 'Sudah diklaim (+100 Koin & Perisai)'
                          : chestReady
                            ? 'Siap dibuka! +100 Koin & Perisai'
                            : `Kumpulkan 6 Bintang (${selectedStars}/6 ★)`}
                      </p>
                    </div>
                  </div>
                  {chestReady && (
                    <button
                      type="button"
                      onClick={handleOpenChest}
                      className="game-btn-gold rounded-xl px-3.5 py-2 text-xs font-extrabold cursor-pointer shrink-0"
                    >
                      Buka!
                    </button>
                  )}
                </div>
              </div>

              {/* Missions List */}
              <div className="p-4 sm:p-5">
                {!selectedUnlocked ? (
                  <div className="py-7 text-center space-y-3">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-600 shadow-inner">
                      <Lock className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-lg font-extrabold text-[#0F3D35]">
                      Pulau Belum Terbuka
                    </h3>
                    <p className="text-sm text-[#4A635E] max-w-xs mx-auto leading-relaxed">
                      Kalahkan <strong>Boss Battle</strong> di pulau sebelumnya untuk berlayar ke
                      sini, atau aktifkan <strong>Mode Kelas</strong> di atas peta.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedIsland.missions.map((mission) => {
                      const unlocked = isMissionUnlocked(progress, mission.id);
                      const completion = progress.completedMissions[mission.id];
                      const isBoss = mission.type === 'BOSS_BATTLE';
                      const typeMeta = MISSION_TYPE_META[mission.type];

                      return (
                        <button
                          key={mission.id}
                          type="button"
                          disabled={!unlocked}
                          onClick={() => {
                            soundFX.playClick();
                            onSelectMission(mission);
                          }}
                          className={`w-full text-left rounded-2xl p-3.5 border-2 transition-all flex items-center justify-between gap-3 ${
                            !unlocked
                              ? 'bg-[#F2EFE7] border-[#DDD6C6] opacity-60 cursor-not-allowed'
                              : isBoss
                                ? 'bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-amber-500 shadow-[0_4px_0_#D97706] hover:-translate-y-0.5 active:translate-y-[2px] cursor-pointer'
                                : 'bg-white border-[#D4C8AE] shadow-[0_4px_0_#C4B596] hover:border-emerald-600 hover:-translate-y-0.5 active:translate-y-[2px] cursor-pointer'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 text-[11px] font-extrabold">
                              <span className={typeMeta.colorClass}>
                                Misi {mission.order} · {typeMeta.label}
                              </span>
                              <span className="text-amber-700 tabular-nums">
                                · +{mission.xpReward} XP
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 mt-1">
                              {isBoss && <Swords className="w-4 h-4 text-amber-700 shrink-0" />}
                              <h3 className="font-display text-base font-extrabold text-[#0F3D35] truncate">
                                {mission.title}
                              </h3>
                            </div>

                            {completion ? (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                {[1, 2, 3].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-4 h-4 ${
                                      s <= completion.stars
                                        ? 'fill-amber-400 text-amber-500'
                                        : 'text-slate-300'
                                    }`}
                                  />
                                ))}
                                <span className="text-[11px] font-bold text-emerald-700 ml-1">
                                  Tuntas
                                </span>
                              </div>
                            ) : unlocked ? (
                              <p className="text-[11px] font-bold text-emerald-700 mt-1 inline-flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-500" />
                                Siap dimainkan!
                              </p>
                            ) : null}
                          </div>

                          <div className="shrink-0">
                            {!unlocked ? (
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-200 text-slate-500">
                                <Lock className="w-4 h-4" />
                              </span>
                            ) : completion ? (
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-300">
                                <CheckCircle2 className="w-5 h-5" />
                              </span>
                            ) : (
                              <span
                                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl font-extrabold shadow-sm ${
                                  isBoss
                                    ? 'bg-amber-500 text-[#1A1406]'
                                    : 'bg-emerald-700 text-white'
                                }`}
                              >
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </main>
    </div>
  );
};
