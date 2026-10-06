import React from 'react';
import { Button as DefaultButton, ButtonProps } from '@ariakit/react';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <DefaultButton className={clsx(styles.button, className)} {...rest}>
      {children}
    </DefaultButton>
  );
};
