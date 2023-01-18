import React, { useEffect, useState } from 'react';
import { BeforeInstallPromptEvent } from 'types';
import { getParam } from 'utils/misc';
import { Button } from 'components/Button';
import { ReactComponent as DownloadIcon } from 'assets/download.svg';
import { ReactComponent as PlusIcon } from 'assets/plus-circle.svg';
import styles from './InstallPwaButton.module.css';

export const InstallPwaButton: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>();

  useEffect(() => {
    const handleInstallPrompt = (e: BeforeInstallPromptEvent) => {
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    setIsMobile(window.matchMedia('(hover: none)').matches);
    setIsInstalled(getParam('source') === 'pwa');

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const handleClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(undefined);
    setIsVisible(outcome !== 'accepted');
  };

  if (isInstalled) return null;
  if (!isVisible) return null;

  return (
    <Button className={styles.button} onClick={handleClick} tabIndex={-1}>
      {isMobile ? <DownloadIcon /> : <PlusIcon />}
      {isMobile ? 'Get' : 'Install'} app
    </Button>
  );
};
