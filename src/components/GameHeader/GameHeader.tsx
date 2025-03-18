import logo from "../../assets/logo.svg";
import { CurrentScore } from "../CurrentScore";

import styles from "./GameHeader.module.scss";

export const GameHeader = () => {
  return (
    <header className={styles.gameHeader}>
      <img src={logo} alt="" className={styles.logo} />
      <h1 className="sr-only">Rock paper scissors</h1>
      <CurrentScore />
    </header>
  );
};
