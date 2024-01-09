import React from 'react';
import { Dialog, DialogDismiss, DialogHeading, DialogProps } from 'ariakit/dialog';
import styles from './IosDialog.module.css';

interface Props extends DialogProps {
  onDontShowAgain: () => void;
}

export const DomainDialog: React.FC<Props> = ({ state, onDontShowAgain }) => {
  const handleRedirectAndClose = () => {
    onDontShowAgain();
    window.open('https://brewcalc.vercel.app', '_blank');
  };

  return (
    <Dialog state={state} className={styles.dialog}>
      <DialogHeading className={styles.heading}>BrewCalc domain is changing</DialogHeading>
      <div className={styles.content}>
        <div className={styles.description}>
          After January 25th the <strong>brewcalc.online</strong> domain will stop working and you
          can find BrewCalc at{' '}
          <strong>
            <a href="https://brewcalc.vercel.app">brewcalc.vercel.app</a>
          </strong>
          instead.
        </div>
        <p className={styles.description}>
          This is one of my hobby projects and I need to cut costs where i can. Keep enjoying your
          coffee! ☕️
        </p>
      </div>
      <DialogDismiss as="button" className={styles.button} onClick={handleRedirectAndClose}>
        Go to brewcalc.vercel.app
      </DialogDismiss>
      <DialogDismiss as="button" className={styles.dismiss} onClick={onDontShowAgain}>
        Close dialog
      </DialogDismiss>
    </Dialog>
  );
};
