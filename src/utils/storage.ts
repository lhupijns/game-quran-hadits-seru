import { ALL_MISSIONS, ISLANDS } from '../data/curriculum';
import {
  IslandId,
  LevelInfo,
  MissionResult,
  PlayerProgress,
  PowerUpId,
} from '../types/game';

const STORAGE_KEY = 'quran_hadits_seru_mi5_progress_v2';

export const POWERUP_CATALOG: {
  id: PowerUpId;
  name: string;
  cost: number;
  shortEffect: string;
  description: string;
}[] = [
  {
    id: 'shield',
    name: 'Perisai Cahaya',
    cost: 60,
    shortEffect: 'Tahan 1 salah',
    description: 'Melindungi nyawamu dari 1 kesalahan pertama di dalam misi agar tetap 3 Bintang!',
  },
  {
    id: 'insight',
    name: 'Lentera Hikmah',
    cost: 45,
    shortEffect: 'Buka petunjuk super',
    description: 'Mengintip kartu memori sejenak, menyorot potongan ayat, atau memangkas opsi salah Boss!',
  },
  {
    id: 'doubleXp',
    name: 'Ramuan XP 2x',
    cost: 80,
    shortEffect: 'Gandakan XP misi',
    description: 'Menggandakan seluruh XP yang kamu peroleh saat menyelesaikan misi berikutnya!',
  },
];

export const DEFAULT_PROGRESS: PlayerProgress = {
  playerName: 'Penjelajah MI',
  avatarId: 'raka',
  xp: 0,
  coins: 75, // Starting coins so kids can immediately try buying/using a Power-Up!
  inventory: {
    shield: 1,
    insight: 1,
    doubleXp: 0,
  },
  claimedChests: [],
  completedMissions: {},
  unlockedBadges: [],
  bestComboOverall: 0,
  soundMuted: false,
  classroomFreeMode: false,
  hasStartedOnce: false,
};

export function loadProgress(): PlayerProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS, inventory: { ...DEFAULT_PROGRESS.inventory } };
    const parsed = JSON.parse(raw) as Partial<PlayerProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      inventory: {
        ...DEFAULT_PROGRESS.inventory,
        ...(parsed.inventory ?? {}),
      },
      claimedChests: Array.isArray(parsed.claimedChests) ? parsed.claimedChests : [],
      completedMissions: parsed.completedMissions ?? {},
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
    };
  } catch {
    return { ...DEFAULT_PROGRESS, inventory: { ...DEFAULT_PROGRESS.inventory } };
  }
}

export function saveProgress(progress: PlayerProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota / private-mode errors gracefully
  }
}

export function clearProgress(): PlayerProgress {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return { ...DEFAULT_PROGRESS, inventory: { ...DEFAULT_PROGRESS.inventory } };
}

const LEVEL_THRESHOLDS = [
  { level: 1, minXp: 0, title: 'Santri Penjelajah' },
  { level: 2, minXp: 250, title: 'Pencari Hikmah' },
  { level: 3, minXp: 600, title: 'Detektif Tajwid' },
  { level: 4, minXp: 1050, title: 'Sahabat Al-Qur\'an' },
  { level: 5, minXp: 1600, title: 'Penjaga Hikmah Utama' },
];

export function computeLevelInfo(xp: number): LevelInfo {
  let current = LEVEL_THRESHOLDS[0];
  let next = LEVEL_THRESHOLDS[1];

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].minXp) {
      current = LEVEL_THRESHOLDS[i];
      next = LEVEL_THRESHOLDS[i + 1] ?? {
        level: current.level,
        minXp: current.minXp + 500,
        title: current.title,
      };
    }
  }

  const span = Math.max(1, next.minXp - current.minXp);
  const progressInLevel = Math.max(0, xp - current.minXp);
  const progressPercent =
    current.level === LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].level
      ? 100
      : Math.min(100, Math.round((progressInLevel / span) * 100));

  return {
    level: current.level,
    title: current.title,
    currentLevelXp: progressInLevel,
    nextLevelXp: span,
    progressPercent,
  };
}

export function isIslandCompleted(progress: PlayerProgress, islandId: IslandId): boolean {
  const island = ISLANDS.find((i) => i.id === islandId);
  if (!island) return false;
  const bossMission = island.missions.find((m) => m.type === 'BOSS_BATTLE');
  return bossMission ? Boolean(progress.completedMissions[bossMission.id]) : false;
}

