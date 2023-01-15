import React, { useEffect, useState } from 'react';
// import { Button } from 'components/Button';
// import styles from './InstallPwaButton.module.css';

export const InstallPwaButton: React.FC = () => {
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const handler = (e: Event) => {
      console.log(e);
      setEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // return <Button className={styles.button}>Install</Button>;
  return null;
};
