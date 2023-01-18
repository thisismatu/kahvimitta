import React from 'react';
import { Dialog, DialogDismiss, DialogHeading, DialogProps } from 'ariakit/dialog';
import { ReactComponent as IosShareIcon } from 'assets/ios-share.svg';
import a2hsSrc from 'assets/a2hs.png';
import styles from './IosDialog.module.css';

export const IosDialog: React.FC<DialogProps> = ({ state }) => {
  return (
    <Dialog state={state} className={styles.dialog}>
      <DialogHeading className={styles.heading}>Install BrewCalc</DialogHeading>
      <div className={styles.content}>
        <p className={styles.description}>
          1. Tap <strong>Share</strong> <IosShareIcon />
        </p>
        <p className={styles.description}>
          2. Tap <strong>Add to Home Screen</strong>
        </p>
        <img alt="add to home screen" src={a2hsSrc} />
      </div>
      <DialogDismiss as="button" className={styles.button}>
        OK
      </DialogDismiss>
    </Dialog>
  );
};
