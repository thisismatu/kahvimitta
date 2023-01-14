import React from 'react';
import { Button } from './Button';
import styles from './MethodButton.module.css';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const MethodButton: React.FC<Props> = ({ children, disabled, className, onClick }) => {
  return <Button className={styles.button}>{children}</Button>;
};
