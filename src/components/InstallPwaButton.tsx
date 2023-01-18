import React, { useEffect, useState } from 'react';
import { useDialogState } from 'ariakit/dialog';
import { isMobile, isIOS } from 'react-device-detect';
import { BeforeInstallPromptEvent } from 'types';
import { getParam } from 'utils/misc';
import { Button } from 'components/Button';
import { IosDialog } from 'components/IosDialog';
import { ReactComponent as DownloadIcon } from 'assets/download.svg';
import { ReactComponent as PlusIcon } from 'assets/plus-circle.svg';
import styles from './InstallPwaButton.module.css';

export const InstallPwaButton: React.FC = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>();
  const dialog = useDialogState({ animated: true });

  useEffect(() => {
    const handleInstallPrompt = (e: BeforeInstallPromptEvent) => {
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    setIsVisible(isIOS);
    setIsInstalled(getParam('source') === 'pwa');
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const handleClick = async () => {
    if (isIOS) return dialog.toggle();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(undefined);
    setIsVisible(outcome !== 'accepted');
  };

  if (isInstalled) return null;
  if (!isVisible) return null;

  return (
    <>
      <Button as="button" className={styles.button} onClick={handleClick} tabIndex={-1}>
        {isMobile ? <DownloadIcon /> : <PlusIcon />}
        {isMobile ? 'Get' : 'Install'} app
      </Button>
      <IosDialog state={dialog} />
    </>
  );
};
