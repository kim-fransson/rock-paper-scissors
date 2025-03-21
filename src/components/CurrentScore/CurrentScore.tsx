import { GameMachineContext } from "../../context/gameMachineContext";
import styles from "./CurrentScore.module.scss";

export const CurrentScore = () => {
  const currentScore = GameMachineContext.useSelector(
    (state) => state.context.score
  );

  return (
    <span className={styles.currentScore}>
      score
      <span aria-label={currentScore.toString()}>{currentScore}</span>
    </span>
  );
};
