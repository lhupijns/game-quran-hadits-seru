import React from 'react';
import { AvatarId, IslandId } from '../types/game';

export const AvatarPortrait: React.FC<{
  avatarId: AvatarId;
  size?: number;
  className?: string;
}> = ({ avatarId, size = 56, className = '' }) => {
  switch (avatarId) {
    case 'raka':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-label="Avatar Raka"
        >
          <circle cx="40" cy="40" r="38" fill="#E6F7F1" stroke="#059669" strokeWidth="2.5" />
          {/* Body / Baju Koko Emerald */}
          <path d="M16 72C18 57 27 52 40 52C53 52 62 57 64 72" fill="#047857" />
          <path d="M35 52L40 62L45 52" fill="#FEF3C7" />
          <path d="M40 54V66" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* Neck & Face */}
          <rect x="35" y="45" width="10" height="9" rx="4" fill="#F3C5A2" />
          <circle cx="40" cy="36" r="15" fill="#F7CFAF" />
          {/* Peci Hitam Nusantara */}
          <path d="M25 29C25 20 31 16 40 16C49 16 55 20 55 29H25Z" fill="#0F2D27" />
          <path d="M25 27H55" stroke="#F59E0B" strokeWidth="2" />
          {/* Eyes & Smile */}
          <circle cx="34.5" cy="36" r="2" fill="#102A26" />
          <circle cx="45.5" cy="36" r="2" fill="#102A26" />
          <path d="M35 42C37 44.5 43 44.5 45 42" stroke="#8C4A2F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="39.5" r="2.2" fill="#F4A28C" fillOpacity="0.55" />
          <circle cx="50" cy="39.5" r="2.2" fill="#F4A28C" fillOpacity="0.55" />
        </svg>
      );
    case 'aisyah':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-label="Avatar Aisyah"
        >
          <circle cx="40" cy="40" r="38" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          {/* Hijab Amber/Teal */}
          <path d="M18 71C19 52 24 22 40 20C56 22 61 52 62 71" fill="#0F5F53" />
          <path d="M22 72C24 58 31 53 40 53C49 53 56 58 58 72" fill="#147D6E" />
          {/* Face opening */}
          <ellipse cx="40" cy="37" rx="13.5" ry="14" fill="#F9D5B8" />
          {/* Hijab inner frame & gold pin */}
          <path d="M26.5 34C28 24 34 22 40 22C46 22 52 24 53.5 34" stroke="#F59E0B" strokeWidth="2.2" />
          <circle cx="40" cy="52.5" r="2.6" fill="#F59E0B" />
          {/* Eyes & Smile */}
          <circle cx="35" cy="36.5" r="2" fill="#102A26" />
          <circle cx="45" cy="36.5" r="2" fill="#102A26" />
          <path d="M35.5 42.5C37.5 45 42.5 45 44.5 42.5" stroke="#8C4A2F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="31" cy="40" r="2.2" fill="#F4A28C" fillOpacity="0.6" />
          <circle cx="49" cy="40" r="2.2" fill="#F4A28C" fillOpacity="0.6" />
        </svg>
      );
    case 'zaki':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-label="Avatar Zaki"
        >
          <circle cx="40" cy="40" r="38" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          {/* Vest Detektif */}
          <path d="M16 72C19 57 27 52 40 52C53 52 61 57 64 72" fill="#0369A1" />
          <path d="M32 52L40 65L48 52" fill="#F8FAFC" />
          {/* Neck & Face */}
          <rect x="35" y="45" width="10" height="9" rx="4" fill="#EDC19E" />
          <circle cx="40" cy="36" r="14.5" fill="#F3C9A8" />
          {/* Kopiah Putih */}
          <path d="M26 27C27 19 33 16 40 16C47 16 53 19 54 27H26Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
          {/* Glasses */}
          <circle cx="34" cy="36" r="4.6" fill="#FFFFFF" fillOpacity="0.35" stroke="#0F2D27" strokeWidth="1.8" />
          <circle cx="46" cy="36" r="4.6" fill="#FFFFFF" fillOpacity="0.35" stroke="#0F2D27" strokeWidth="1.8" />
          <line x1="38.6" y1="36" x2="41.4" y2="36" stroke="#0F2D27" strokeWidth="1.8" />
          <circle cx="34" cy="36" r="1.7" fill="#102A26" />
          <circle cx="46" cy="36" r="1.7" fill="#102A26" />
          <path d="M36 43C38 45 42 45 44 43" stroke="#8C4A2F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'hana':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-label="Avatar Hana"
        >
          <circle cx="40" cy="40" r="38" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2.5" />
          {/* Hijab Lavender */}
          <path d="M18 71C20 51 24 21 40 19C56 21 60 51 62 71" fill="#6D28D9" />
          <path d="M23 72C26 57 32 53 40 53C48 53 54 57 57 72" fill="#8B5CF6" />
          <ellipse cx="40" cy="37" rx="13.5" ry="14" fill="#FBE0C8" />
          <path d="M27 33C29 24 34 22 40 22C46 22 51 24 53 33" stroke="#DDD6FE" strokeWidth="2.2" />
          {/* Star Brooch */}
          <path d="M40 50L41.5 53L44.5 53.5L42.2 55.6L42.8 58.6L40 57.1L37.2 58.6L37.8 55.6L35.5 53.5L38.5 53L40 50Z" fill="#FBBF24" />
          {/* Eyes & Smile */}
          <circle cx="35" cy="36.5" r="2" fill="#102A26" />
          <circle cx="45" cy="36.5" r="2" fill="#102A26" />
          <path d="M35.5 42.5C37.5 45 42.5 45 44.5 42.5" stroke="#8C4A2F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="31" cy="40" r="2.2" fill="#F4A28C" fillOpacity="0.55" />
          <circle cx="49" cy="40" r="2.2" fill="#F4A28C" fillOpacity="0.55" />
        </svg>
      );
  }
};

