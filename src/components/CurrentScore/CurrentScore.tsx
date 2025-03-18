import styles from "./CurrentScore.module.scss";

export const CurrentScore = () => {
  return (
    <span className={styles.currentScore}>
      score
      <span aria-label="0">0</span>
    </span>
  );
};
