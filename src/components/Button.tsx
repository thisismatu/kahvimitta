import React from 'react';
import { Button as DefaultButton, ButtonProps } from 'ariakit/button';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button: React.FC<ButtonProps> = ({ children, disabled, className, onClick, ...rest }) => {
  return (
    <DefaultButton
      className={clsx(styles.button, className)}
      as="button"
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </DefaultButton>
  );
};