export const TitleEmblemSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 112 112"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Rub el Hizb 8-pointed Islamic Star */}
    <rect
      x="20"
      y="20"
      width="72"
      height="72"
      rx="10"
      fill="#0F3D35"
      stroke="#F59E0B"
      strokeWidth="3"
    />
    <rect
      x="20"
      y="20"
      width="72"
      height="72"
      rx="10"
      transform="rotate(45 56 56)"
      fill="#134E44"
      stroke="#F59E0B"
      strokeWidth="3"
    />
    <circle cx="56" cy="56" r="30" fill="#0B2E28" stroke="#FDE68A" strokeWidth="2" />
    {/* Open Kitab / Rehal inside */}
    <path
      d="M36 52C42 49 49 50 56 54C63 50 70 49 76 52V68C70 65 63 66 56 70C49 66 42 65 36 68V52Z"
      fill="#FEF3C7"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <line x1="56" y1="54" x2="56" y2="70" stroke="#D97706" strokeWidth="2" />
    {/* Crescent & Star rising above kitab */}
    <path
      d="M60 34C55 34 51.5 37.5 51.5 42C51.5 46.5 55 50 60 50C56.8 49 55 46 55 42C55 38 56.8 35 60 34Z"
      fill="#FBBF24"
    />
    <circle cx="62" cy="40" r="2.2" fill="#FDE68A" />
  </svg>
);

export const IslandLandmarkIcon: React.FC<{ islandId: IslandId; size?: number }> = ({
  islandId,
  size = 44,
}) => {
  switch (islandId) {
    case 'al-adiyat':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          {/* Sunburst + swift trail lines representing Al-'Adiyat */}
          <path d="M12 31C16 24 22 20 30 18L36 16L33 23C31 28 26 32 19 33L12 31Z" fill="#D97706" />
          <path d="M14 22H22M11 26H18" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="30" cy="21" r="2" fill="#FEF3C7" />
        </svg>
      );
    case 'at-tin':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
          {/* Mount Sinai & Olive Branch */}
          <path d="M9 34L21 16L29 27L33 22L40 34H9Z" fill="#047857" />
          <path d="M21 16L25 22L21 21L17 23L21 16Z" fill="#A7F3D0" />
          <circle cx="33" cy="14" r="4" fill="#F59E0B" />
        </svg>
      );
    case 'mim-sukun':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          {/* Detective Magnifier + Mim Sukun symbol */}
          <circle cx="22" cy="21" r="9.5" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
          <line x1="29" y1="28" x2="36" y2="35" stroke="#0369A1" strokeWidth="3.2" strokeLinecap="round" />
          <text
            x="22"
            y="25"
            textAnchor="middle"
            fill="#0369A1"
            fontSize="14"
            fontWeight="700"
            fontFamily="Scheherazade New, serif"
          >
            مْ
          </text>
        </svg>
      );
    case 'hadis-yatim':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2" />
          {/* Heart & Twin Pillars of Compassion */}
          <path
            d="M24 35C24 35 12 27.5 12 19.5C12 15.5 15.2 13 18.5 13C21 13 23 14.5 24 16.5C25 14.5 27 13 29.5 13C32.8 13 36 15.5 36 19.5C36 27.5 24 35 24 35Z"
            fill="#7C3AED"
          />
          <circle cx="24" cy="22" r="3" fill="#FDE68A" />
        </svg>
      );
  }
};

