import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Info, Play, BookOpen, Sparkles, Compass } from 'lucide-react';
import { APP_IDENTITY, AVATARS } from '../data/identity';
import { AvatarId, PlayerProgress } from '../types/game';
import { countConqueredIslands, computeLevelInfo } from '../utils/storage';
import { soundFX } from '../utils/sound';
import { AvatarPortrait, TitleEmblemSVG } from './Artwork';

const TITLE_KEYART_URL = '/src/assets/images/title_world_keyart_1795158145015.jpg';

interface TitleScreenProps {
  progress: PlayerProgress;
  onUpdateProfile: (name: string, avatarId: AvatarId) => void;
  onStartGame: () => void;
  onOpenAbout: () => void;
  onOpenLibrary: () => void;
  onToggleMute: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  progress,
  onUpdateProfile,
  onStartGame,
  onOpenAbout,
  onOpenLibrary,
  onToggleMute,
}) => {
  const levelInfo = computeLevelInfo(progress.xp);
  const conquered = countConqueredIslands(progress);
  const hasSavedProgress = progress.hasStartedOnce || progress.xp > 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.playClick();
        onStartGame();
      } else if (e.key.toLowerCase() === 'm') {
        onToggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame, onToggleMute]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0E3A34] text-white flex flex-col justify-between">
      {/* Full-Viewport Illustrated Archipelago Key Art with subtle living camera drift */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={TITLE_KEYART_URL}
          alt="Kerajaan Kepulauan Hikmah Al-Qur'an Hadits"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center animate-slow-pan"
        />
        {/* Measured warm emerald-to-transparent contrast scrim so art shines while text is 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#092B25]/88 via-[#0D3B33]/52 to-[#092B25]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08241F]/90 via-transparent to-[#08241F]/45" />
      </div>

      {/* Clean Floating Top Utility Strip */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-10 pt-5 gap-4">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-amber-100 drop-shadow-sm">
          <Compass className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{APP_IDENTITY.school}</span>
          <span className="opacity-50" aria-hidden="true">·</span>
          <span className="text-emerald-100 hidden sm:inline">{APP_IDENTITY.level}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onOpenLibrary();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/25 bg-[#0A2F29]/75 hover:bg-[#0F473E] px-3.5 py-2 text-xs sm:text-sm font-bold text-amber-50 shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Pustaka</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onOpenAbout();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/25 bg-[#0A2F29]/75 hover:bg-[#0F473E] px-3.5 py-2 text-xs sm:text-sm font-bold text-amber-50 shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Info className="w-4 h-4 text-amber-300" />
            <span>Tentang</span>
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={progress.soundMuted ? 'Aktifkan suara' : 'Matikan suara'}
            className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-[#0A2F29]/75 hover:bg-[#0F473E] p-2.5 text-amber-50 shadow-md transition-all cursor-pointer"
          >
            {progress.soundMuted ? (
              <VolumeX className="w-4 h-4 text-rose-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-300" />
            )}
          </button>
        </div>
      </header>

      {/* Main Adventure Title Stage */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-10 py-6 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* Left Hero Lockup — Dramatic Game Title over Key Art */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full bg-amber-400/25 blur-xl" />
                <TitleEmblemSVG className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] animate-float-slow" />
              </div>
              <div>
                <p className="inline-flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-amber-300 tracking-wide drop-shadow">
                  <Sparkles className="w-4 h-4" />
                  <span>{APP_IDENTITY.adventureTitle}</span>
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.04] drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] mt-0.5">
                  {APP_IDENTITY.appName}
                </h1>
              </div>
            </div>

            <p className="text-base sm:text-lg text-amber-50/95 max-w-xl leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Taklukkan 4 Pulau Hikmah Al-Qur&apos;an Hadits Kelas 5 MI: Surah Al-&apos;Ādiyāt,
              Surah At-Tīn, Detektif Mim Sukun, dan Hadis Menyayangi Anak Yatim lewat misi seru!
            </p>

            {/* Clean unboxed identity credit */}
            <div className="pt-2 border-t border-amber-200/25 max-w-xl text-xs sm:text-sm text-emerald-100/95 space-y-1 drop-shadow">
              <p>
                Karya <strong className="text-amber-200 font-bold">{APP_IDENTITY.creatorName}</strong>
                <span className="mx-2 opacity-60" aria-hidden="true">·</span>
                <span>{APP_IDENTITY.creatorRole}, {APP_IDENTITY.school}</span>
              </p>
              <p className="text-emerald-100/80">
                {APP_IDENTITY.category} ({APP_IDENTITY.year})
              </p>
            </div>

            {hasSavedProgress && (
              <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-[#092B25]/80 border border-amber-300/35 px-4 py-2.5 text-sm text-amber-200 font-bold tabular-nums shadow-lg">
                <span>Level {levelInfo.level}: {levelInfo.title}</span>
                <span className="opacity-40" aria-hidden="true">·</span>
                <span>{progress.xp} XP</span>
                <span className="opacity-40" aria-hidden="true">·</span>
                <span>{conquered}/4 Pulau</span>
              </div>
            )}
          </motion.div>

          {/* Right Explorer Passport Panel — Tactile Sunlit Parchment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="game-panel rounded-3xl p-6 sm:p-7 text-[#102A26]">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs font-extrabold text-amber-700">Paspor Penjelajah</p>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F3D35]">
                    Pilih Karaktermu!
                  </h2>
                </div>
                <AvatarPortrait avatarId={progress.avatarId} size={54} className="shrink-0 drop-shadow-sm" />
              </div>

              {/* Avatar Picker with tactile 3D bounce */}
              <div className="grid grid-cols-4 gap-2.5 mb-5">
                {AVATARS.map((av) => {
                  const selected = progress.avatarId === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onUpdateProfile(progress.playerName, av.id);
                      }}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl p-2 border-2 transition-all cursor-pointer ${
                        selected
                          ? 'bg-amber-50 border-amber-500 shadow-[0_4px_0_#D97706] -translate-y-0.5'
                          : 'bg-white border-[#DFD4BC] shadow-[0_3px_0_#D4C8AE] hover:border-emerald-500'
                      }`}
                    >
                      <AvatarPortrait avatarId={av.id} size={46} />
                      <span className="text-xs font-extrabold text-[#0F3D35] whitespace-nowrap">
                        {av.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Name Input */}
              <div className="mb-6">
                <label
                  htmlFor="player-name-input"
                  className="block text-xs font-extrabold text-[#33524C] mb-1.5"
                >
                  Nama Petualang (Tampil di Sertifikat)
                </label>
                <input
                  id="player-name-input"
                  type="text"
                  maxLength={28}
                  value={progress.playerName}
                  onChange={(e) => onUpdateProfile(e.target.value, progress.avatarId)}
                  placeholder="Ketik namamu di sini..."
                  className="w-full rounded-2xl border-2 border-[#D4C8AE] bg-white px-4 py-3 text-sm font-bold text-[#0F3D35] focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
                />
              </div>

              {/* Chunky Tactile 3D Gold Start CTA */}
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onStartGame();
                }}
                className="game-btn-gold w-full flex items-center justify-center gap-2.5 rounded-2xl font-display font-extrabold text-lg py-4 px-6 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>{hasSavedProgress ? 'Lanjutkan Petualangan' : 'Mulai Petualangan!'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Flat Control Hint Footer */}
      <footer className="relative z-10 px-6 py-3.5 text-center text-xs font-semibold text-amber-100/85 drop-shadow">
        Klik atau sentuh untuk memilih · Enter untuk mulai · M untuk suara · Progres tersimpan otomatis
      </footer>
    </div>
  );
};
