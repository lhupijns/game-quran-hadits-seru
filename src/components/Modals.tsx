import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Coins,
  Download,
  FlaskConical,
  Lightbulb,
  Lock,
  RotateCcw,
  Shield,
  Star,
  X,
} from 'lucide-react';
import {
  ALL_MISSIONS,
  BADGES,
  BASMALAH_ARABIC,
  BASMALAH_MEANING,
  HADIS_YATIM_DATA,
  MIM_SUKUN_RULES,
  SURAH_AL_ADIYAT_VERSES,
  SURAH_AT_TIN_VERSES,
} from '../data/curriculum';
import { APP_IDENTITY, PANCA_CINTA } from '../data/identity';
import { PlayerProgress, PowerUpId } from '../types/game';
import {
  POWERUP_CATALOG,
  computeLevelInfo,
  countConqueredIslands,
  countTotalStars,
} from '../utils/storage';
import { soundFX } from '../utils/sound';
import { AvatarPortrait, TitleEmblemSVG } from './Artwork';

interface ModalShellProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
}

const ModalShell: React.FC<ModalShellProps> = ({
  title,
  subtitle,
  onClose,
  children,
  maxWidthClass = 'max-w-3xl',
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#061A16]/75 backdrop-blur-[2px] p-4 sm:p-6 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <div
      className={`w-full ${maxWidthClass} max-h-[90vh] flex flex-col rounded-3xl bg-[#F5F0E2] border-4 border-[#0F3D35] shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden animate-pop-in`}
    >
      <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 bg-[#0F3D35] text-white border-b-2 border-amber-400/50">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-amber-200/95 mt-0.5 font-semibold">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          aria-label="Tutup jendela"
          className="rounded-xl p-2 bg-white/10 text-amber-200 hover:bg-white/20 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">{children}</div>
    </div>
  </div>
);

/* =========================================================
   1. PUSTAKA KITAB (INTERACTIVE STUDY CODEX)
   ========================================================= */
export const LibraryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<'adiyat' | 'attin' | 'mimsukun' | 'yatim'>('adiyat');

  return (
    <ModalShell
      title="Pustaka Kitab Kelas 5 MI"
      subtitle="Materi Resmi Buku Al-Qur'an Hadits Kelas 5 Semester 1"
      onClose={onClose}
      maxWidthClass="max-w-4xl"
    >
      {/* Interactive Tab Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#E8E4D8] rounded-xl mb-5">
        {[
          { id: 'adiyat', label: "Surah Al-'Ādiyāt" },
          { id: 'attin', label: 'Surah At-Tīn' },
          { id: 'mimsukun', label: 'Mim Sukun' },
          { id: 'yatim', label: 'Hadis Anak Yatim' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              soundFX.playClick();
              setTab(item.id as typeof tab);
            }}
            className={`px-3 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              tab === item.id
                ? 'bg-[#0F3D35] text-white shadow-sm'
                : 'text-[#33524C] hover:text-[#0F3D35]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Al-'Adiyat */}
      {tab === 'adiyat' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-[#E2DDD0] p-4 sm:p-5">
            <h3 className="font-display text-lg font-extrabold text-[#0F3D35]">
              Surah Al-&apos;Ādiyāt (Urutan ke-100 · 11 Ayat · Makkiyah)
            </h3>
            <p className="text-sm text-[#4A635E] mt-1 leading-relaxed">
              Artinya &ldquo;Kuda perang yang berlari kencang&rdquo;. Berisi peringatan agar manusia
              tidak kufur nikmat (لَكَنُودٌ) dan tidak kikir karena cinta berlebihan pada harta
              (<em>hubbud dunya</em>), karena Allah Maha Teliti atas segala amal dan isi hati.
            </p>
            <div className="mt-4 pt-4 border-t border-[#EFECE3] text-center">
              <p className="font-arabic text-3xl font-bold text-[#0F3D35]">{BASMALAH_ARABIC}</p>
              <p className="text-xs text-[#556E68] mt-1">{BASMALAH_MEANING}</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {SURAH_AL_ADIYAT_VERSES.map((v) => (
              <div
                key={v.number}
                className="rounded-xl bg-white border border-[#E2DDD0] p-4 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 text-amber-800 text-xs font-extrabold tabular-nums shrink-0 mt-1">
                    {v.number}
                  </span>
                  <p className="font-arabic text-2xl sm:text-3xl font-bold text-[#0F3D35] text-right flex-1">
                    {v.arabic}
                  </p>
                </div>
                <p className="text-sm text-[#4A635E] pl-11">{v.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: At-Tin */}
      {tab === 'attin' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-[#E2DDD0] p-4 sm:p-5">
            <h3 className="font-display text-lg font-extrabold text-[#0F3D35]">
              Surah At-Tīn (Urutan ke-95 · 8 Ayat · Makkiyah)
            </h3>
            <p className="text-sm text-[#4A635E] mt-1 leading-relaxed">
              Artinya &ldquo;Buah tin&rdquo;. Allah bersumpah dengan 4 hal: buah tin &amp; zaitun
              (Syam), Gunung Sinai (tempat Nabi Musa a.s. menerima Taurat), dan Kota Makkah yang
              aman (Al-Balad Al-Amin). Manusia diciptakan sebaik-baik bentuk dan akan selamat bila
              beriman serta beramal saleh.
            </p>
            <div className="mt-4 pt-4 border-t border-[#EFECE3] text-center">
              <p className="font-arabic text-3xl font-bold text-[#0F3D35]">{BASMALAH_ARABIC}</p>
              <p className="text-xs text-[#556E68] mt-1">{BASMALAH_MEANING}</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {SURAH_AT_TIN_VERSES.map((v) => (
              <div
                key={v.number}
                className="rounded-xl bg-white border border-[#E2DDD0] p-4 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold tabular-nums shrink-0 mt-1">
                    {v.number}
                  </span>
                  <p className="font-arabic text-2xl sm:text-3xl font-bold text-[#0F3D35] text-right flex-1">
                    {v.arabic}
                  </p>
                </div>
                <p className="text-sm text-[#4A635E] pl-11">{v.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Hukum Bacaan Mim Sukun */}
      {tab === 'mimsukun' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-[#E2DDD0] p-4 sm:p-5">
            <h3 className="font-display text-lg font-extrabold text-[#0F3D35]">
              Bab 2: Hukum Bacaan Mim Sukun (مْ)
            </h3>
            <p className="text-sm text-[#4A635E] mt-1 leading-relaxed">
              Apabila huruf Mim berharakat sukun (مْ) bertemu salah satu huruf hijaiyah, maka
              berlaku 3 hukum tajwid berikut:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MIM_SUKUN_RULES.map((rule) => (
              <div
                key={rule.id}
                className="rounded-xl bg-white border border-[#E2DDD0] p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display text-lg font-extrabold text-[#0F3D35]">
                      {rule.name}
                    </h4>
                    <p className="text-xs font-bold text-sky-700">
                      Kunci: Mim Sukun (مْ) + {rule.triggerLetter}
                    </p>
                  </div>
                  <span className="font-arabic text-2xl font-bold text-emerald-800">
                    {rule.arabicName}
                  </span>
                </div>
                <p className="text-sm text-[#33524C] leading-relaxed">{rule.howToRead}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {rule.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#E8E4D8] bg-[#FAF8F2] p-3 text-center"
                    >
                      <p className="font-arabic text-2xl font-bold text-[#0F3D35]">{ex.arabic}</p>
                      <p className="text-[11px] font-semibold text-[#556E68] mt-1">{ex.source}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Hadis Menyayangi Anak Yatim */}
      {tab === 'yatim' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-[#E2DDD0] p-5 space-y-4">
            <div>
              <p className="text-xs font-bold text-violet-700">{HADIS_YATIM_DATA.narrator}</p>
              <h3 className="font-display text-lg font-extrabold text-[#0F3D35] mt-0.5">
                Bab 3: Hadis tentang Menyayangi Anak Yatim
              </h3>
            </div>
            <div className="rounded-xl border border-[#E8E4D8] bg-[#FAF8F2] p-5 text-center space-y-2">
              <p className="font-arabic text-3xl sm:text-4xl font-bold text-[#0F3D35]">
                «{HADIS_YATIM_DATA.matanArabic}»
              </p>
              <p className="font-arabic text-2xl sm:text-3xl font-bold text-[#33524C]">
                {HADIS_YATIM_DATA.continuationArabic}
              </p>
            </div>
            <p className="text-sm text-[#33524C] leading-relaxed">
              <strong>Artinya:</strong> {HADIS_YATIM_DATA.translation}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HADIS_YATIM_DATA.vocab.map((vc, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white border border-[#E2DDD0] px-4 py-3 flex items-center justify-between gap-3"
              >
                <span className="text-sm font-semibold text-[#33524C]">{vc.meaning}</span>
                <span className="font-arabic text-2xl font-bold text-[#0F3D35] shrink-0">
                  {vc.arabic}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white border border-[#E2DDD0] p-5 space-y-2">
            <h4 className="font-display text-base font-extrabold text-[#0F3D35]">
              Isi Kandungan &amp; Penerapan Sehari-hari
            </h4>
            <ul className="space-y-1.5 text-sm text-[#33524C]">
              {HADIS_YATIM_DATA.keyLessons.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

/* =========================================================
   2. KOLEKSI LENCANA & PROGRES SISWA
   ========================================================= */
export const BadgesModal: React.FC<{
  progress: PlayerProgress;
  onResetProgress: () => void;
  onClose: () => void;
}> = ({ progress, onResetProgress, onClose }) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const levelInfo = computeLevelInfo(progress.xp);
  const totalStars = countTotalStars(progress);
  const conquered = countConqueredIslands(progress);

  return (
    <ModalShell
      title="Koleksi Lencana & Progres"
      subtitle={`${progress.playerName || 'Penjelajah MI'} · Level ${levelInfo.level}: ${levelInfo.title}`}
      onClose={onClose}
    >
      {/* Top Progress Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 tabular-nums">
        <div className="rounded-xl bg-white border border-[#E2DDD0] p-4">
          <p className="text-xs font-semibold text-[#556E68]">Total XP</p>
          <p className="font-display text-2xl font-extrabold text-amber-600 mt-0.5">
            {progress.xp}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-[#E2DDD0] p-4">
          <p className="text-xs font-semibold text-[#556E68]">Total Bintang</p>
          <p className="font-display text-2xl font-extrabold text-[#0F3D35] mt-0.5">
            {totalStars}/{ALL_MISSIONS.length * 3}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-[#E2DDD0] p-4">
          <p className="text-xs font-semibold text-[#556E68]">Pulau Selesai</p>
          <p className="font-display text-2xl font-extrabold text-emerald-700 mt-0.5">
            {conquered}/4
          </p>
        </div>
        <div className="rounded-xl bg-white border border-[#E2DDD0] p-4">
          <p className="text-xs font-semibold text-[#556E68]">Kombo Terbaik</p>
          <p className="font-display text-2xl font-extrabold text-sky-700 mt-0.5">
            x{progress.bestComboOverall}
          </p>
        </div>
      </div>

      {/* 8 Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {BADGES.map((badge) => {
          const unlocked = progress.unlockedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`rounded-xl border p-4 flex items-start gap-3.5 ${
                unlocked
                  ? 'bg-white border-amber-300'
                  : 'bg-[#FAF8F2] border-[#E2DDD0] opacity-65'
              }`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: unlocked ? `${badge.accentHex}1A` : '#E2E8F0',
                  color: unlocked ? badge.accentHex : '#64748B',
                }}
              >
                {unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <p className="font-display text-base font-extrabold text-[#0F3D35]">
                  {badge.title}
                </p>
                <p className="text-xs text-[#4A635E] mt-0.5 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safe Inline Reset Progress Confirmation */}
      <div className="pt-4 border-t border-[#E2DDD0] flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#556E68]">
          Progres tersimpan otomatis di perangkat ini.
        </p>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setConfirmReset(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progres</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-700">Yakin hapus semua progres?</span>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onResetProgress();
                setConfirmReset(false);
              }}
              className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-bold cursor-pointer"
            >
              Ya, Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-lg border border-[#D4CEC0] bg-white px-3 py-1.5 text-xs font-bold text-[#33524C] cursor-pointer"
            >
              Batal
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
};

/* =========================================================
   3. TENTANG APLIKASI (PATUH 100% IDENTITAS-Aplikasi.txt)
   ========================================================= */
export const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalShell
    title={`Tentang ${APP_IDENTITY.appName}`}
    subtitle={`${APP_IDENTITY.school} · ${APP_IDENTITY.category}`}
    onClose={onClose}
  >
    <div className="space-y-5">
      <div className="rounded-2xl bg-[#0F3D35] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
        <TitleEmblemSVG className="w-20 h-20 shrink-0" />
        <div className="space-y-1.5 text-center sm:text-left">
          <p className="text-xs font-bold text-amber-300">{APP_IDENTITY.adventureTitle}</p>
          <h3 className="font-display text-2xl font-extrabold">{APP_IDENTITY.appName}</h3>
          <p className="text-sm text-emerald-100/90 leading-relaxed">{APP_IDENTITY.aboutText}</p>
        </div>
      </div>

      {/* Structured Identity Grid (Strict compliance, zero private data) */}
      <div className="rounded-xl bg-white border border-[#E2DDD0] p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-semibold text-[#556E68]">Nama Pembuat</p>
          <p className="font-bold text-[#0F3D35] mt-0.5">{APP_IDENTITY.creatorName}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#556E68]">Jabatan</p>
          <p className="font-bold text-[#0F3D35] mt-0.5">{APP_IDENTITY.creatorRole}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#556E68]">Madrasah / Instansi</p>
          <p className="font-bold text-[#0F3D35] mt-0.5">
            {APP_IDENTITY.school} ({APP_IDENTITY.regency})
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#556E68]">Mata Pelajaran &amp; Jenjang</p>
          <p className="font-bold text-[#0F3D35] mt-0.5">
            {APP_IDENTITY.subject} · {APP_IDENTITY.level}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#556E68]">Jenis Aplikasi</p>
          <p className="font-bold text-[#0F3D35] mt-0.5">{APP_IDENTITY.appType}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#556E68]">Kategori &amp; Tahun</p>
          <p className="font-bold text-[#0F3D35] mt-0.5">
            {APP_IDENTITY.category} ({APP_IDENTITY.year})
          </p>
        </div>
      </div>

      {/* Panca Cinta (KBC) */}
      <div className="rounded-xl bg-white border border-[#E2DDD0] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <h4 className="font-display text-base font-extrabold text-[#0F3D35]">
            5 Nilai Panca Cinta (Kurikulum Berbasis Cinta)
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {PANCA_CINTA.map((p) => (
            <div key={p.number} className="rounded-xl bg-[#FAF8F2] border border-[#E8E4D8] p-3">
              <p className="font-bold text-[#0F3D35]">
                {p.number}. {p.title}
              </p>
              <p className="text-xs text-[#4A635E] mt-0.5">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </ModalShell>
);

/* =========================================================
   4. SERTIFIKAT KELULUSAN (WITH REAL PNG CANVAS DOWNLOAD)
   ========================================================= */
export const CertificateModal: React.FC<{
  progress: PlayerProgress;
  onClose: () => void;
}> = ({ progress, onClose }) => {
  const levelInfo = computeLevelInfo(progress.xp);
  const conquered = countConqueredIslands(progress);
  const totalStars = countTotalStars(progress);
  const isGraduated = conquered === 4;
  const studentName = progress.playerName.trim() || 'Penjelajah MI';

  const handleDownloadPNG = () => {
    soundFX.playVictory();
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 980;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Parchment
    ctx.fillStyle = '#FAF8F1';
    ctx.fillRect(0, 0, 1400, 980);

    // Outer Emerald & Gold Double Frame
    ctx.strokeStyle = '#0F3D35';
    ctx.lineWidth = 18;
    ctx.strokeRect(36, 36, 1328, 908);

    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 4;
    ctx.strokeRect(62, 62, 1276, 856);

    // Header Banner
    ctx.fillStyle = '#0F3D35';
    ctx.fillRect(88, 92, 1224, 138);

    ctx.fillStyle = '#FDE68A';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${APP_IDENTITY.school.toUpperCase()}  ·  ${APP_IDENTITY.category.toUpperCase()}`,
      700,
      142
    );

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 46px sans-serif';
    ctx.fillText('SERTIFIKAT KELULUSAN PENJAGA HIKMAH', 700, 202);

    // Subheader
    ctx.fillStyle = '#4A635E';
    ctx.font = '600 24px sans-serif';
    ctx.fillText('Diberikan dengan bangga kepada:', 700, 298);

    // Student Name
    ctx.fillStyle = '#0F3D35';
    ctx.font = 'bold 62px serif';
    ctx.fillText(studentName, 700, 382);

    // Gold underline
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400, 405);
    ctx.lineTo(1000, 405);
    ctx.stroke();

    // Achievement Prose
    ctx.fillStyle = '#33524C';
    ctx.font = '500 24px sans-serif';
    ctx.fillText(
      `Telah berpartisipasi aktif dalam ${APP_IDENTITY.appName} (${APP_IDENTITY.adventureTitle})`,
      700,
      462
    );
    ctx.fillText(
      'Materi Al-Qur\'an Hadits Kelas 5 MI Semester 1: Surah Al-\'Ādiyāt, Surah At-Tīn,',
      700,
      502
    );
    ctx.fillText(
      'Hukum Bacaan Mim Sukun, dan Hadis tentang Menyayangi Anak Yatim.',
      700,
      540
    );

    // Stats Box
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#D4CEC0';
    ctx.lineWidth = 2;
    ctx.fillRect(190, 588, 1020, 118);
    ctx.strokeRect(190, 588, 1020, 118);

    const stats = [
      { label: 'LEVEL & GELAR', value: `Lv. ${levelInfo.level} · ${levelInfo.title}` },
      { label: 'TOTAL XP', value: `${progress.xp} XP` },
      { label: 'BINTANG MISI', value: `${totalStars} / ${ALL_MISSIONS.length * 3}` },
      { label: 'PULAU DITAKLUKKAN', value: `${conquered} / 4 Pulau` },
    ];
    stats.forEach((st, idx) => {
      const cx = 190 + idx * 255 + 127;
      ctx.fillStyle = '#556E68';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(st.label, cx, 632);
      ctx.fillStyle = '#0F3D35';
      ctx.font = 'bold 23px sans-serif';
      ctx.fillText(st.value, cx, 672);
    });

    // Footer Signature Area
    ctx.textAlign = 'left';
    ctx.fillStyle = '#556E68';
    ctx.font = '600 18px sans-serif';
    ctx.fillText(`${APP_IDENTITY.regency}, Tahun ${APP_IDENTITY.year}`, 130, 796);
    ctx.fillStyle = '#0F3D35';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(APP_IDENTITY.creatorName, 130, 840);
    ctx.fillStyle = '#4A635E';
    ctx.font = '500 18px sans-serif';
    ctx.fillText(`${APP_IDENTITY.creatorRole} · ${APP_IDENTITY.school}`, 130, 870);

    // Status Stamp Right
    ctx.textAlign = 'right';
    ctx.fillStyle = isGraduated ? '#059669' : '#D97706';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(
      isGraduated ? 'STATUS: LULUS SEMPURNA (4/4 PULAU)' : `PROGRES EKSPEDISI (${conquered}/4 PULAU)`,
      1270,
      840
    );
    ctx.fillStyle = '#556E68';
    ctx.font = '500 17px sans-serif';
    ctx.fillText(`Lencana Terkumpul: ${progress.unlockedBadges.length} / 8`, 1270, 870);

    const link = document.createElement('a');
    link.download = `Sertifikat-${studentName.replace(/\s+/g, '-')}-QuranHaditsMI.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <ModalShell
      title="Sertifikat Penjaga Hikmah"
      subtitle="Pratinjau & Unduh Sertifikat Kelulusan Siswa"
      onClose={onClose}
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-5">
        {!isGraduated && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs sm:text-sm text-amber-950">
            Kamu sudah menaklukkan <strong>{conquered}/4 pulau</strong>. Taklukkan seluruh 4 pulau
            untuk meraih status <strong>Lulus Sempurna</strong>! Kamu tetap bisa melihat dan
            mengunduh sertifikat progresmu kapan saja.
          </div>
        )}

        {/* Ceremonial Certificate Preview */}
        <div className="rounded-2xl border-4 border-[#0F3D35] bg-[#FAF8F1] p-2 shadow-inner">
          <div className="rounded-xl border-2 border-amber-500 p-5 sm:p-8 text-center space-y-5">
            <div className="flex flex-col items-center gap-2">
              <TitleEmblemSVG className="w-14 h-14" />
              <p className="text-[11px] sm:text-xs font-bold text-amber-700 tracking-wide">
                {APP_IDENTITY.school} · {APP_IDENTITY.category}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F3D35]">
                Sertifikat Kelulusan Penjaga Hikmah
              </h3>
            </div>

            <div className="flex flex-col items-center gap-2 py-2">
              <AvatarPortrait avatarId={progress.avatarId} size={64} />
              <p className="text-xs text-[#556E68]">Diberikan dengan bangga kepada:</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F3D35] border-b-2 border-amber-400 pb-1 px-6">
                {studentName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#33524C] max-w-xl mx-auto leading-relaxed">
              Atas keberhasilan menyelesaikan petualangan belajar{' '}
              <strong>{APP_IDENTITY.appName}</strong> — materi {APP_IDENTITY.subject} Kelas 5 MI
              Semester 1 (Surah Al-&apos;Ādiyāt, Surah At-Tīn, Hukum Bacaan Mim Sukun, dan Hadis
              Menyayangi Anak Yatim).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl bg-white border border-[#E2DDD0] p-3.5 text-center tabular-nums">
              <div>
                <p className="text-[11px] font-semibold text-[#556E68]">Level</p>
                <p className="text-sm font-extrabold text-[#0F3D35]">Lv. {levelInfo.level}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#556E68]">Total XP</p>
                <p className="text-sm font-extrabold text-amber-600">{progress.xp} XP</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#556E68]">Bintang</p>
                <p className="text-sm font-extrabold text-[#0F3D35] inline-flex items-center gap-1 justify-center">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {totalStars}/{ALL_MISSIONS.length * 3}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#556E68]">Pulau</p>
                <p className="text-sm font-extrabold text-emerald-700">{conquered}/4</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2DDD0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#4A635E]">
              <div className="text-center sm:text-left">
                <p className="font-bold text-[#0F3D35]">{APP_IDENTITY.creatorName}</p>
                <p>
                  {APP_IDENTITY.creatorRole} · {APP_IDENTITY.school}
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="font-bold text-emerald-700">
                  {isGraduated ? 'Lulus Sempurna' : `Progres ${conquered}/4 Pulau`}
                </p>
                <p>
                  {APP_IDENTITY.regency}, {APP_IDENTITY.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleDownloadPNG}
            className="game-btn-emerald inline-flex items-center gap-2 rounded-2xl font-display font-extrabold px-6 py-3.5 text-sm sm:text-base cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Sertifikat (PNG)</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

/* =========================================================
   5. TOKO BEKAL PENJELAJAH (POWER-UP SHOP)
   ========================================================= */
export const ShopModal: React.FC<{
  progress: PlayerProgress;
  onBuyPowerUp: (id: PowerUpId) => void;
  onClose: () => void;
}> = ({ progress, onBuyPowerUp, onClose }) => {
  const iconFor = (id: PowerUpId) => {
    if (id === 'shield') return <Shield className="w-7 h-7 text-sky-700" />;
    if (id === 'insight') return <Lightbulb className="w-7 h-7 text-amber-600" />;
    return <FlaskConical className="w-7 h-7 text-emerald-700" />;
  };

  return (
    <ModalShell
      title="Toko Bekal Penjelajah"
      subtitle="Tukarkan Koin Hikmah dengan Power-Up untuk membantu misimu!"
      onClose={onClose}
      maxWidthClass="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Coin Balance Banner */}
        <div className="rounded-2xl bg-[#0F3D35] text-white p-4 sm:p-5 flex items-center justify-between gap-4 border-2 border-amber-400/50">
          <div>
            <p className="text-xs font-bold text-emerald-200">Saldo Koin Hikmah Kamu</p>
            <p className="font-display text-3xl font-extrabold text-amber-300 inline-flex items-center gap-2 mt-0.5 tabular-nums">
              <Coins className="w-7 h-7 text-amber-400" />
              {progress.coins} Koin
            </p>
          </div>
          <p className="text-xs text-emerald-100/90 max-w-[220px] text-right">
            Raih koin dari menyelesaikan misi, kombo tinggi, dan membuka Peti Harta Pulau!
          </p>
        </div>

        {/* 3 Power-Up Cards */}
        <div className="space-y-3.5">
          {POWERUP_CATALOG.map((item) => {
            const owned = progress.inventory[item.id];
            const canAfford = progress.coins >= item.cost;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border-2 border-[#D4C8AE] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7F3E7] border-2 border-[#DFD4BC] flex items-center justify-center shrink-0">
                    {iconFor(item.id)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-extrabold text-[#0F3D35]">
                        {item.name}
                      </h3>
                      <span className="text-xs font-extrabold text-emerald-700 tabular-nums">
                        · Dimiliki: {owned}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A635E] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!canAfford}
                  onClick={() => onBuyPowerUp(item.id)}
                  className={`rounded-2xl px-5 py-3 font-display font-extrabold text-sm inline-flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
                    canAfford
                      ? 'game-btn-gold cursor-pointer'
                      : 'bg-slate-200 text-slate-500 border-2 border-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  <span className="tabular-nums">Beli {item.cost}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
};

