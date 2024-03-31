import React, { useEffect, useState } from 'react';
import formatDuration from 'format-duration';
import { Button } from './Button';
import { PlayIcon, SquareIcon } from 'assets/icons';
import glassSrc from 'assets/glass.m4a';
import styles from './Timer.module.css';

interface Props {
  duration: number;
}

export const Timer: React.FC<Props> = ({ duration }) => {
  const glass = new Audio(glassSrc);
  const [time, setTime] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTime(duration);
    setIsActive(false);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;
    if (time === 0) {
      glass.play();
      window.navigator.vibrate([2000]);
    }
    const timer = setTimeout(() => {
      setTime(time - 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [time, isActive]);

  const handleStartStop = () => setIsActive(!isActive);

  const handleReset = () => {
    setIsActive(false);
    setTime(duration);
  };

  const add30 = () => setTime(time + 30000);

  const sub30 = () => time - 30000 > 0 && setTime(time - 30000);

  const timeLeftPercentage = (time / duration) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.progress} style={{ width: `${timeLeftPercentage}%` }} />
      <span className={styles.title}>Timer</span>
      <div className={styles.timer}>
        <span className={styles.time}>{formatDuration(time, { leading: false })}</span>
        <Button onClick={handleStartStop} className={styles.startButton}>
          {isActive ? <SquareIcon /> : <PlayIcon />}
        </Button>
      </div>
      <div className={styles.secondaryActions}>
        <Button onClick={sub30} className={styles.textButton}>
          -0:30
        </Button>
        <Button onClick={add30} className={styles.textButton}>
          +0:30
        </Button>
        <Button onClick={handleReset} className={styles.textButton}>
          Reset
        </Button>
      </div>
    </div>
  );
};
