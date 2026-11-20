import { AvatarProfile } from '../types/game';

/**
 * Seluruh data diambil secara patuh dari IDENTITAS-Aplikasi.txt.
 * CATATAN PRIVASI: ID Pendaftar PPG, email pribadi, dan nomor HP
 * TIDAK pernah dimasukkan ke aplikasi publik ini.
 */
export const APP_IDENTITY = {
  appName: "Game Qur'an Hadits Seru",
  adventureTitle: 'Ekspedisi Penjaga Hikmah',
  appType: 'Game pembelajaran gamifikasi visual untuk anak MI',
  creatorName: 'Aditya Rozak Putera Ramadan, S.Ag',
  creatorRole: 'Guru Al-Qur\'an Hadits',
  school: 'MIN 3 Nganjuk',
  regency: 'Kabupaten Nganjuk',
  subject: 'Al-Qur\'an Hadits',
  level: 'Madrasah Ibtidaiyah (MI) — Kelas 5 Semester 1',
  year: '2026',
  category: 'Guru Inovatif Tingkat MI — Kemenag Kab. Nganjuk',
  aboutText:
    'Aplikasi ini dibuat untuk membantu anak MI yang sulit konsentrasi dan sulit memahami konsep dasar, belajar Al-Qur\'an Hadits dengan cara bermain — misi pendek, visual cerah, tanpa tekanan.',
} as const;

export const PANCA_CINTA = [
  {
    number: 1,
    title: 'Cinta Allah Swt. dan Rasul-Nya',
    desc: 'Menumbuhkan ketaatan, rajin membaca Al-Qur\'an, dan bersyukur atas segala nikmat.',
  },
  {
    number: 2,
    title: 'Cinta Ilmu',
    desc: 'Menumbuhkan semangat belajar tajwid, tafsir sederhana, dan hadis Nabi saw.',
  },
  {
    number: 3,
    title: 'Cinta Lingkungan',
    desc: 'Memupuk kepedulian melalui kerja bakti dan menjaga kebersihan madrasah.',
  },
  {
    number: 4,
    title: 'Cinta Diri dan Sesama Manusia',
    desc: 'Mengembangkan penghargaan, kasih sayang kepada anak yatim, dan suka menolong.',
  },
  {
    number: 5,
    title: 'Cinta Tanah Air',
    desc: 'Membangun rasa cinta tanah air dan menjadi generasi berkarakter mulia.',
  },
] as const;

export const AVATARS: AvatarProfile[] = [
  {
    id: 'raka',
    name: 'Raka',
    role: 'Penjelajah Peci Nusantara',
    accentColor: '#059669',
    bgTint: '#E6F7F1',
  },
  {
    id: 'aisyah',
    name: 'Aisyah',
    role: 'Penjaga Kitab Hikmah',
    accentColor: '#D97706',
    bgTint: '#FEF3C7',
  },
  {
    id: 'zaki',
    name: 'Zaki',
    role: 'Detektif Tajwid Cilik',
    accentColor: '#0284C7',
    bgTint: '#E0F2FE',
  },
  {
    id: 'hana',
    name: 'Hana',
    role: 'Sahabat Panca Cinta',
    accentColor: '#7C3AED',
    bgTint: '#F3E8FF',
  },
];
