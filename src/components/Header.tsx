import React from 'react';
import styles from './Header.module.css';

interface Props {
  title: string;
  description?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<Props> = ({ title, description, leftAction, rightAction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{leftAction && leftAction}</div>
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
        {description && (
          <>
            <span className={styles.description}>–</span>
            <span className={styles.description}>{description}</span>
          </>
        )}
      </div>
      <div className={styles.right}>{rightAction && rightAction}</div>
    </div>
  );
};
