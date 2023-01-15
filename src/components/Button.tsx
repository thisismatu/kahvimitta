import React from 'react';
import { Button as DefaultButton, ButtonProps } from 'ariakit/button';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <DefaultButton className={clsx(styles.button, className)} as="button" {...rest}>
      {children}
    </DefaultButton>
  );
};