export function isIslandUnlocked(progress: PlayerProgress, islandId: IslandId): boolean {
  if (progress.classroomFreeMode) return true;
  const idx = ISLANDS.findIndex((i) => i.id === islandId);
  if (idx <= 0) return true;
  const prevIsland = ISLANDS[idx - 1];
  return isIslandCompleted(progress, prevIsland.id);
}

export function isMissionUnlocked(progress: PlayerProgress, missionId: string): boolean {
  if (progress.classroomFreeMode) return true;
  const mission = ALL_MISSIONS.find((m) => m.id === missionId);
  if (!mission) return false;
  if (!isIslandUnlocked(progress, mission.islandId)) return false;
  if (mission.order === 1) return true;

  const island = ISLANDS.find((i) => i.id === mission.islandId);
  const prevMission = island?.missions.find((m) => m.order === mission.order - 1);
  return prevMission ? Boolean(progress.completedMissions[prevMission.id]) : true;
}

export function getIslandStars(progress: PlayerProgress, islandId: IslandId): number {
  const island = ISLANDS.find((i) => i.id === islandId);
  if (!island) return 0;
  return island.missions.reduce(
    (sum, m) => sum + (progress.completedMissions[m.id]?.stars ?? 0),
    0
  );
}

export function canClaimIslandChest(progress: PlayerProgress, islandId: IslandId): boolean {
  if (progress.claimedChests.includes(islandId)) return false;
  return getIslandStars(progress, islandId) >= 6 || isIslandCompleted(progress, islandId);
}

export function countTotalStars(progress: PlayerProgress): number {
  return Object.values(progress.completedMissions).reduce((sum, m) => sum + m.stars, 0);
}

export function countConqueredIslands(progress: PlayerProgress): number {
  return ISLANDS.filter((isl) => isIslandCompleted(progress, isl.id)).length;
}

export function applyMissionCompletion(
  prev: PlayerProgress,
  result: MissionResult
): { updated: PlayerProgress; newlyUnlockedBadges: string[] } {
  const existing = prev.completedMissions[result.missionId];
  const bestStars = existing ? (Math.max(existing.stars, result.stars) as 1 | 2 | 3) : result.stars;
  const bestScore = existing ? Math.max(existing.bestScore, result.score) : result.score;
  const bestMissionCombo = existing
    ? Math.max(existing.maxCombo, result.maxCombo)
    : result.maxCombo;

  const xpGain = existing ? Math.round(result.earnedXp * 0.45) : result.earnedXp;
  const coinGain =
    result.earnedCoins ?? (existing ? 20 + result.stars * 5 : 40 + result.stars * 15);

  const nextCompleted = {
    ...prev.completedMissions,
    [result.missionId]: {
      stars: bestStars,
      bestScore,
      maxCombo: bestMissionCombo,
    },
  };

  const nextBestCombo = Math.max(prev.bestComboOverall, result.maxCombo);

  const draft: PlayerProgress = {
    ...prev,
    xp: prev.xp + xpGain,
    coins: prev.coins + coinGain,
    completedMissions: nextCompleted,
    bestComboOverall: nextBestCombo,
    hasStartedOnce: true,
  };

  const badgeSet = new Set<string>(prev.unlockedBadges);
  const newlyUnlockedBadges: string[] = [];

  const grantBadge = (id: string) => {
    if (!badgeSet.has(id)) {
      badgeSet.add(id);
      newlyUnlockedBadges.push(id);
    }
  };

  ISLANDS.forEach((isl) => {
    if (isIslandCompleted(draft, isl.id)) {
      grantBadge(isl.badgeId);
    }
  });

  if (nextBestCombo >= 5) {
    grantBadge('badge-kombo');
  }

  const detectiveDone = ALL_MISSIONS.filter(
    (m) => m.type === 'TAJWID_DETECTIVE' || m.type === 'ARCADE_CATCHER'
  ).every((m) => Boolean(nextCompleted[m.id]));
  if (detectiveDone) {
    grantBadge('badge-detektif');
  }

  const allStoryDone = ALL_MISSIONS.filter((m) => m.type === 'STORY_CASE').every((m) =>
    Boolean(nextCompleted[m.id])
  );
  if (allStoryDone) {
    grantBadge('badge-panca-cinta');
  }

  if (countConqueredIslands(draft) === ISLANDS.length) {
    grantBadge('badge-lulusan-terbaik');
  }

  return {
    updated: {
      ...draft,
      unlockedBadges: Array.from(badgeSet),
    },
    newlyUnlockedBadges,
  };
}
