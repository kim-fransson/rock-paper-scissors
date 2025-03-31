import { useApp } from "../../hooks";
import styles from "./CurrentScore.module.scss";

export const CurrentScore = () => {
  const { state } = useApp();
  const currentScore = state.context.score;

  return (
    <span className={styles.currentScore}>
      score
      <span aria-label={currentScore.toString()}>{currentScore}</span>
    </span>
  );
};
