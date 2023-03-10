import React from 'react';
import { ButtonProps } from 'ariakit/button';
import { Button } from 'components/Button';
import styles from './MethodButton.module.css';

export const MethodButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button className={styles.button} {...rest}>
      {children}
    </Button>
  );
};
