import { GameSettings } from "../GameSettings";
import { Rules } from "../Rules";

import styles from "./GameFooter.module.scss";

export const GameFooter = () => {
  return (
    <footer className={styles.gameFooter}>
      <Rules />
      <GameSettings />
    </footer>
  );
};
