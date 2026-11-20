import { useEffect, useState } from 'react';
import { MissionRunner } from './components/MissionRunner';
import {
  AboutModal,
  BadgesModal,
  CertificateModal,
  LibraryModal,
  ShopModal,
} from './components/Modals';
import { TitleScreen } from './components/TitleScreen';
import { WorldMap } from './components/WorldMap';
import {
  AvatarId,
  IslandId,
  Mission,
  MissionResult,
  PlayerProgress,
  PowerUpId,
  ScreenState,
} from './types/game';
import { soundFX } from './utils/sound';
import {
  POWERUP_CATALOG,
  applyMissionCompletion,
  canClaimIslandChest,
  clearProgress,
  loadProgress,
  saveProgress,
} from './utils/storage';

type ActiveModal = 'NONE' | 'LIBRARY' | 'BADGES' | 'CERTIFICATE' | 'ABOUT' | 'SHOP';

export default function App() {
  const [progress, setProgress] = useState<PlayerProgress>(() => {
    const loaded = loadProgress();
    soundFX.setMuted(loaded.soundMuted);
    return loaded;
  });

  const [screen, setScreen] = useState<ScreenState>('TITLE_MENU');
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [modal, setModal] = useState<ActiveModal>('NONE');

  useEffect(() => {
    saveProgress(progress);
    soundFX.setMuted(progress.soundMuted);
  }, [progress]);

  useEffect(() => {
    if (modal === 'NONE') return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playClick();
        setModal('NONE');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modal]);

  const handleUpdateProfile = (playerName: string, avatarId: AvatarId) => {
    setProgress((prev) => ({ ...prev, playerName, avatarId }));
  };

  const handleStartGame = () => {
    setProgress((prev) => ({
      ...prev,
      playerName: prev.playerName.trim() || 'Penjelajah MI',
      hasStartedOnce: true,
    }));
    setScreen('WORLD_MAP');
  };

  const handleToggleMute = () => {
    setProgress((prev) => {
      const nextMuted = !prev.soundMuted;
      soundFX.setMuted(nextMuted);
      if (!nextMuted) {
        soundFX.playClick();
      }
      return { ...prev, soundMuted: nextMuted };
    });
  };

  const handleToggleFreeMode = () => {
    setProgress((prev) => ({
      ...prev,
      classroomFreeMode: !prev.classroomFreeMode,
    }));
  };

  const handleSelectMission = (mission: Mission) => {
    setActiveMission(mission);
    setScreen('PLAYING_MISSION');
  };

  const handleBuyPowerUp = (id: PowerUpId) => {
    const item = POWERUP_CATALOG.find((p) => p.id === id);
    if (!item || progress.coins < item.cost) return;
    soundFX.playCorrect(2);
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - item.cost,
      inventory: {
        ...prev.inventory,
        [id]: prev.inventory[id] + 1,
      },
    }));
  };

  const handleConsumePowerUp = (id: PowerUpId) => {
    setProgress((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [id]: Math.max(0, prev.inventory[id] - 1),
      },
    }));
  };

  const handleClaimChest = (islandId: IslandId) => {
    if (!canClaimIslandChest(progress, islandId)) return;
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins + 100,
      claimedChests: [...prev.claimedChests, islandId],
      inventory: {
        ...prev.inventory,
        shield: prev.inventory.shield + 1,
      },
    }));
  };

  const handleCompleteMission = (result: MissionResult): string[] => {
    const { updated, newlyUnlockedBadges } = applyMissionCompletion(progress, result);
    setProgress(updated);
    return newlyUnlockedBadges;
  };

  const handleResetProgress = () => {
    const fresh = clearProgress();
    setProgress(fresh);
    setActiveMission(null);
    setModal('NONE');
    setScreen('TITLE_MENU');
  };

  return (
    <div className="min-h-screen bg-[#F1EBD9] text-[#102A26]">
      {screen === 'TITLE_MENU' && (
        <TitleScreen
          progress={progress}
          onUpdateProfile={handleUpdateProfile}
          onStartGame={handleStartGame}
          onOpenAbout={() => setModal('ABOUT')}
          onOpenLibrary={() => setModal('LIBRARY')}
          onToggleMute={handleToggleMute}
        />
      )}

      {screen === 'WORLD_MAP' && (
        <WorldMap
          progress={progress}
          onSelectMission={handleSelectMission}
          onClaimChest={handleClaimChest}
          onBackToTitle={() => setScreen('TITLE_MENU')}
          onOpenShop={() => setModal('SHOP')}
          onOpenLibrary={() => setModal('LIBRARY')}
          onOpenBadges={() => setModal('BADGES')}
          onOpenCertificate={() => setModal('CERTIFICATE')}
          onOpenAbout={() => setModal('ABOUT')}
          onToggleMute={handleToggleMute}
          onToggleFreeMode={handleToggleFreeMode}
        />
      )}

      {screen === 'PLAYING_MISSION' && activeMission && (
        <MissionRunner
          mission={activeMission}
          progress={progress}
          onConsumePowerUp={handleConsumePowerUp}
          onCompleteMission={handleCompleteMission}
          onExitToMap={() => {
            setActiveMission(null);
            setScreen('WORLD_MAP');
          }}
          onOpenLibrary={() => setModal('LIBRARY')}
          onToggleMute={handleToggleMute}
        />
      )}

      {modal === 'LIBRARY' && <LibraryModal onClose={() => setModal('NONE')} />}
      {modal === 'SHOP' && (
        <ShopModal
          progress={progress}
          onBuyPowerUp={handleBuyPowerUp}
          onClose={() => setModal('NONE')}
        />
      )}
      {modal === 'BADGES' && (
        <BadgesModal
          progress={progress}
          onResetProgress={handleResetProgress}
          onClose={() => setModal('NONE')}
        />
      )}
      {modal === 'ABOUT' && <AboutModal onClose={() => setModal('NONE')} />}
      {modal === 'CERTIFICATE' && (
        <CertificateModal progress={progress} onClose={() => setModal('NONE')} />
      )}
    </div>
  );
}
