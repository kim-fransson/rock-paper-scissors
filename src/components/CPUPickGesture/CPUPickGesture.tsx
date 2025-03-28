// import { Button } from "react-aria-components";
import { GameMachineContext } from "../../context/gameMachineContext";
import { Loading, Paper, Rock, Scissors, Spock, Lizard } from "../Gesture";

import styles from "./CPUPickGesture.module.scss";

const gestureMap = {
  ROCK: <Rock />,
  PAPER: <Paper />,
  SCISSORS: <Scissors />,
  SPOCK: <Spock />,
  LIZARD: <Lizard />,
};

export const CPUPickGesture = () => {
  const state = GameMachineContext.useSelector((state) => state);

  return (
    <div className={styles.playerCpuGestureWrapper}>
      <div className={`${styles.textGestureWrapper} ${styles.player}`}>
        {gestureMap[state.context.player!]}
        <span>you picked</span>
      </div>

      <div className={`${styles.textGestureWrapper} ${styles.cpu}`}>
        {state.hasTag("waiting") ? <Loading /> : gestureMap[state.context.cpu!]}
        <span>the house picked</span>
      </div>
    </div>
  );
};