export const BossVisual: React.FC<{
  bossVisualId: 'kufur-nikmat' | 'kelalaian' | 'salah-baca' | 'kurang-empati';
  isHit: boolean;
}> = ({ bossVisualId, isHit }) => {
  const paletteMap = {
    'kufur-nikmat': { ring: '#D97706', body: '#78350F', glow: '#FDE68A', accent: '#F59E0B' },
    kelalaian: { ring: '#059669', body: '#064E3B', glow: '#A7F3D0', accent: '#10B981' },
    'salah-baca': { ring: '#0284C7', body: '#0C4A6E', glow: '#BAE6FD', accent: '#38BDF8' },
    'kurang-empati': { ring: '#7C3AED', body: '#4C1D95', glow: '#DDD6FE', accent: '#A78BFA' },
  };
  const p = paletteMap[bossVisualId];

  return (
    <div className={`relative inline-flex items-center justify-center ${isHit ? 'animate-shake-hit' : 'animate-float-slow'}`}>
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" aria-hidden="true">
        {/* Guardian Geometric Crest */}
        <circle cx="64" cy="64" r="56" fill={p.glow} fillOpacity="0.28" stroke={p.ring} strokeWidth="2.5" strokeDasharray="6 4" />
        <path
          d="M64 16L96 34V74C96 93 82 106 64 114C46 106 32 93 32 74V34L64 16Z"
          fill={p.body}
          stroke={p.accent}
          strokeWidth="3"
        />
        {/* Crown / Arch */}
        <path d="M44 46L52 34L64 42L76 34L84 46H44Z" fill={p.accent} />
        {/* Expressive Guardian Visor */}
        <rect x="44" y="54" width="40" height="16" rx="8" fill="#0B1F1C" />
        <circle cx="55" cy="62" r="4" fill={isHit ? '#FCA5A5' : '#FDE68A'} />
        <circle cx="73" cy="62" r="4" fill={isHit ? '#FCA5A5' : '#FDE68A'} />
        {/* Shield emblem */}
        <path d="M54 84L64 94L74 84L64 76L54 84Z" fill={p.glow} />
      </svg>
    </div>
  );
};

