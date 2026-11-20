import { BadgeDef, Island, LibraryVerse } from '../types/game';

export const BASMALAH_ARABIC = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
export const BASMALAH_MEANING = 'Dengan menyebut nama Allah yang Maha Pengasih lagi Maha Penyayang.';

export const SURAH_AL_ADIYAT_VERSES: LibraryVerse[] = [
  {
    number: 1,
    arabic: 'وَالْعَادِيَاتِ ضَبْحًا',
    translation: 'Demi kuda-kuda perang yang berlari kencang terengah-engah,',
  },
  {
    number: 2,
    arabic: 'فَالْمُورِيَاتِ قَدْحًا',
    translation: 'yang memercikkan bunga api (dengan entakan kakinya),',
  },
  {
    number: 3,
    arabic: 'فَالْمُغِيرَاتِ صُبْحًا',
    translation: 'yang menyerang (dengan tiba-tiba) pada waktu pagi,',
  },
  {
    number: 4,
    arabic: 'فَأَثَرْنَ بِهِ نَقْعًا',
    translation: 'sehingga menerbangkan debu,',
  },
  {
    number: 5,
    arabic: 'فَوَسَطْنَ بِهِ جَمْعًا',
    translation: 'lalu menyerbu ke tengah-tengah kumpulan musuh,',
  },
  {
    number: 6,
    arabic: 'إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ',
    translation: 'sesungguhnya manusia itu sangatlah ingkar kepada Tuhannya.',
  },
  {
    number: 7,
    arabic: 'وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ',
    translation: 'Sesungguhnya dia benar-benar menjadi saksi atas hal itu (keingkarannya).',
  },
  {
    number: 8,
    arabic: 'وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ',
    translation: 'Sesungguhnya cintanya pada harta benar-benar berlebihan.',
  },
  {
    number: 9,
    arabic: 'أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ',
    translation: 'Maka, tidakkah dia mengetahui apabila dikeluarkan apa yang ada di dalam kubur,',
  },
  {
    number: 10,
    arabic: 'وَحُصِّلَ مَا فِي الصُّدُورِ',
    translation: 'dan ditampakkan apa yang tersimpan di dalam dada?',
  },
  {
    number: 11,
    arabic: 'إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ',
    translation: 'Sesungguhnya Tuhan mereka pada hari itu benar-benar Maha Teliti terhadap keadaan mereka.',
  },
];

export const SURAH_AT_TIN_VERSES: LibraryVerse[] = [
  {
    number: 1,
    arabic: 'وَالتِّينِ وَالزَّيْتُونِ',
    translation: 'Demi (buah) tin dan (buah) zaitun,',
  },
  {
    number: 2,
    arabic: 'وَطُورِ سِينِينَ',
    translation: 'demi gunung Sinai,',
  },
  {
    number: 3,
    arabic: 'وَهَٰذَا الْبَلَدِ الْأَمِينِ',
    translation: 'dan demi negeri (Makkah) yang aman ini,',
  },
  {
    number: 4,
    arabic: 'لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ',
    translation: 'sungguh, Kami benar-benar telah menciptakan manusia dalam bentuk yang sebaik-baiknya.',
  },
  {
    number: 5,
    arabic: 'ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ',
    translation: 'Kemudian, Kami kembalikan dia ke tempat yang serendah-rendahnya,',
  },
  {
    number: 6,
    arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ',
    translation: 'kecuali orang-orang yang beriman dan mengerjakan kebajikan. Maka, mereka akan mendapat pahala yang tidak putus-putusnya.',
  },
  {
    number: 7,
    arabic: 'فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ',
    translation: 'Maka, apa alasanmu (wahai orang kafir) mendustakan hari Pembalasan setelah (adanya bukti-bukti) itu?',
  },
  {
    number: 8,
    arabic: 'أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ',
    translation: 'Bukankah Allah hakim yang paling adil?',
  },
];

