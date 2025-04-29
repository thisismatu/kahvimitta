import React, { useEffect, useState } from 'react';
import formatDuration from 'format-duration';
import { PlayIcon, SquareIcon } from 'lucide-react';
import { useWakeLock } from 'utils/useWakeLock';
import { Button } from './Button';
import glassSrc from 'assets/glass.m4a';
import styles from './Timer.module.css';
import { trackEvent } from 'utils/misc';

interface Props {
  durationMs: number;
  durationIncrement: number;
}

export const Timer: React.FC<Props> = ({ durationMs, durationIncrement }) => {
  const glass = new Audio(glassSrc);
  const { isSupported, released, request, release } = useWakeLock({
    onError: () => trackEvent('error', 'Screen Wake Lock API')
  });
  const [duration, setDuration] = useState(durationMs);
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(durationMs);
    setDuration(durationMs);
    setIsActive(false);
  }, [durationMs]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft === 0) {
      glass.play();
      window.navigator.vibrate([2000]);
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [timeLeft, isActive]);

  const handleStartStop = () => {
    if (isSupported) {
      released === false ? release() : request();
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimeLeft(durationMs);
    setDuration(durationMs);
    setIsActive(false);
  };

  const add30 = () => {
    setTimeLeft(timeLeft + durationIncrement);
    setDuration(duration + durationIncrement);
  };

  const sub30 = () => {
    if (timeLeft - durationIncrement > 0) {
      setTimeLeft(timeLeft - durationIncrement);
      setDuration(duration - durationIncrement);
    }
  };

  const timeLeftPercentage = (timeLeft / duration) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.progress} style={{ width: `${timeLeftPercentage}%` }} />
      <span className={styles.title}>Timer</span>
      <div className={styles.timer}>
        <span className={styles.time}>{formatDuration(timeLeft)}</span>
        <Button onClick={handleStartStop} className={styles.startButton}>
          {isActive ? <SquareIcon /> : <PlayIcon />}
        </Button>
      </div>
      <div className={styles.secondaryActions}>
        <Button onClick={sub30} className={styles.textButton}>
          -{formatDuration(durationIncrement)}
        </Button>
        <Button onClick={add30} className={styles.textButton}>
          +{formatDuration(durationIncrement)}
        </Button>
        <Button onClick={handleReset} className={styles.textButton}>
          Reset
        </Button>
      </div>
    </div>
  );
};
