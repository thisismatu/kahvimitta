import React, { useEffect, useState } from 'react';
import { useDialogState } from 'ariakit/dialog';
import { isIOS, isBrowser } from 'react-device-detect';
import { BeforeInstallPromptEvent } from 'types';
import { getParam } from 'utils/misc';
import { useLocalStorage } from 'utils/useLocalStorage';
import { Button } from 'components/Button';
import { IosDialog } from 'components/IosDialog';
import { ReactComponent as DownloadIcon } from 'assets/download.svg';
import styles from './InstallPwaButton.module.css';

export const InstallPwaButton: React.FC = () => {
  const [isPromptEnabled, setIsPromptEnabled] = useLocalStorage<number>('isPromptEnabled', 1);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>();
  const dialog = useDialogState({ animated: true });
  const isInstalled = getParam('source') === 'pwa';

  useEffect(() => {
    const handleInstallPrompt = (e: BeforeInstallPromptEvent) => {
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const handleClick = async () => {
    if (isIOS) return dialog.toggle();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome !== 'accepted') {
      setDeferredPrompt(undefined);
    }
  };

  if (isBrowser || isInstalled) return null;
  if (!isPromptEnabled || deferredPrompt === undefined) return null;

  return (
    <>
      <Button as="button" className={styles.button} onClick={handleClick} tabIndex={-1}>
        <DownloadIcon /> Get app
      </Button>
      <IosDialog state={dialog} onDontShowAgain={() => setIsPromptEnabled(0)} />
    </>
  );
};
