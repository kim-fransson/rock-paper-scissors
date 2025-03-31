/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useApp } from "../../hooks";
import { Paper, Rock, Scissors, Spock, Lizard } from "../Gesture";

import styles from "./CPUPickGesture.module.scss";

const gestureMap = {
  ROCK: <Rock />,
  PAPER: <Paper />,
  SCISSORS: <Scissors />,
  SPOCK: <Spock />,
  LIZARD: <Lizard />,
};

export const CPUPickGesture = () => {
  const { state, send } = useApp();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      send({ type: "gameOver" });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.playerCpuGestureWrapper}>
      <div className={`${styles.textGestureWrapper} ${styles.player}`}>
        {gestureMap[state.context.player!]}
        <span>you picked</span>
      </div>

      <div className={`${styles.textGestureWrapper} ${styles.cpu}`}>
        {gestureMap[state.context.cpu!]}
        <span>the house picked</span>
      </div>
    </div>
  );
};