export const StorySceneIllustration: React.FC<{
  scene: 'fauzi-school' | 'neighbor-help' | 'sinai-scroll' | 'orphan-friend';
}> = ({ scene }) => {
  if (scene === 'fauzi-school') {
    return (
      <svg viewBox="0 0 640 168" className="w-full h-36 sm:h-40 rounded-xl border border-[#E2DDD0]" fill="none" aria-hidden="true">
        <rect width="640" height="168" fill="#E6F4F1" />
        {/* Sun */}
        <circle cx="560" cy="40" r="22" fill="#FBBF24" />
        {/* Madrasah Building */}
        <rect x="180" y="54" width="280" height="84" rx="6" fill="#FFFFFF" stroke="#0F3D35" strokeWidth="2" />
        <path d="M270 54C270 30 370 30 370 54H270Z" fill="#059669" />
        <path d="M320 20V34" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        <rect x="296" y="92" width="48" height="46" rx="22" fill="#0F3D35" />
        <rect x="206" y="76" width="32" height="28" rx="4" fill="#BAE6FD" stroke="#0F3D35" strokeWidth="1.5" />
        <rect x="402" y="76" width="32" height="28" rx="4" fill="#BAE6FD" stroke="#0F3D35" strokeWidth="1.5" />
        {/* Trees & Courtyard */}
        <rect y="136" width="640" height="32" fill="#A7F3D0" />
        <circle cx="110" cy="108" r="24" fill="#10B981" />
        <rect x="106" y="124" width="8" height="20" fill="#78350F" />
        <circle cx="530" cy="110" r="22" fill="#059669" />
        <rect x="526" y="124" width="8" height="20" fill="#78350F" />
        {/* Label */}
        <text x="320" y="72" textAnchor="middle" fill="#0F3D35" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          HALAMAN MADRASAH · KERJA BAKTI
        </text>
      </svg>
    );
  }

  if (scene === 'neighbor-help') {
    return (
      <svg viewBox="0 0 640 168" className="w-full h-36 sm:h-40 rounded-xl border border-[#E2DDD0]" fill="none" aria-hidden="true">
        <rect width="640" height="168" fill="#FEF9EC" />
        <circle cx="96" cy="42" r="22" fill="#F59E0B" />
        {/* Village Houses */}
        <path d="M160 132V76L215 44L270 76V132H160Z" fill="#FFFFFF" stroke="#B45309" strokeWidth="2" />
        <path d="M150 78L215 38L280 78" stroke="#D97706" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="200" y="96" width="30" height="36" rx="4" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
        <path d="M370 132V82L420 54L470 82V132H370Z" fill="#FFFFFF" stroke="#047857" strokeWidth="2" />
        <path d="M360 84L420 48L480 84" stroke="#059669" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="406" y="98" width="28" height="34" rx="4" fill="#A7F3D0" stroke="#047857" strokeWidth="1.5" />
        {/* Heart bridge */}
        <path d="M292 84C308 72 332 72 348 84" stroke="#059669" strokeWidth="2.5" strokeDasharray="4 4" />
        <circle cx="320" cy="75" r="13" fill="#059669" />
        <path d="M320 81C320 81 313 76.5 313 72.5C313 70.5 314.8 69 316.8 69C318.2 69 319.4 69.8 320 71C320.6 69.8 321.8 69 323.2 69C325.2 69 327 70.5 327 72.5C327 76.5 320 81 320 81Z" fill="#FEF3C7" />
        <rect y="132" width="640" height="36" fill="#D1FAE5" />
      </svg>
    );
  }

  if (scene === 'sinai-scroll') {
    return (
      <svg viewBox="0 0 640 168" className="w-full h-36 sm:h-40 rounded-xl border border-[#E2DDD0]" fill="none" aria-hidden="true">
        <rect width="640" height="168" fill="#E0F2FE" />
        {/* Mountains & Musala Arch */}
        <path d="M40 144L170 46L280 144H40Z" fill="#7DD3FC" />
        <path d="M210 144L340 34L480 144H210Z" fill="#0284C7" fillOpacity="0.35" />
        {/* Open Scroll / Kitab Centerpiece */}
        <rect x="220" y="42" width="200" height="88" rx="12" fill="#FFFFFF" stroke="#0F3D35" strokeWidth="2.5" />
        <line x1="320" y1="48" x2="320" y2="124" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="242" y1="68" x2="302" y2="68" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <line x1="242" y1="84" x2="294" y2="84" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <line x1="242" y1="100" x2="298" y2="100" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <line x1="338" y1="68" x2="398" y2="68" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        <line x1="338" y1="84" x2="390" y2="84" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <line x1="338" y1="100" x2="394" y2="100" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <rect y="140" width="640" height="28" fill="#BAE6FD" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 640 168" className="w-full h-36 sm:h-40 rounded-xl border border-[#E2DDD0]" fill="none" aria-hidden="true">
      <rect width="640" height="168" fill="#F5F3FF" />
      {/* Sunlit Garden of Compassion */}
      <circle cx="530" cy="40" r="20" fill="#FBBF24" />
      <rect y="132" width="640" height="36" fill="#DDD6FE" />
      {/* Bench & Friendship Emblem */}
      <rect x="210" y="96" width="220" height="14" rx="4" fill="#7C3AED" />
      <rect x="226" y="110" width="12" height="24" fill="#4C1D95" />
      <rect x="402" y="110" width="12" height="24" fill="#4C1D95" />
      <circle cx="282" cy="70" r="18" fill="#059669" />
      <circle cx="358" cy="70" r="18" fill="#D97706" />
      <path d="M306 70H334" stroke="#7C3AED" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="320" cy="44" r="14" fill="#7C3AED" />
      <path d="M320 50C320 50 313 45.5 313 41.5C313 39.5 314.8 38 316.8 38C318.2 38 319.4 38.8 320 40C320.6 38.8 321.8 38 323.2 38C325.2 38 327 39.5 327 41.5C327 45.5 320 50 320 50Z" fill="#FDE68A" />
    </svg>
  );
};
