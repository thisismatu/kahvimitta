import { Button } from './Button';
import { ArrowUpRightIcon } from 'assets/icons';
import styles from './Alert.module.css';

export const Alert = () => {
  return (
    <div className={styles.alert}>
      <div className={styles.container}>
        <p>
          The <strong>brewcalc.online</strong> domain will soon stop working, but you can find
          BrewCalc at <strong>brewcalc.vercel.app</strong>. Sorry for the inconvenience, but this is
          one of my hobby projects and I need to cut costs where i can.
        </p>
        <a
          href="https://brewcalc.vercel.app"
          target="_blank"
          className={styles.button}
          rel="noopener noreferrer"
        >
          Go to brewcalc.vercel.app
          <ArrowUpRightIcon />
        </a>
      </div>
    </div>
  );
};
