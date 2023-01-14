import React from 'react';
import { Button, ButtonProps } from 'components/Button';
import styles from './MethodButton.module.css';

export const MethodButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button className={styles.button} {...props}>
      {props.children}
    </Button>
  );
};
