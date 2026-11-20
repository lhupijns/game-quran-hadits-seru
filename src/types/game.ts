export type ScreenState = 'TITLE_MENU' | 'WORLD_MAP' | 'PLAYING_MISSION';

export type AvatarId = 'raka' | 'aisyah' | 'zaki' | 'hana';

export type MissionType =
  | 'AYAT_SEQUENCER'
  | 'TAJWID_DETECTIVE'
  | 'ARCADE_CATCHER'
  | 'MEMORY_MATCH'
  | 'STORY_CASE'
  | 'BOSS_BATTLE';

export type IslandId = 'al-adiyat' | 'at-tin' | 'mim-sukun' | 'hadis-yatim';

export type PowerUpId = 'shield' | 'insight' | 'doubleXp';

export interface PowerUpInventory {
  shield: number;
  insight: number;
  doubleXp: number;
}

export interface AvatarProfile {
  id: AvatarId;
  name: string;
  role: string;
  accentColor: string;
  bgTint: string;
}

/* 1. Ayat / Hadis Sequencer Mini-Game */
export interface SequencerRound {
  id: string;
  prompt: string;
  referenceLabel: string;
  translation: string;
  explanation: string;
  chunks: string[];
  isArabic: boolean;
}

/* 2. Tajwid & Lafal Detective Mini-Game */
export interface DetectiveToken {
  id: string;
  arabic: string;
  transliteration?: string;
}

export interface DetectiveQuestion {
  id: string;
  mode: 'TAJWID_TWO_STEP' | 'LAFAL_MATCH';
  instruction: string;
  referenceLabel: string;
  verseTokens: DetectiveToken[];
  targetTokenIds: string[];
  choices?: {
    id: string;
    label: string;
    arabic?: string;
    sublabel?: string;
  }[];
  correctChoiceId?: string;
  explanation: string;
}

/* 3. NEW: Real-Time Falling-Lantern Arcade Catcher Mini-Game */
export interface ArcadeWaveItem {
  id: string;
  arabic?: string;
  label: string;
  isTarget: boolean;
  feedback: string;
}

export interface ArcadeWave {
  id: string;
  targetTitle: string;
  targetRuleHint: string;
  targetGoalCount: number;
  items: ArcadeWaveItem[];
}

/* 4. NEW: 3D Flip-Card Memory Match Mini-Game */
export interface MemoryPair {
  id: string;
  arabic: string;
  meaning: string;
  note: string;
}

/* 5. Interactive Daily-Life Story Case Study */
export interface StoryChoice {
  id: string;
  text: string;
  isWise: boolean;
  pancaCintaTag: string;
  outcomeTitle: string;
  outcomeText: string;
  dalilNote: string;
}

export interface StoryScene {
  id: string;
  sceneIllustration: 'fauzi-school' | 'neighbor-help' | 'sinai-scroll' | 'orphan-friend';
  chapterTag: string;
  characterName: string;
  narration: string;
  dialogue: string;
  question: string;
  choices: StoryChoice[];
}

/* 6. Boss Battle Mini-Game */
export interface BossQuestion {
  id: string;
  prompt: string;
  arabicSnippet?: string;
  options: {
    id: string;
    text: string;
    arabic?: string;
  }[];
  correctOptionId: string;
  explanation: string;
  hint: string;
}

export interface BossConfig {
  bossName: string;
  bossTitle: string;
  bossVisualId: 'kufur-nikmat' | 'kelalaian' | 'salah-baca' | 'kurang-empati';
  introQuote: string;
  defeatQuote: string;
  questions: BossQuestion[];
}

export interface Mission {
  id: string;
  islandId: IslandId;
  order: number;
  title: string;
  shortSubtitle: string;
  type: MissionType;
  xpReward: number;
  coinReward?: number;
  estimatedMinutes: number;
  briefing: string;
  sequencerRounds?: SequencerRound[];
  detectiveQuestions?: DetectiveQuestion[];
  arcadeWaves?: ArcadeWave[];
  memoryPairs?: MemoryPair[];
  storyScenes?: StoryScene[];
  bossConfig?: BossConfig;
}

export interface Island {
  id: IslandId;
  number: number;
  babLabel: string;
  name: string;
  topicTitle: string;
  description: string;
  accentHex: string;
  softBg: string;
  mapX: number;
  mapY: number;
  badgeId: string;
  missions: Mission[];
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  islandId?: IslandId;
  accentHex: string;
}

export interface MissionResult {
  missionId: string;
  stars: 1 | 2 | 3;
  score: number;
  maxScore: number;
  maxCombo: number;
  earnedXp: number;
  earnedCoins?: number;
  mistakes: number;
}

export interface PlayerProgress {
  playerName: string;
  avatarId: AvatarId;
  xp: number;
  coins: number;
  inventory: PowerUpInventory;
  claimedChests: IslandId[];
  completedMissions: Record<string, { stars: 1 | 2 | 3; bestScore: number; maxCombo: number }>;
  unlockedBadges: string[];
  bestComboOverall: number;
  soundMuted: boolean;
  classroomFreeMode: boolean;
  hasStartedOnce: boolean;
}

export interface LevelInfo {
  level: number;
  title: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export interface LibraryVerse {
  number: number;
  arabic: string;
  translation: string;
}
