import React from 'react';
import { Button as DefaultButton } from 'ariakit/button';
import styles from './Button.module.css';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<Props> = ({ children, disabled, className, onClick }) => {
  return (
    <DefaultButton className={clsx(styles.button, className)} as="button" onClick={onClick} disabled={disabled}>
      {children}
    </DefaultButton>
  );
};