export const MIM_SUKUN_RULES = [
  {
    id: 'ikhfa-syafawi',
    name: "Ikhfa' Syafawi",
    arabicName: 'إِخْفَاءٌ شَفَوِيٌّ',
    triggerLetter: 'Huruf Ba (ب)',
    howToRead: 'Mim sukun (مْ) bertemu Ba (ب), dibaca samar di bibir disertai dengung (ghunnah) sepanjang 2 harakat.',
    examples: [
      { arabic: 'رَبَّهُمْ بِهِمْ', source: "QS. Al-'Ādiyāt: 11" },
      { arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ', source: 'QS. Al-Fīl: 4' },
      { arabic: 'وَمَا هُمْ بِمُؤْمِنِينَ', source: 'QS. Al-Baqarah: 8' },
    ],
  },
  {
    id: 'idgham-mimi',
    name: 'Idgham Mimi (Mutamatsilain)',
    arabicName: 'إِدْغَامٌ مِيمِيٌّ',
    triggerLetter: 'Huruf Mim (م)',
    howToRead: 'Mim sukun (مْ) bertemu Mim (م), dibaca melebur menjadi satu huruf mim bertasydid disertai dengung 2 harakat.',
    examples: [
      { arabic: 'عَلَيْهِمْ مُؤْصَدَةٌ', source: 'QS. Al-Humazah: 8' },
      { arabic: 'لَهُمْ مَغْفِرَةٌ', source: 'QS. Al-Mulk: 12' },
      { arabic: 'وَلَكُمْ مَا كَسَبْتُمْ', source: 'QS. Al-Baqarah: 134' },
    ],
  },
  {
    id: 'izhar-syafawi',
    name: 'Izhar Syafawi',
    arabicName: 'إِظْهَارٌ شَفَوِيٌّ',
    triggerLetter: '26 Huruf selain Mim (م) dan Ba (ب)',
    howToRead: 'Mim sukun (مْ) bertemu huruf selain Mim dan Ba, dibaca jelas di bibir tanpa dengung.',
    examples: [
      { arabic: 'بِهِمْ يَوْمَئِذٍ', source: "QS. Al-'Ādiyāt: 11" },
      { arabic: 'فَلَهُمْ أَجْرٌ', source: 'QS. At-Tīn: 6' },
      { arabic: 'أَنْعَمْتَ عَلَيْهِمْ', source: 'QS. Al-Fātihah: 7' },
    ],
  },
];

export const HADIS_YATIM_DATA = {
  narrator: 'HR. Imam Bukhari dari Sahl bin Sa\'ad r.a.',
  matanArabic: 'أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا',
  continuationArabic: 'وَأَشَارَ بِالسَّبَّابَةِ وَالْوُسْطَى وَفَرَّجَ بَيْنَهُمَا شَيْئًا',
  translation:
    '"Aku dan orang yang menanggung (menyayangi) anak yatim di surga seperti ini." Beliau mengisyaratkan dengan jari telunjuk dan jari tengah serta agak merenggangkan keduanya.',
  vocab: [
    { arabic: 'أَنَا', meaning: 'Aku (Rasulullah saw.)' },
    { arabic: 'وَكَافِلُ', meaning: 'dan orang yang menanggung / mengurus' },
    { arabic: 'الْيَتِيمِ', meaning: 'anak yatim (ditinggal wafat ayahnya sebelum balig)' },
    { arabic: 'فِي الْجَنَّةِ', meaning: 'di dalam surga' },
    { arabic: 'هَكَذَا', meaning: 'seperti ini (sangat dekat)' },
    { arabic: 'بِالسَّبَّابَةِ وَالْوُسْطَى', meaning: 'dengan jari telunjuk dan jari tengah' },
  ],
  keyLessons: [
    'Menyayangi, menghormati, dan membantu kebutuhan anak yatim adalah amalan mulia.',
    'Kedudukan orang yang menyayangi anak yatim sangat dekat dengan Rasulullah saw. di surga.',
    'Kita dilarang menghardik, mengejek, atau menyakiti hati anak yatim.',
    'Wujud nyata nilai Panca Cinta ke-4: Cinta Diri dan Sesama Manusia.',
  ],
};

export const BADGES: BadgeDef[] = [
  {
    id: 'badge-adiyat',
    title: "Ksatria Al-'Ādiyāt",
    description: "Menaklukkan Pulau Lembah Kuda Cahaya (Bab 1A: Surah Al-'Ādiyāt).",
    islandId: 'al-adiyat',
    accentHex: '#D97706',
  },
  {
    id: 'badge-attin',
    title: 'Penjaga Bukit Zaitun',
    description: 'Menaklukkan Pulau Bukit Zaitun & Sinai (Bab 1B: Surah At-Tīn).',
    islandId: 'at-tin',
    accentHex: '#059669',
  },
  {
    id: 'badge-mimsukun',
    title: 'Detektif Mim Sukun',
    description: 'Menaklukkan Menara Detektif Tajwid (Bab 2: Hukum Bacaan Mim Sukun).',
    islandId: 'mim-sukun',
    accentHex: '#0284C7',
  },
  {
    id: 'badge-yatim',
    title: 'Sahabat Anak Yatim',
    description: 'Menaklukkan Taman Kasih Sayang (Bab 3: Hadis Menyayangi Anak Yatim).',
    islandId: 'hadis-yatim',
    accentHex: '#7C3AED',
  },
  {
    id: 'badge-combo',
    title: 'Kombo Kilat 5x',
    description: 'Mencapai 5 jawaban benar beruntun dalam satu misi.',
    accentHex: '#EA580C',
  },
  {
    id: 'badge-perfect',
    title: 'Bintang Tiga Pertama',
    description: 'Meraih nilai sempurna 3 bintang pada salah satu misi.',
    accentHex: '#CA8A04',
  },
  {
    id: 'badge-fauzi',
    title: 'Teladan Panca Cinta',
    description: 'Menyelesaikan minimal 2 misi Studi Kasus Kehidupan Sehari-hari.',
    accentHex: '#0D9488',
  },
  {
    id: 'badge-grandmaster',
    title: 'Penjaga Hikmah Utama',
    description: 'Menyelesaikan seluruh 4 pulau & siap menerima Sertifikat Kelulusan.',
    accentHex: '#B45309',
  },
];

export const ISLANDS: Island[] = [
  /* =========================================================
     PULAU 1: BAB 1A — SURAH AL-'ĀDIYĀT
     ========================================================= */
  {
    id: 'al-adiyat',
    number: 1,
    babLabel: 'Bab 1A',
    name: 'Lembah Kuda Cahaya',
    topicTitle: "Surah Al-'Ādiyāt (QS. 100: 1–11)",
    description:
      'Pelajari 11 ayat Surah Al-\'Ādiyāt, maknanya tentang syukur dan menjauhi sifat kikir (hubbud dunya), serta kisah nyata Fauzi di madrasah.',
    accentHex: '#D97706',
    softBg: '#FEF3C7',
    mapX: 22,
    mapY: 66,
    badgeId: 'badge-adiyat',
    missions: [
      {
        id: 'adiyat-m1',
        islandId: 'al-adiyat',
        order: 1,
        title: "Susun Ayat Al-'Ādiyāt",
        shortSubtitle: 'Mini-Game Susun Ayat',
        type: 'AYAT_SEQUENCER',
        xpReward: 90,
        estimatedMinutes: 3,
        briefing:
          "Susun potongan ayat Surah Al-'Ādiyāt secara berurutan dari kanan ke kiri (RTL). Kumpulkan kombo untuk bonus XP!",
        sequencerRounds: [
          {
            id: 'ad-seq-1',
            prompt: "Susun potongan Surah Al-'Ādiyāt ayat ke-1 hingga ke-2:",
            referenceLabel: "QS. Al-'Ādiyāt: 1–2",
            translation:
              'Demi kuda-kuda perang yang berlari kencang terengah-engah, yang memercikkan bunga api (dengan entakan kakinya).',
            explanation:
              "Surah Al-'Ādiyāt artinya 'Kuda perang yang berlari kencang'. Ayat ke-2 diawali lafal فَالْمُورِيَاتِ.",
            chunks: ['وَالْعَادِيَاتِ', 'ضَبْحًا', 'فَالْمُورِيَاتِ', 'قَدْحًا'],
            isArabic: true,
          },
          {
            id: 'ad-seq-2',
            prompt: "Susun potongan Surah Al-'Ādiyāt ayat ke-6 dengan tepat:",
            referenceLabel: "QS. Al-'Ādiyāt: 6",
            translation: 'Sesungguhnya manusia itu sangatlah ingkar kepada Tuhannya.',
            explanation:
              'Ayat ke-6 mengingatkan watak manusia yang cenderung kufur nikmat. Lafal لَكَنُودٌ artinya sangat ingkar.',
            chunks: ['إِنَّ', 'الْإِنْسَانَ', 'لِرَبِّهِ', 'لَكَنُودٌ'],
            isArabic: true,
          },
          {
            id: 'ad-seq-3',
            prompt: "Susun potongan Surah Al-'Ādiyāt ayat ke-8 tentang cinta harta:",
            referenceLabel: "QS. Al-'Ādiyāt: 8",
            translation: 'Sesungguhnya cintanya pada harta benar-benar berlebihan.',
            explanation:
              'Cinta berlebihan kepada harta (hubbud dunya) membuat manusia menjadi kikir dan tamak.',
            chunks: ['وَإِنَّهُ', 'لِحُبِّ', 'الْخَيْرِ', 'لَشَدِيدٌ'],
            isArabic: true,
          },
          {
            id: 'ad-seq-4',
            prompt: "Susun potongan Surah Al-'Ādiyāt ayat ke-11 (ayat penutup):",
            referenceLabel: "QS. Al-'Ādiyāt: 11",
            translation:
              'Sesungguhnya Tuhan mereka pada hari itu benar-benar Maha Teliti terhadap keadaan mereka.',
            explanation:
              'Allah Swt. Maha Teliti (لَخَبِيرٌ) atas segala amal dan isi hati manusia di hari pembalasan.',
            chunks: ['إِنَّ', 'رَبَّهُمْ', 'بِهِمْ', 'يَوْمَئِذٍ', 'لَخَبِيرٌ'],
            isArabic: true,
          },
        ],
      },
      {
        id: 'adiyat-m2',
        islandId: 'al-adiyat',
        order: 2,
        title: "Hujan Lentera Al-'Ādiyāt",
        shortSubtitle: 'Arcade Tangkap Lentera',
        type: 'ARCADE_CATCHER',
        xpReward: 110,
        estimatedMinutes: 2,
        briefing:
          "Aksi cepat! Lentera bercahaya sedang meluncur turun dari langit! Tangkap hanya lafal dan pesan asli Surah Al-'Ādiyāt, hindari lentera pengecoh!",
        arcadeWaves: [
          {
            id: 'ad-wave-1',
            targetTitle: "Tangkap Lentera Lafal Surah Al-'Ādiyāt!",
            targetRuleHint: "Gelombang 1 · Kenali ayat & lafal QS. Al-'Ādiyāt (100: 1–11)",
            targetGoalCount: 5,
            items: [
              {
                id: 'aw1-1',
                arabic: 'وَالْعَادِيَاتِ',
                label: 'Demi kuda perang',
                isTarget: true,
                feedback: "Benar! وَالْعَادِيَاتِ adalah ayat ke-1 Surah Al-'Ādiyāt.",
              },
              {
                id: 'aw1-2',
                arabic: 'لَكَنُودٌ',
                label: 'Sangat ingkar',
                isTarget: true,
                feedback: "Tepat! لَكَنُودٌ (ayat 6) artinya manusia sangat ingkar kepada Tuhannya.",
              },
              {
                id: 'aw1-3',
                arabic: 'لَشَهِيدٌ',
                label: 'Menjadi saksi',
                isTarget: true,
                feedback: "Mantap! لَشَهِيدٌ adalah lanjutan وَإِنَّهُ عَلَىٰ ذَٰلِكَ pada ayat ke-7.",
              },
              {
                id: 'aw1-4',
                arabic: 'لَخَبِيرٌ',
                label: 'Maha Teliti',
                isTarget: true,
                feedback: "Benar! لَخَبِيرٌ (ayat 11) menegaskan Allah Maha Teliti atas keadaan manusia.",
              },
              {
                id: 'aw1-5',
                arabic: 'وَالتِّينِ',
                label: 'Demi buah tin',
                isTarget: false,
                feedback: 'وَالتِّينِ berasal dari Surah At-Tīn, bukan Al-\'Ādiyāt!',
              },
              {
                id: 'aw1-6',
                arabic: 'الْيَتِيمِ',
                label: 'Anak yatim',
                isTarget: false,
                feedback: 'الْيَتِيمِ adalah kosakata Hadis Anak Yatim, bukan ayat Al-\'Ādiyāt!',
              },
            ],
          },
          {
            id: 'ad-wave-2',
            targetTitle: "Tangkap Sikap Baik Penjaga Hikmah (Bukan Kufur Nikmat)!",
            targetRuleHint: "Gelombang 2 · Amalkan pesan Surah Al-'Ādiyāt dalam kehidupan sehari-hari",
            targetGoalCount: 5,
            items: [
              {
                id: 'aw2-1',
                label: 'Ucap Alhamdulillah saat dapat nikmat',
                isTarget: true,
                feedback: 'Benar! Bersyukur menjauhkan kita dari sifat kufur nikmat.',
              },
              {
                id: 'aw2-2',
                label: 'Berbagi harta kepada tetangga susah',
                isTarget: true,
                feedback: 'Mulia! Lawan sifat kikir (hubbud dunya) dengan suka memberi.',
              },
              {
                id: 'aw2-3',
                label: 'Rajin ikut kerja bakti madrasah',
                isTarget: true,
                feedback: 'Tepat! Seperti teladan Fauzi setelah sadar tidak terlalu mencintai barang.',
              },
              {
                id: 'aw2-4',
                label: 'Kikir & tamak terhadap harta',
                isTarget: false,
                feedback: 'Kikir & tamak (hubbud dunya) adalah sifat tercela yang diperingatkan Al-\'Ādiyāt!',
              },
              {
                id: 'aw2-5',
                label: 'Kufur nikmat & lupa bersyukur',
                isTarget: false,
                feedback: 'Kufur nikmat (lakanud) adalah sifat ingkar yang harus kita jauhi!',
              },
            ],
          },
        ],
      },
      {
        id: 'adiyat-m3',
        islandId: 'al-adiyat',
        order: 3,
        title: 'Kisah Fauzi & Sepatu Baru',
        shortSubtitle: 'Studi Kasus Kehidupan',
        type: 'STORY_CASE',
        xpReward: 110,
        estimatedMinutes: 3,
        briefing:
          'Ikuti kisah nyata dari buku Al-Qur\'an Hadits Kelas 5 MI (Halaman Pengayaan) tentang Fauzi dan sepatu barunya. Bantu Fauzi mengambil sikap yang bijak!',
        storyScenes: [
          {
            id: 'fauzi-1',
            sceneIllustration: 'fauzi-school',
            chapterTag: 'Pengayaan Bab 1 · Kisah Fauzi',
            characterName: 'Fauzi (Siswa Kelas 5 MI)',
            narration:
              'Fauzi sangat senang mendapat sepatu baru dari ayahnya. Hari Jumat pagi, seluruh siswa MI mengadakan kerja bakti membersihkan halaman madrasah.',
            dialogue:
              '"Wah, sepatuku masih baru dan bersih sekali! Kalau aku ikut menyapu dan menyiram tanaman, nanti sepatuku kotor..."',
            question: 'Mengapa sikap malas kerja bakti karena takut sepatu kotor perlu dihindari?',
            choices: [
              {
                id: 'opt-wise',
                text: 'Menyadari itu tanda terlalu cinta barang (hubbud dunya) dan tetap ikut membantu kerja bakti',
                isWise: true,
                pancaCintaTag: 'Cinta Lingkungan & Syukur',
                outcomeTitle: 'Langkah Awal Perubahan!',
                outcomeText:
                  'Fauzi melihat temannya tetap rajin membantu meski sepatunya sudah usang. Fauzi sadar bahwa berbuat baik jauh lebih berharga daripada sekadar memamerkan barang baru.',
                dalilNote:
                  "QS. Al-'Ādiyāt ayat 8 mengingatkan agar kita tidak cinta berlebihan pada harta benda hingga lupa berbuat baik.",
              },
              {
                id: 'opt-unwise',
                text: 'Bersembunyi di kelas saja supaya sepatu baru tetap mengilap sepanjang hari',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Hati-hati Hubbud Dunya!',
                outcomeText:
                  'Jika Fauzi menghindari kerja bakti demi menjaga sepatu barunya, ia bisa menjadi egois dan dijauhi teman. Sepatu bisa dicuci, tetapi kesempatan beramal saleh sangat berharga!',
                dalilNote:
                  "Dalam Surah Al-'Ādiyāt, sifat terlalu mencintai harta (hubbud dunya) membuat manusia kikir dan lalai bersyukur.",
              },
            ],
          },
          {
            id: 'fauzi-2',
            sceneIllustration: 'neighbor-help',
            chapterTag: 'Pengayaan Bab 1 · Keesokan Harinya',
            characterName: 'Fauzi & Teman Sekelas',
            narration:
              'Keesokan harinya Fauzi berubah dan ikut membantu teman-temannya meskipun sepatunya sedikit berdebu. Sorenya, ia melihat tetangganya sedang kesusahan sementara keluarganya memiliki rezeki lebih.',
            dialogue:
              '"Alhamdulillah aku sudah belajar bersyukur. Sekarang tetangga kita sedang butuh bantuan, apa yang sebaiknya kita lakukan?"',
            question: 'Jika diberi harta berlebih sementara tetangga kesusahan, sikap yang paling tepat adalah...',
            choices: [
              {
                id: 'opt-wise-2',
                text: 'Mengucapkan Alhamdulillah, lalu ikut berbagi dan menolong tetangga yang kesusahan',
                isWise: true,
                pancaCintaTag: 'Cinta Sesama Manusia',
                outcomeTitle: 'Hati Tenang & Bahagia!',
                outcomeText:
                  'Setelah membantu teman dan tetangga, Fauzi merasa jauh lebih bahagia. Ia bersyukur atas nikmat Allah dengan cara beramal saleh.',
                dalilNote:
                  "Mensyukuri nikmat Allah dilakukan dengan mengucap 'Alhamdulillah' dan berbagi agar terhindar dari sifat kikir dan kufur nikmat.",
              },
              {
                id: 'opt-unwise-2',
                text: 'Menyimpan semua harta sendiri karena itu hasil usaha keluarga sendiri',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Jangan Jadi Kikir!',
                outcomeText:
                  'Menolak membantu tetangga padahal mampu adalah wujud sifat kikir yang dicela dalam Surah Al-\'Ādiyāt. Ingat, Allah Maha Teliti atas semua perbuatan kita.',
                dalilNote:
                  "Pokok kandungan QS. Al-'Ādiyāt mengajak kita menjauhi sifat kikir, kufur nikmat, dan memperbanyak amal saleh.",
              },
            ],
          },
        ],
      },
      {
        id: 'adiyat-boss',
        islandId: 'al-adiyat',
        order: 4,
        title: "Boss: Bayangan Kufur Nikmat",
        shortSubtitle: 'Boss Battle Bab 1A',
        type: 'BOSS_BATTLE',
        xpReward: 160,
        estimatedMinutes: 4,
        briefing:
          "Taklukkan Bayangan Kufur Nikmat dengan menjawab soal Asesmen Sumatif Surah Al-'Ādiyāt! Setiap jawaban benar melancarkan serangan cahaya hikmah.",
        bossConfig: {
          bossName: 'Bayangan Kufur Nikmat',
          bossTitle: "Penjaga Lembah Al-'Ādiyāt",
          bossVisualId: 'kufur-nikmat',
          introQuote:
            '"Buktikan bahwa kamu benar-benar memahami Surah Al-\'Ādiyāt dan selalu bersyukur atas nikmat Allah!"',
          defeatQuote:
            '"Luar biasa! Pemahaman dan rasa syukurmu telah menerangi Lembah Kuda Cahaya!"',
          questions: [
            {
              id: 'b1-q1',
              prompt: "Surah Al-'Ādiyāt dalam Al-Qur'an menempati urutan surah yang ke-....",
              options: [
                { id: 'a', text: 'Ke-96 (8 ayat)' },
                { id: 'b', text: 'Ke-98 (10 ayat)' },
                { id: 'c', text: 'Ke-100 (11 ayat)' },
                { id: 'd', text: 'Ke-102 (11 ayat)' },
              ],
              correctOptionId: 'c',
              explanation:
                "Surah Al-'Ādiyāt adalah surah urutan ke-100 dalam Al-Qur'an, terdiri atas 11 ayat, dan tergolong surah Makkiyah.",
              hint: 'Ingat angka bulat seratus!',
            },
            {
              id: 'b1-q2',
              prompt: "Surah Al-'Ādiyāt ayat kedua diawali dengan lafal....",
              options: [
                { id: 'a', text: 'Fa atsarna', arabic: 'فَأَثَرْنَ' },
                { id: 'b', text: 'Fal-mūriyāti', arabic: 'فَالْمُورِيَاتِ' },
                { id: 'c', text: 'Fal-mugīrāti', arabic: 'فَالْمُغِيرَاتِ' },
                { id: 'd', text: 'Fawasaṭna', arabic: 'فَوَسَطْنَ' },
              ],
              correctOptionId: 'b',
              explanation:
                "Ayat ke-2 berbunyi فَالْمُورِيَاتِ قَدْحًا (yang memercikkan bunga api dengan entakan kakinya).",
              hint: 'Setelah وَالْعَادِيَاتِ ضَبْحًا, kuda perang memercikkan bunga api.',
            },
            {
              id: 'b1-q3',
              prompt: 'Apabila mendapat nikmat dari Allah Swt., hendaknya seorang muslim mengucapkan....',
              options: [
                { id: 'a', text: 'Alhamdulillāh (Segala puji bagi Allah)' },
                { id: 'b', text: 'Subḥānallāh' },
                { id: 'c', text: 'Lā ḥaula walā quwwata illā billāh' },
                { id: 'd', text: 'Astaghfirullāh' },
              ],
              correctOptionId: 'a',
              explanation:
                'Mengucapkan Alhamdulillāh adalah bentuk syukur lisan atas nikmat Allah agar terhindar dari kufur nikmat.',
              hint: 'Kalimat tahmid sebagai ungkapan terima kasih kepada Allah.',
            },
            {
              id: 'b1-q4',
              prompt: "Dua sifat dasar tercela manusia yang diperingatkan dalam Surah Al-'Ādiyāt adalah....",
              options: [
                { id: 'a', text: 'Rajin belajar dan dermawan' },
                { id: 'b', text: 'Kufur nikmat dan hubbud dunya (cinta harta berlebihan)' },
                { id: 'c', text: 'Rendah hati dan pemaaf' },
                { id: 'd', text: 'Sabar dan tawakal' },
              ],
              correctOptionId: 'b',
              explanation:
                "Ayat 6–8 menjelaskan bahwa manusia cenderung kufur nikmat (لَكَنُودٌ) dan terlalu cinta harta (hubbud dunya) hingga kikir.",
              hint: 'Ingat kisah Fauzi dan makna ayat ke-6 serta ke-8!',
            },
          ],
        },
      },
    ],
  },

  /* =========================================================
     PULAU 2: BAB 1B — SURAH AT-TĪN
     ========================================================= */
  {
    id: 'at-tin',
    number: 2,
    babLabel: 'Bab 1B',
    name: 'Bukit Zaitun & Sinai',
    topicTitle: 'Surah At-Tīn (QS. 95: 1–8)',
    description:
      'Jelajahi 4 sumpah mulia Allah Swt. dalam Surah At-Tīn, rahasia manusia sebagai makhluk terbaik (ahsan taqwim), dan Allah Hakim Yang Maha Adil.',
    accentHex: '#059669',
    softBg: '#D1FAE5',
    mapX: 44,
    mapY: 34,
    badgeId: 'badge-attin',
    missions: [
      {
        id: 'attin-m1',
        islandId: 'at-tin',
        order: 1,
        title: 'Susun Ayat Surah At-Tīn',
        shortSubtitle: 'Mini-Game Susun Ayat',
        type: 'AYAT_SEQUENCER',
        xpReward: 95,
        estimatedMinutes: 3,
        briefing:
          'Susun potongan ayat Surah At-Tīn (surah urutan ke-95, 8 ayat) dari kanan ke kiri secara tepat.',
        sequencerRounds: [
          {
            id: 'at-seq-1',
            prompt: 'Susun ayat ke-1 hingga ayat ke-3 (empat sumpah Allah):',
            referenceLabel: 'QS. At-Tīn: 1–3',
            translation: 'Demi (buah) tin dan (buah) zaitun, demi gunung Sinai, dan demi negeri (Makkah) yang aman ini.',
            explanation:
              'Allah bersumpah dengan 4 hal: buah tin, buah zaitun (tumbuh di Syam), gunung Sinai (Mesir), dan kota Makkah (Al-Balad Al-Amin).',
            chunks: ['وَالتِّينِ وَالزَّيْتُونِ', 'وَطُورِ سِينِينَ', 'وَهَٰذَا الْبَلَدِ', 'الْأَمِينِ'],
            isArabic: true,
          },
          {
            id: 'at-seq-2',
            prompt: 'Susun ayat ke-4 tentang penciptaan manusia yang paling sempurna:',
            referenceLabel: 'QS. At-Tīn: 4',
            translation: 'Sungguh, Kami benar-benar telah menciptakan manusia dalam bentuk yang sebaik-baiknya.',
            explanation:
              'Manusia diberi bentuk jasmani & rohani paling sempurna, dibekali akal pikiran dan hati sebagai khalifah di bumi.',
            chunks: ['لَقَدْ خَلَقْنَا', 'الْإِنْسَانَ', 'فِي أَحْسَنِ', 'تَقْوِيمٍ'],
            isArabic: true,
          },
          {
            id: 'at-seq-3',
            prompt: 'Susun ayat ke-6 tentang pahala bagi orang beriman dan beramal saleh:',
            referenceLabel: 'QS. At-Tīn: 6',
            translation:
              'Kecuali orang-orang yang beriman dan mengerjakan kebajikan. Maka, mereka akan mendapat pahala yang tidak putus-putusnya.',
            explanation:
              'Lafal غَيْرُ مَمْنُونٍ artinya pahala yang tidak putus-putusnya (surga Allah Swt.).',
            chunks: ['إِلَّا الَّذِينَ آمَنُوا', 'وَعَمِلُوا الصَّالِحَاتِ', 'فَلَهُمْ أَجْرٌ', 'غَيْرُ مَمْنُونٍ'],
            isArabic: true,
          },
          {
            id: 'at-seq-4',
            prompt: 'Susun ayat ke-8 (ayat penutup Surah At-Tīn):',
            referenceLabel: 'QS. At-Tīn: 8',
            translation: 'Bukankah Allah hakim yang paling adil?',
            explanation:
              'Allah Swt. adalah أَحْكَمِ الْحَاكِمِينَ — Hakim yang paling adil dalam membalas setiap amal manusia.',
            chunks: ['أَلَيْسَ', 'اللَّهُ', 'بِأَحْكَمِ', 'الْحَاكِمِينَ'],
            isArabic: true,
          },
        ],
      },
      {
        id: 'attin-m2',
        islandId: 'at-tin',
        order: 2,
        title: 'Kartu Memori 4 Sumpah At-Tīn',
        shortSubtitle: 'Mini-Game Kartu Memori 3D',
        type: 'MEMORY_MATCH',
        xpReward: 110,
        estimatedMinutes: 3,
        briefing:
          'Buka dan cocokkan 6 pasang kartu sakti Surah At-Tīn — pasangkan lafal Arab dengan arti dan tempat bersejarahnya!',
        memoryPairs: [
          {
            id: 'mp-at-1',
            arabic: 'وَالتِّينِ وَالزَّيْتُونِ',
            meaning: 'Buah tin & zaitun (tumbuh subur di Syam)',
            note: 'Buah tin dan zaitun tumbuh subur di negeri Syam serta kaya manfaat kesehatan.',
          },
          {
            id: 'mp-at-2',
            arabic: 'وَطُورِ سِينِينَ',
            meaning: 'Gunung Sinai (wahyu Taurat Nabi Musa a.s.)',
            note: 'Gunung Sinai di Mesir adalah tempat Nabi Musa a.s. menerima wahyu kitab Taurat.',
          },
          {
            id: 'mp-at-3',
            arabic: 'الْبَلَدِ الْأَمِينِ',
            meaning: 'Negeri yang aman (Kota Makkah)',
            note: 'Al-Balad Al-Amin adalah Kota Makkah tempat lahir dan diutusnya Nabi Muhammad saw.',
          },
          {
            id: 'mp-at-4',
            arabic: 'أَحْسَنِ تَقْوِيمٍ',
            meaning: 'Bentuk manusia yang sebaik-baiknya',
            note: 'Allah menciptakan manusia dalam bentuk paling sempurna dengan akal dan hati.',
          },
          {
            id: 'mp-at-5',
            arabic: 'غَيْرُ مَمْنُونٍ',
            meaning: 'Pahala yang tiada putus-putusnya',
            note: 'Balasan surga bagi orang beriman dan beramal saleh adalah pahala tiada putus.',
          },
          {
            id: 'mp-at-6',
            arabic: 'أَحْكَمِ الْحَاكِمِينَ',
            meaning: 'Allah Hakim yang paling adil',
            note: 'Ayat ke-8 menegaskan Allah Swt. adalah Hakim yang paling adil atas amal manusia.',
          },
        ],
      },
      {
        id: 'attin-m3',
        islandId: 'at-tin',
        order: 3,
        title: 'Ujian Manusia Terbaik',
        shortSubtitle: 'Studi Kasus Kehidupan',
        type: 'STORY_CASE',
        xpReward: 110,
        estimatedMinutes: 3,
        briefing:
          'Bagaimana cara menjaga derajat mulia manusia agar tidak jatuh ke tempat yang serendah-rendahnya? Tentukan pilihanmu!',
        storyScenes: [
          {
            id: 'attin-story-1',
            sceneIllustration: 'sinai-scroll',
            chapterTag: 'Penerapan Surah At-Tīn · Di Madrasah',
            characterName: 'Nadia & Bagas',
            narration:
              'Saat jam istirahat, Bagas berkata bahwa cukup percaya kepada Allah di dalam hati saja, tidak perlu repot membantu teman atau rajin salat.',
            dialogue:
              '"Yang penting kan aku sudah beriman di hati, jadi tidak perlu capek-capek beramal saleh, kan?"',
            question: 'Bagaimana jawabanmu kepada Bagas berdasarkan Surah At-Tīn ayat 5–6?',
            choices: [
              {
                id: 'wise-1',
                text: 'Menjelaskan bahwa iman harus dibuktikan dengan amal saleh agar keimanan berarti dan mendapat pahala tiada putus',
                isWise: true,
                pancaCintaTag: 'Cinta Allah & Cinta Ilmu',
                outcomeTitle: 'Nasihat yang Tepat!',
                outcomeText:
                  'Bagas pun mengerti bahwa orang yang beriman tetapi tidak beramal saleh, keimanannya tidak berarti. Iman dan amal saleh harus berjalan bersama.',
                dalilNote:
                  'QS. At-Tīn ayat 6: Hanya orang yang beriman DAN mengerjakan kebajikan yang selamat dari kehinaan.',
              },
              {
                id: 'unwise-1',
                text: 'Setuju saja dengan Bagas supaya tidak perlu repot belajar dan menolong sesama',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Ingat Peringatan Ayat 5!',
                outcomeText:
                  'Manusia akan jatuh ke derajat serendah-rendahnya apabila tidak beriman dan tidak membuktikannya dengan amal saleh.',
                dalilNote:
                  'Asesmen Sumatif Bab 1: Orang yang beriman tetapi tidak beramal saleh, maka keimanannya tidak berarti.',
              },
            ],
          },
          {
            id: 'attin-story-2',
            sceneIllustration: 'neighbor-help',
            chapterTag: 'Penerapan Surah At-Tīn · Amal Saleh',
            characterName: 'Nadia',
            narration:
              'Sepulang sekolah, Nadia melihat seorang nenek tetangganya kesulitan membawa belanjaan di jalan yang menanjak.',
            dialogue:
              '"Aku ingin membuktikan rasa syukur karena Allah menciptakanku dengan tubuh sehat dan akal yang baik..."',
            question: 'Manakah contoh amal saleh kepada sesama manusia yang paling sesuai?',
            choices: [
              {
                id: 'wise-2',
                text: 'Segera menghampiri dengan sopan dan membantu membawakan belanjaan tetangga yang kesusahan',
                isWise: true,
                pancaCintaTag: 'Cinta Sesama Manusia',
                outcomeTitle: 'Amal Saleh Mulia!',
                outcomeText:
                  'Nenek tersebut sangat berterima kasih. Menggunakan fisik dan akal sehat untuk menolong sesama adalah ciri manusia mulia (ahsan taqwim).',
                dalilNote:
                  'Contoh amal saleh kepada sesama: suka menolong tetangga yang sedang kesusahan.',
              },
              {
                id: 'unwise-2',
                text: 'Berjalan cepat melewati nenek itu agar lekas sampai rumah dan bermain sendiri',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Kesempatan Pahala Terlewat',
                outcomeText:
                  'Allah memberikan kita tubuh yang kuat agar bermanfaat bagi sesama. Menolong tetangga adalah ladang pahala yang tiada putus.',
                dalilNote:
                  'Surah At-Tīn ayat 8: Allah Hakim yang paling adil akan membalas setiap kebaikan sekecil apa pun.',
              },
            ],
          },
        ],
      },
      {
        id: 'attin-boss',
        islandId: 'at-tin',
        order: 4,
        title: 'Boss: Kabut Kelalaian',
        shortSubtitle: 'Boss Battle Bab 1B',
        type: 'BOSS_BATTLE',
        xpReward: 170,
        estimatedMinutes: 4,
        briefing:
          'Hadapi Kabut Kelalaian di Puncak Sinai & Zaitun! Jawab 4 soal HOTS Surah At-Tīn untuk meraih Lencana Penjaga Bukit Zaitun.',
        bossConfig: {
          bossName: 'Kabut Kelalaian',
          bossTitle: 'Penjaga Puncak At-Tīn',
          bossVisualId: 'kelalaian',
          introQuote:
            '"Banyak manusia lupa betapa mulianya penciptaan mereka. Mampukah kamu menjawab ujian Surah At-Tīn ini?"',
          defeatQuote:
            '"Cahaya ilmu dan amal salehmu menyingkap seluruh kabut! Puncak At-Tīn kini milikmu!"',
          questions: [
            {
              id: 'b2-q1',
              prompt: 'Bukit Sinai merupakan tempat Nabi Musa a.s. mendapatkan wahyu dari Allah Swt. berupa kitab....',
              options: [
                { id: 'a', text: 'Kitab Zabur' },
                { id: 'b', text: 'Kitab Injil' },
                { id: 'c', text: 'Kitab Taurat' },
                { id: 'd', text: "Kitab Al-Qur'an" },
              ],
              correctOptionId: 'c',
              explanation:
                'Di Gunung Sinai (Mesir), Nabi Musa a.s. menerima wahyu langsung dari Allah Swt. berupa Kitab Taurat.',
              hint: 'Ingat kitab yang diturunkan kepada Nabi Musa a.s.!',
            },
            {
              id: 'b2-q2',
              prompt: "Surah At-Tīn dalam Al-Qur'an menempati urutan surah ke-... dan terdiri dari ... ayat.",
              options: [
                { id: 'a', text: 'Ke-93, terdiri dari 11 ayat' },
                { id: 'b', text: 'Ke-95, terdiri dari 8 ayat' },
                { id: 'c', text: 'Ke-96, terdiri dari 8 ayat' },
                { id: 'd', text: 'Ke-100, terdiri dari 11 ayat' },
              ],
              correctOptionId: 'b',
              explanation:
                "Surah At-Tīn adalah surah urutan ke-95 dalam Al-Qur'an, terdiri atas 8 ayat, dan termasuk surah Makkiyah.",
              hint: 'Lima angka sebelum Surah Al-‘Ādiyāt (100)!',
            },
            {
              id: 'b2-q3',
              prompt: 'Manusia akan jatuh menjadi makhluk yang hina (serendah-rendahnya) apabila selama hidupnya....',
              options: [
                { id: 'a', text: 'Tidak beriman dan selalu berbuat maksiat' },
                { id: 'b', text: 'Beriman dan gemar bersedekah' },
                { id: 'c', text: 'Rajin belajar dan menghormati guru' },
                { id: 'd', text: 'Bersyukur atas nikmat sehat' },
              ],
              correctOptionId: 'a',
              explanation:
                'QS. At-Tīn ayat 5–6 menegaskan manusia menjadi hina jika tidak beriman dan terus bermaksiat, kecuali yang beriman dan beramal saleh.',
              hint: 'Lawan dari beriman dan beramal saleh.',
            },
            {
              id: 'b2-q4',
              prompt: 'Siapakah Hakim yang paling adil sebagaimana dijelaskan pada Surah At-Tīn ayat ke-8?',
              arabicSnippet: 'أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ',
              options: [
                { id: 'a', text: 'Para raja di dunia' },
                { id: 'b', text: 'Para malaikat penjaga' },
                { id: 'c', text: 'Allah Swt.' },
                { id: 'd', text: 'Para hakim pengadilan' },
              ],
              correctOptionId: 'c',
              explanation:
                'Allah Swt. adalah Hakim yang paling adil (أَحْكَمِ الْحَاكِمِينَ) yang membalas setiap amal baik dan buruk secara adil.',
              hint: 'Perhatikan lafal اللَّهُ pada ayat ke-8.',
            },
          ],
        },
      },
    ],
  },

  /* =========================================================
     PULAU 3: BAB 2 — HUKUM BACAAN MIM SUKUN
     ========================================================= */
  {
    id: 'mim-sukun',
    number: 3,
    babLabel: 'Bab 2',
    name: 'Menara Detektif Tajwid',
    topicTitle: 'Hukum Bacaan Mim Sukun (مْ)',
    description:
      "Kuasai 3 hukum bacaan Mim Sukun — Ikhfa' Syafawi, Idgham Mimi, dan Izhar Syafawi — lalu temukan langsung di dalam ayat Al-Qur'an!",
    accentHex: '#0284C7',
    softBg: '#E0F2FE',
    mapX: 77,
    mapY: 70,
    badgeId: 'badge-mimsukun',
    missions: [
      {
        id: 'mim-m1',
        islandId: 'mim-sukun',
        order: 1,
        title: 'Hujan Lentera Mim Sukun!',
        shortSubtitle: 'Arcade Tangkap Tajwid',
        type: 'ARCADE_CATCHER',
        xpReward: 115,
        estimatedMinutes: 3,
        briefing:
          "Uji refleks tajwidmu! Tangkap hanya lentera bacaan Mim Sukun (مْ) yang sesuai dengan hukum target di tiap gelombang!",
        arcadeWaves: [
          {
            id: 'mim-wave-1',
            targetTitle: "Tangkap Hanya Bacaan IKHFA' SYAFAWI (مْ + ب)!",
            targetRuleHint: "Gelombang 1 · Ikhfa' Syafawi = Mim Sukun bertemu huruf Ba (ب)",
            targetGoalCount: 4,
            items: [
              {
                id: 'mw1-1',
                arabic: 'رَبَّهُمْ بِهِمْ',
                label: "Al-'Ādiyāt: 11",
                isTarget: true,
                feedback: "Benar! رَبَّهُمْ بِهِمْ adalah Ikhfa' Syafawi (مْ bertemu ب).",
              },
              {
                id: 'mw1-2',
                arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ',
                label: 'Al-Fīl: 4',
                isTarget: true,
                feedback: "Mantap! تَرْمِيهِمْ بِحِجَارَةٍ adalah Ikhfa' Syafawi (مْ bertemu ب).",
              },
              {
                id: 'mw1-3',
                arabic: 'وَمَا هُمْ بِمُؤْمِنِينَ',
                label: 'Al-Baqarah: 8',
                isTarget: true,
                feedback: "Tepat! هُمْ بِمُؤْمِنِينَ adalah Ikhfa' Syafawi (samar & dengung).",
              },
              {
                id: 'mw1-4',
                arabic: 'فَلَهُمْ أَجْرٌ',
                label: 'At-Tīn: 6',
                isTarget: false,
                feedback: 'فَلَهُمْ أَجْرٌ adalah Izhar Syafawi (مْ bertemu أ), bukan Ikhfa\' Syafawi!',
              },
              {
                id: 'mw1-5',
                arabic: 'لَهُمْ مَغْفِرَةٌ',
                label: 'Al-Mulk: 12',
                isTarget: false,
                feedback: 'لَهُمْ مَغْفِرَةٌ adalah Idgham Mimi (مْ bertemu م), bukan Ikhfa\' Syafawi!',
              },
            ],
          },
          {
            id: 'mim-wave-2',
            targetTitle: 'Tangkap Hanya Bacaan IDGHAM MIMI (مْ + م)!',
            targetRuleHint: 'Gelombang 2 · Idgham Mimi = Mim Sukun bertemu huruf Mim (م)',
            targetGoalCount: 4,
            items: [
              {
                id: 'mw2-1',
                arabic: 'لَهُمْ مَغْفِرَةٌ',
                label: 'Al-Mulk: 12',
                isTarget: true,
                feedback: 'Tepat! لَهُمْ مَغْفِرَةٌ adalah Idgham Mimi (مْ bertemu م, melebur & dengung).',
              },
              {
                id: 'mw2-2',
                arabic: 'عَلَيْهِمْ مُؤْصَدَةٌ',
                label: 'Al-Humazah: 8',
                isTarget: true,
                feedback: 'Benar! عَلَيْهِمْ مُؤْصَدَةٌ adalah Idgham Mimi (مْ bertemu م).',
              },
              {
                id: 'mw2-3',
                arabic: 'كَمْ مِنْ فِئَةٍ',
                label: 'Al-Baqarah: 249',
                isTarget: true,
                feedback: 'Hebat! كَمْ مِنْ adalah Idgham Mimi (مْ bertemu م).',
              },
              {
                id: 'mw2-4',
                arabic: 'بِهِمْ يَوْمَئِذٍ',
                label: "Al-'Ādiyāt: 11",
                isTarget: false,
                feedback: 'بِهِمْ يَوْمَئِذٍ adalah Izhar Syafawi (مْ bertemu ي), dibaca jelas tanpa dengung!',
              },
              {
                id: 'mw2-5',
                arabic: 'رَبَّهُمْ بِهِمْ',
                label: "Al-'Ādiyāt: 11",
                isTarget: false,
                feedback: "رَبَّهُمْ بِهِمْ adalah Ikhfa' Syafawi (مْ bertemu ب), bukan Idgham Mimi!",
              },
            ],
          },
        ],
      },
      {
        id: 'mim-m2',
        islandId: 'mim-sukun',
        order: 2,
        title: 'Detektif Tajwid Ayat Pilihan',
        shortSubtitle: 'Misi Detektif Tajwid',
        type: 'TAJWID_DETECTIVE',
        xpReward: 125,
        estimatedMinutes: 4,
        briefing:
          'Buka kaca pembesar tajwidmu! Ketuk pasangan kata yang mengandung Mim Sukun pada potongan ayat asli, lalu tentukan nama hukum bacaannya.',
        detectiveQuestions: [
          {
            id: 'mim-det-1',
            mode: 'TAJWID_TWO_STEP',
            instruction: "Langkah 1: Ketuk kata pertama yang berakhiran Mim Sukun bertemu Ba (ب) pada ayat Al-'Ādiyāt ini!",
            referenceLabel: "QS. Al-'Ādiyāt: 11",
            verseTokens: [
              { id: 't1', arabic: 'إِنَّ' },
              { id: 't2', arabic: 'رَبَّهُمْ بِهِمْ' },
              { id: 't3', arabic: 'يَوْمَئِذٍ' },
              { id: 't4', arabic: 'لَخَبِيرٌ' },
            ],
            targetTokenIds: ['t2'],
            choices: [
              { id: 'ikhfa', label: "Ikhfa' Syafawi", sublabel: 'مْ + ب (Samar & Dengung)' },
              { id: 'idgham', label: 'Idgham Mimi', sublabel: 'مْ + م (Melebur & Dengung)' },
              { id: 'izhar', label: 'Izhar Syafawi', sublabel: 'مْ + selain م/ب (Jelas)' },
            ],
            correctChoiceId: 'ikhfa',
            explanation:
              "Tepat! Pada رَبَّهُمْ بِهِمْ, huruf Mim Sukun (مْ) bertemu huruf Ba (ب), maka hukum bacaannya adalah Ikhfa' Syafawi (dibaca samar di bibir dengan dengung 2 harakat).",
          },
          {
            id: 'mim-det-2',
            mode: 'TAJWID_TWO_STEP',
            instruction: 'Langkah 1: Ketuk pasangan kata yang mengandung hukum Mim Sukun pada ayat Surah At-Tīn ini!',
            referenceLabel: 'QS. At-Tīn: 6',
            verseTokens: [
              { id: 't1', arabic: 'إِلَّا الَّذِينَ آمَنُوا' },
              { id: 't2', arabic: 'وَعَمِلُوا الصَّالِحَاتِ' },
              { id: 't3', arabic: 'فَلَهُمْ أَجْرٌ' },
              { id: 't4', arabic: 'غَيْرُ مَمْنُونٍ' },
            ],
            targetTokenIds: ['t3'],
            choices: [
              { id: 'ikhfa', label: "Ikhfa' Syafawi", sublabel: 'مْ + ب' },
              { id: 'idgham', label: 'Idgham Mimi', sublabel: 'مْ + م' },
              { id: 'izhar', label: 'Izhar Syafawi', sublabel: 'مْ + أ (Jelas tanpa dengung)' },
            ],
            correctChoiceId: 'izhar',
            explanation:
              'Benar sekali! Pada فَلَهُمْ أَجْرٌ, Mim Sukun (مْ) bertemu Hamzah (أ) yang bukan Mim atau Ba, sehingga dibaca jelas (Izhar Syafawi).',
          },
          {
            id: 'mim-det-3',
            mode: 'TAJWID_TWO_STEP',
            instruction: 'Langkah 1: Ketuk pasangan kata yang mengandung Mim Sukun bertemu Mim (م) pada ayat ini!',
            referenceLabel: 'QS. Al-Humazah: 8',
            verseTokens: [
              { id: 't1', arabic: 'إِنَّهَا' },
              { id: 't2', arabic: 'عَلَيْهِمْ مُؤْصَدَةٌ' },
            ],
            targetTokenIds: ['t2'],
            choices: [
              { id: 'ikhfa', label: "Ikhfa' Syafawi", sublabel: 'مْ + ب' },
              { id: 'idgham', label: 'Idgham Mimi', sublabel: 'مْ + م (Melebur & Dengung)' },
              { id: 'izhar', label: 'Izhar Syafawi', sublabel: 'مْ + selain م/ب' },
            ],
            correctChoiceId: 'idgham',
            explanation:
              'Mantap! Pada عَلَيْهِمْ مُؤْصَدَةٌ, Mim Sukun (مْ) bertemu huruf Mim (م), maka dibaca melebur berdengung (Idgham Mimi / Mutamatsilain).',
          },
          {
            id: 'mim-det-4',
            mode: 'TAJWID_TWO_STEP',
            instruction: 'Langkah 1: Ketuk pasangan kata yang mengandung Mim Sukun pada potongan ayat QS. Al-Fīl ini!',
            referenceLabel: 'QS. Al-Fīl: 4',
            verseTokens: [
              { id: 't1', arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ' },
              { id: 't2', arabic: 'مِنْ سِجِّيلٍ' },
            ],
            targetTokenIds: ['t1'],
            choices: [
              { id: 'ikhfa', label: "Ikhfa' Syafawi", sublabel: 'مْ + ب (Samar & Dengung)' },
              { id: 'idgham', label: 'Idgham Mimi', sublabel: 'مْ + م' },
              { id: 'izhar', label: 'Izhar Syafawi', sublabel: 'مْ + selain م/ب' },
            ],
            correctChoiceId: 'ikhfa',
            explanation:
              "Luar biasa! Pada تَرْمِيهِمْ بِحِجَارَةٍ, Mim Sukun (مْ) bertemu Ba (ب), maka hukumnya adalah Ikhfa' Syafawi.",
          },
        ],
      },
      {
        id: 'mim-m3',
        islandId: 'mim-sukun',
        order: 3,
        title: 'Latihan Tartil di Musala',
        shortSubtitle: 'Studi Kasus Tajwid',
        type: 'STORY_CASE',
        xpReward: 110,
        estimatedMinutes: 3,
        briefing:
          'Bantu teman-temanmu di musala MIN 3 Nganjuk memperbaiki bacaan Al-Qur\'an agar sesuai hukum Mim Sukun!',
        storyScenes: [
          {
            id: 'tajwid-story-1',
            sceneIllustration: 'sinai-scroll',
            chapterTag: 'Praktik Tajwid · Tadarus Pagi',
            characterName: 'Salma & Dimas',
            narration:
              "Saat tadarus pagi sebelum pelajaran, Dimas membaca QS. Al-'Ādiyāt ayat 11: إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ dengan cepat tanpa mendengungkan 'rabbahum bihim'.",
            dialogue:
              '"Eh, kenapa ya tadi ustaz bilang bacaan رَبَّهُمْ بِهِمْ milikku kurang pas?"',
            question: 'Saran terbaik yang kamu berikan kepada Dimas adalah...',
            choices: [
              {
                id: 'wise-t1',
                text: "Menjelaskan bahwa رَبَّهُمْ بِهِمْ adalah Ikhfa' Syafawi (مْ + ب), jadi dibaca samar di bibir dengan dengung 2 harakat",
                isWise: true,
                pancaCintaTag: 'Cinta Ilmu & Cinta Al-Qur\'an',
                outcomeTitle: 'Bacaan Jadi Merdu & Tartil!',
                outcomeText:
                  'Dimas mengulang bacaannya dengan lembut dan berdengung 2 harakat. Ia senang bisa mempraktikkan tajwid dengan benar!',
                dalilNote:
                  'Capaian Pembelajaran Tajwid Kelas 5 MI: Menerapkan hukum bacaan mim sukun dalam praktik membaca Al-Qur\'an dengan baik dan benar.',
              },
              {
                id: 'unwise-t1',
                text: 'Menyuruhnya membaca secepat mungkin tanpa memperhatikan harakat sukun',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Membaca Al-Qur\'an Harus Tartil',
                outcomeText:
                  'Membaca terburu-buru membuat hukum tajwid terlewat. Allah memerintahkan kita membaca Al-Qur\'an dengan tartil (pelan dan benar).',
                dalilNote:
                  "Ingat 3 hukum Mim Sukun: Ikhfa' Syafawi (ب), Idgham Mimi (م), dan Izhar Syafawi (26 huruf lainnya).",
              },
            ],
          },
          {
            id: 'tajwid-story-2',
            sceneIllustration: 'fauzi-school',
            chapterTag: 'Praktik Tajwid · Membedakan Izhar & Idgham',
            characterName: 'Dimas',
            narration:
              'Selanjutnya Dimas bertemu dua lafal: (1) فَلَهُمْ أَجْرٌ dan (2) لَهُمْ مَغْفِرَةٌ. Ia bingung mana yang harus dibaca jelas tanpa dengung.',
            dialogue:
              '"Tolong bantu aku membedakan cara membaca dua lafal ini ya!"',
            question: 'Penjelasan manakah yang 100% tepat untuk Dimas?',
            choices: [
              {
                id: 'wise-t2',
                text: 'فَلَهُمْ أَجْرٌ dibaca jelas (Izhar Syafawi), sedangkan لَهُمْ مَغْفِرَةٌ melebur berdengung (Idgham Mimi)',
                isWise: true,
                pancaCintaTag: 'Cinta Ilmu',
                outcomeTitle: 'Detektif Tajwid Sejati!',
                outcomeText:
                  'Dimas langsung paham perbedaannya! Bertemu Hamzah (أ) dibaca jelas, bertemu Mim (م) dilebur dengan dengung.',
                dalilNote:
                  'Izhar Syafawi dibaca jelas tanpa dengung; Idgham Mimi melebur dengan dengung 2 harakat.',
              },
              {
                id: 'unwise-t2',
                text: 'Keduanya dibaca sama-sama berdengung panjang 5 harakat',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Hampir, Cek Lagi Huruf Setelah Mim Sukun!',
                outcomeText:
                  'Hanya Mim Sukun bertemu Mim (Idgham Mimi) atau Ba (Ikhfa\' Syafawi) yang berdengung 2 harakat. Jika bertemu huruf lain seperti Hamzah, dibaca jelas!',
                dalilNote:
                  'Perhatikan selalu huruf hijaiyah tepat setelah Mim Sukun (مْ).',
              },
            ],
          },
        ],
      },
      {
        id: 'mim-boss',
        islandId: 'mim-sukun',
        order: 4,
        title: 'Boss: Teka-Teki Salah Baca',
        shortSubtitle: 'Boss Battle Bab 2',
        type: 'BOSS_BATTLE',
        xpReward: 180,
        estimatedMinutes: 4,
        briefing:
          'Kalahkan Penjaga Menara Tajwid dengan ketepatan analisismu atas 3 hukum Mim Sukun!',
        bossConfig: {
          bossName: 'Teka-Teki Salah Baca',
          bossTitle: 'Penjaga Menara Tartil',
          bossVisualId: 'salah-baca',
          introQuote:
            '"Jangan sampai terkecoh huruf hijaiyah! Tunjukkan ketelitianmu sebagai Detektif Mim Sukun!"',
          defeatQuote:
            '"Sempurna! Tidak ada satu pun hukum Mim Sukun yang terlewat dari matamu!"',
          questions: [
            {
              id: 'b3-q1',
              prompt: 'Hukum bacaan Mim Sukun (مْ) terbagi menjadi berapa macam?',
              options: [
                { id: 'a', text: '2 macam' },
                { id: 'b', text: "3 macam (Ikhfa' Syafawi, Idgham Mimi, Izhar Syafawi)" },
                { id: 'c', text: '4 macam' },
                { id: 'd', text: '5 macam' },
              ],
              correctOptionId: 'b',
              explanation:
                "Hukum bacaan Mim Sukun ada 3 macam: Ikhfa' Syafawi (ب), Idgham Mimi (م), dan Izhar Syafawi (26 huruf lainnya).",
              hint: 'Ingat 3 kelompok huruf: Ba, Mim, dan 26 huruf sisanya.',
            },
            {
              id: 'b3-q2',
              prompt: 'Perhatikan lafal berikut! Hukum bacaan Mim Sukun yang terdapat di dalamnya adalah....',
              arabicSnippet: 'وَلَكُمْ مَا كَسَبْتُمْ',
              options: [
                { id: 'a', text: "Ikhfa' Syafawi" },
                { id: 'b', text: 'Idgham Mimi (Mutamatsilain)' },
                { id: 'c', text: 'Izhar Syafawi' },
                { id: 'd', text: 'Qalqalah Kubra' },
              ],
              correctOptionId: 'b',
              explanation:
                'Pada وَلَكُمْ مَا, huruf Mim Sukun (مْ) bertemu dengan huruf Mim (م), sehingga hukum bacaannya adalah Idgham Mimi.',
              hint: 'Lihat huruf tepat setelah وَلَكُمْ!',
            },
            {
              id: 'b3-q3',
              prompt: 'Mengapa hukum bacaan pada lafal بِهِمْ يَوْمَئِذٍ disebut Izhar Syafawi?',
              arabicSnippet: 'بِهِمْ يَوْمَئِذٍ',
              options: [
                { id: 'a', text: 'Karena Mim Sukun bertemu huruf Ba' },
                { id: 'b', text: 'Karena Mim Sukun bertemu huruf Mim' },
                { id: 'c', text: 'Karena Mim Sukun bertemu huruf Ya (selain Mim dan Ba)' },
                { id: 'd', text: 'Karena berada di akhir ayat' },
              ],
              correctOptionId: 'c',
              explanation:
                'Huruf Ya (ي) termasuk 26 huruf Izhar Syafawi (selain Mim dan Ba), sehingga Mim Sukun dibaca jelas di bibir.',
              hint: 'Apakah huruf ي termasuk huruf Mim atau Ba?',
            },
            {
              id: 'b3-q4',
              prompt: "Manakah di antara potongan ayat berikut yang mengandung hukum Ikhfa' Syafawi?",
              options: [
                { id: 'a', text: 'Falahum ajrun', arabic: 'فَلَهُمْ أَجْرٌ' },
                { id: 'b', text: 'Rabbahum bihim', arabic: 'رَبَّهُمْ بِهِمْ' },
                { id: 'c', text: "'Alaihim mu'ṣadah", arabic: 'عَلَيْهِمْ مُؤْصَدَةٌ' },
                { id: 'd', text: 'Alam nasyraḥ', arabic: 'أَلَمْ نَشْرَحْ' },
              ],
              correctOptionId: 'b',
              explanation:
                "Ikhfa' Syafawi terjadi ketika Mim Sukun bertemu huruf Ba (ب), seperti pada رَبَّهُمْ بِهِمْ (QS. Al-'Ādiyāt: 11).",
              hint: 'Cari Mim Sukun (مْ) yang diikuti huruf ب!',
            },
          ],
        },
      },
    ],
  },

  /* =========================================================
     PULAU 4: BAB 3 — HADIS MENYAYANGI ANAK YATIM
     ========================================================= */
  {
    id: 'hadis-yatim',
    number: 4,
    babLabel: 'Bab 3',
    name: 'Taman Kasih Sayang',
    topicTitle: 'Hadis Menyayangi Anak Yatim',
    description:
      'Hafalkan dan pahami Hadis Riwayat Bukhari tentang keutamaan menyayangi anak yatim yang kedudukannya sangat dekat dengan Rasulullah saw. di surga.',
    accentHex: '#7C3AED',
    softBg: '#F3E8FF',
    mapX: 78,
    mapY: 32,
    badgeId: 'badge-yatim',
    missions: [
      {
        id: 'yatim-m1',
        islandId: 'hadis-yatim',
        order: 1,
        title: 'Susun Hadis Anak Yatim',
        shortSubtitle: 'Mini-Game Susun Hadis',
        type: 'AYAT_SEQUENCER',
        xpReward: 105,
        estimatedMinutes: 3,
        briefing:
          'Susun potongan matan Hadis Riwayat Bukhari tentang menyayangi anak yatim dari kanan ke kiri (RTL)!',
        sequencerRounds: [
          {
            id: 'yt-seq-1',
            prompt: 'Susun matan utama Hadis tentang menyayangi anak yatim:',
            referenceLabel: 'HR. Bukhari dari Sahl bin Sa\'ad r.a.',
            translation: 'Aku dan orang yang menanggung (menyayangi) anak yatim di surga seperti ini.',
            explanation:
              'Rasulullah saw. menjanjikan kedudukan sangat dekat dengan beliau di surga bagi orang yang menyayangi dan mengurus anak yatim.',
            chunks: ['أَنَا', 'وَكَافِلُ', 'الْيَتِيمِ', 'فِي الْجَنَّةِ', 'هَكَذَا'],
            isArabic: true,
          },
          {
            id: 'yt-seq-2',
            prompt: 'Susun lanjutan hadis tentang isyarat jari Rasulullah saw.:',
            referenceLabel: 'HR. Bukhari (Lanjutan Matan)',
            translation: 'Dan beliau mengisyaratkan dengan jari telunjuk dan jari tengah serta merenggangkan keduanya sedikit.',
            explanation:
              'Isyarat jari telunjuk (السَّبَّابَةِ) dan jari tengah (الْوُسْطَى) melambangkan betapa dekatnya posisi penyayang anak yatim dengan Nabi saw. di surga.',
            chunks: ['وَأَشَارَ', 'بِالسَّبَّابَةِ', 'وَالْوُسْطَى', 'وَفَرَّجَ بَيْنَهُمَا', 'شَيْئًا'],
            isArabic: true,
          },
          {
            id: 'yt-seq-3',
            prompt: 'Susun urutan terjemahan hadis secara utuh:',
            referenceLabel: 'Terjemahan HR. Bukhari',
            translation: 'Aku dan orang yang menanggung anak yatim di surga seperti ini (bagaikan jari telunjuk dan jari tengah).',
            explanation:
              'Memahami arti hadis membantu kita mengamalkan kasih sayang kepada anak yatim setiap hari.',
            chunks: ['Aku dan orang yang', 'menanggung anak yatim', 'di dalam surga', 'kedudukannya seperti ini'],
            isArabic: false,
          },
        ],
      },
      {
        id: 'yatim-m2',
        islandId: 'hadis-yatim',
        order: 2,
        title: 'Kartu Memori Kosakata Hadis',
        shortSubtitle: 'Mini-Game Kartu Memori 3D',
        type: 'MEMORY_MATCH',
        xpReward: 120,
        estimatedMinutes: 3,
        briefing:
          'Buka dan pasangkan 6 kartu kosakata Hadis Riwayat Bukhari tentang menyayangi anak yatim dengan artinya yang tepat!',
        memoryPairs: [
          {
            id: 'mp-yt-1',
            arabic: 'كَافِلُ',
            meaning: 'Orang yang menanggung / mengurus',
            note: 'كَافِلُ (kāfilu) berarti orang yang memelihara, mencukupi, dan menyayangi anak yatim.',
          },
          {
            id: 'mp-yt-2',
            arabic: 'الْيَتِيمِ',
            meaning: 'Anak yang ditinggal wafat ayahnya',
            note: 'Anak yatim adalah anak yang ditinggal wafat ayahnya sebelum usia balig.',
          },
          {
            id: 'mp-yt-3',
            arabic: 'فِي الْجَنَّةِ',
            meaning: 'Di dalam surga',
            note: 'Balasan bagi penyayang anak yatim adalah kedudukan mulia di dalam surga.',
          },
          {
            id: 'mp-yt-4',
            arabic: 'هَكَذَا',
            meaning: 'Seperti ini (sangat dekat)',
            note: 'Rasulullah saw. mengisyaratkan betapa dekatnya posisi penyayang yatim bersama beliau.',
          },
          {
            id: 'mp-yt-5',
            arabic: 'السَّبَّابَةِ',
            meaning: 'Jari telunjuk',
            note: 'السَّبَّابَةِ adalah jari telunjuk yang diisyaratkan Rasulullah saw. bersama jari tengah.',
          },
          {
            id: 'mp-yt-6',
            arabic: 'الْوُسْطَى',
            meaning: 'Jari tengah',
            note: 'الْوُسْطَى berarti jari tengah — jaraknya amat dekat dengan jari telunjuk!',
          },
        ],
      },
      {
        id: 'yatim-m3',
        islandId: 'hadis-yatim',
        order: 3,
        title: 'Kisah Sahabat di Madrasah',
        shortSubtitle: 'Studi Kasus Kehidupan',
        type: 'STORY_CASE',
        xpReward: 120,
        estimatedMinutes: 3,
        briefing:
          'Wujudkan nilai Panca Cinta ke-4 (Cinta Diri dan Sesama Manusia) saat berinteraksi dengan teman yatim di madrasah.',
        storyScenes: [
          {
            id: 'yatim-story-1',
            sceneIllustration: 'orphan-friend',
            chapterTag: 'Penerapan Bab 3 · Panca Cinta ke-4',
            characterName: 'Arif & Farhan',
            narration:
              'Di kelas 5 MI ada murid pindahan bernama Farhan yang baru saja ditinggal wafat ayahnya. Saat istirahat, Farhan duduk sendirian karena belum punya teman dan lupa membawa buku tulis.',
            dialogue:
              '"Aku belum kenal siapa-siapa di sini, dan buku catatanku tertinggal di rumah..."',
            question: 'Sebagai pelajar MI yang meneladani Hadis Menyayangi Anak Yatim, sikapmu adalah...',
            choices: [
              {
                id: 'wise-y1',
                text: 'Menyapa Farhan dengan ramah, mengajaknya berteman, dan meminjamkan buku tulis cadangan tanpa merendahkannya',
                isWise: true,
                pancaCintaTag: 'Cinta Diri & Sesama Manusia',
                outcomeTitle: 'Persahabatan Penuh Berkah!',
                outcomeText:
                  'Wajah Farhan langsung berseri-seri! Memuliakan dan menggembirakan hati anak yatim mendatangkan rahmat Allah dan kedekatan dengan Rasulullah saw.',
                dalilNote:
                  'HR. Bukhari: Menyayangi anak yatim dengan tulus dan penuh penghargaan menjadikan kita dekat dengan Nabi saw. di surga.',
              },
              {
                id: 'unwise-y1',
                text: 'Membiarkannya sendirian atau mengejeknya karena belum punya teman',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Jangan Pernah Menyakiti Anak Yatim!',
                outcomeText:
                  'Islam sangat melarang menghardik, mengejek, atau membiarkan anak yatim bersedih. Mari rangkul mereka dengan kasih sayang.',
                dalilNote:
                  'Menyayangi anak yatim bukan hanya memberi materi, tetapi juga menemani, menghibur, dan menghormatinya.',
              },
            ],
          },
          {
            id: 'yatim-story-2',
            sceneIllustration: 'fauzi-school',
            chapterTag: 'Penerapan Bab 3 · Santunan Jumat',
            characterName: 'Pengurus Kelas 5 MI',
            narration:
              'Madrasah mengadakan program "Jumat Berbagi untuk Anak Yatim". Kamu masih punya uang saku jajan lebih di sakumu.',
            dialogue:
              '"Teman-teman, mari kita sisihkan sebagian uang saku kita dengan ikhlas untuk program santunan yatim!"',
            question: 'Sikap terbaik yang mencerminkan kandungan Bab 1 dan Bab 3 sekaligus adalah...',
            choices: [
              {
                id: 'wise-y2',
                text: 'Menyisihkan sebagian uang saku dengan ikhlas, tidak pamer, dan mendoakan kebaikan bagi anak yatim',
                isWise: true,
                pancaCintaTag: 'Cinta Allah & Cinta Sesama',
                outcomeTitle: 'Akhlak Penjaga Hikmah!',
                outcomeText:
                  'Kamu berhasil menghindari sifat kikir (Bab 1) sekaligus mengamalkan kasih sayang pada anak yatim (Bab 3) dengan hati ikhlas.',
                dalilNote:
                  'Bersedekah untuk anak yatim dengan ikhlas melatih rasa syukur sekaligus mewujudkan amal saleh yang pahalanya tiada putus.',
              },
              {
                id: 'unwise-y2',
                text: 'Menyumbang hanya supaya dipuji teman-teman dan guru di depan kelas',
                isWise: false,
                pancaCintaTag: 'Perlu Refleksi',
                outcomeTitle: 'Luruskan Niat Karena Allah',
                outcomeText:
                  'Ingat Surah Al-\'Ādiyāt ayat 10–11: Allah Maha Mengetahui apa yang tersimpan di dalam dada. Berbagi harus dilakukan dengan ikhlas.',
                dalilNote:
                  'Amal saleh diterima Allah Swt. apabila dilandasi iman dan keikhlasan hati.',
              },
            ],
          },
        ],
      },
      {
        id: 'yatim-boss',
        islandId: 'hadis-yatim',
        order: 4,
        title: 'Boss Agung: Ujian Penjaga Hikmah',
        shortSubtitle: 'Final Boss Ekspedisi',
        type: 'BOSS_BATTLE',
        xpReward: 220,
        estimatedMinutes: 4,
        briefing:
          'Ujian terakhir sebelum meraih Sertifikat Kelulusan! Taklukkan Boss Agung untuk membuktikan penguasaan Hadis Anak Yatim & Panca Cinta.',
        bossConfig: {
          bossName: 'Tantangan Kurang Empati',
          bossTitle: 'Penjaga Agung Taman Kasih Sayang',
          bossVisualId: 'kurang-empati',
          introQuote:
            '"Inilah ujian puncak Ekspedisi Penjaga Hikmah! Buktikan kasih sayang dan ilmumu tentang Hadis Anak Yatim!"',
          defeatQuote:
            '"Selamat, Penjaga Hikmah! Hati yang berilmu dan penyayang selalu menang. Sertifikat Kelulusanmu telah terbuka!"',
          questions: [
            {
              id: 'b4-q1',
              prompt: 'Siapakah yang dimaksud dengan anak yatim menurut ajaran Islam?',
              options: [
                { id: 'a', text: 'Anak yang sudah dewasa dan bekerja sendiri' },
                { id: 'b', text: 'Anak yang ditinggal wafat ayahnya sebelum usia balig' },
                { id: 'c', text: 'Anak yang sedang merantau jauh dari rumah' },
                { id: 'd', text: 'Anak yang baru masuk sekolah dasar' },
              ],
              correctOptionId: 'b',
              explanation:
                'Anak yatim adalah anak yang ditinggal wafat oleh ayahnya sebelum ia mencapai usia balig.',
              hint: 'Ingat batasan usia sebelum balig dan orang tua yang wafat.',
            },
            {
              id: 'b4-q2',
              prompt: 'Hadis tentang kedekatan penyayang anak yatim dengan Rasulullah saw. di surga diriwayatkan oleh....',
              arabicSnippet: 'أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا',
              options: [
                { id: 'a', text: 'Imam Bukhari (dari sahabat Sahl bin Sa\'ad r.a.)' },
                { id: 'b', text: 'Imam Malik saja' },
                { id: 'c', text: 'Ibnu Majah saja' },
                { id: 'd', text: 'Abu Dawud saja' },
              ],
              correctOptionId: 'a',
              explanation:
                'Hadis sahih tersebut diriwayatkan oleh Imam Bukhari dari sahabat Sahl bin Sa\'ad r.a.',
              hint: 'Perawi hadis sahih paling masyhur (HR. B...).',
            },
            {
              id: 'b4-q3',
              prompt: 'Dalam hadis menyayangi anak yatim, Rasulullah saw. mengisyaratkan kedekatan di surga dengan dua jari, yaitu....',
              options: [
                { id: 'a', text: 'Ibu jari dan jari kelingking' },
                { id: 'b', text: 'Jari manis dan jari kelingking' },
                { id: 'c', text: 'Jari telunjuk dan jari tengah' },
                { id: 'd', text: 'Ibu jari dan jari tengah' },
              ],
              correctOptionId: 'c',
              explanation:
                'Beliau mengisyaratkan dengan jari telunjuk (السَّبَّابَةِ) dan jari tengah (الْوُسْطَى) serta sedikit merenggangkan keduanya.',
              hint: 'Dua jari berdampingan: As-Sabbabah dan Al-Wustha.',
            },
            {
              id: 'b4-q4',
              prompt: 'Nilai Kurikulum Berbasis Cinta (Panca Cinta) yang paling erat dengan sikap menyayangi anak yatim adalah....',
              options: [
                { id: 'a', text: 'Cinta Harta Benda Berlebihan' },
                { id: 'b', text: 'Cinta Diri dan Sesama Manusia' },
                { id: 'c', text: 'Sifat Kikir dan Egois' },
                { id: 'd', text: 'Menghindari Kerja Bakti' },
              ],
              correctOptionId: 'b',
              explanation:
                'Panca Cinta ke-4 adalah Cinta Diri dan Sesama Manusia — mengembangkan penghargaan dan kasih sayang kepada sesama, terutama anak yatim.',
              hint: 'Ingat 5 nilai Panca Cinta di halaman awal buku 5 QH!',
            },
          ],
        },
      },
    ],
  },
];

export const ALL_MISSIONS = ISLANDS.flatMap((island) => island.missions);

export function getMissionById(missionId: string) {
  return ALL_MISSIONS.find((m) => m.id === missionId);
}

export function getIslandById(islandId: string) {
  return ISLANDS.find((i) => i.id === islandId);
}
