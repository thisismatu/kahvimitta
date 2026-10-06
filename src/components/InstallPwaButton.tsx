import React, { useEffect, useState } from 'react';
import { MobileView } from 'react-device-detect';
import { BeforeInstallPromptEvent } from 'types';
import { getParam, trackEvent } from 'utils/misc';
import { useLocalStorage } from 'utils/useLocalStorage';
import { Button } from 'components/Button';
import { IosDialog } from 'components/IosDialog';
import { DownloadIcon } from 'lucide-react';
import styles from './InstallPwaButton.module.css';

export const InstallPwaButton: React.FC = () => {
  const [isPromptEnabled, setIsPromptEnabled] = useLocalStorage<number>('isPromptEnabled', 1);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>();
  const isInstalled = getParam('source') === 'pwa';

  useEffect(() => {
    const handleInstallPrompt = (e: BeforeInstallPromptEvent) => {
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const handleClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    trackEvent('pwa-install', outcome);
    setDeferredPrompt(undefined);
  };

  const handleDisablePrompt = () => {
    setIsPromptEnabled(0);
  };

  if (isInstalled || !isPromptEnabled || deferredPrompt === undefined) return null;

  return (
    <MobileView>
      <Button className={styles.button} onClick={handleClick} tabIndex={-1}>
        <DownloadIcon /> Get app
      </Button>
    </MobileView>
  );
};
