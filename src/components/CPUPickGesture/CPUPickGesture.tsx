/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useApp } from "../../hooks";
import { Gesture } from "../Gesture";

import styles from "./CPUPickGesture.module.scss";

export const CPUPickGesture = () => {
  const { state, send } = useApp();

  const isPlayerWinner =
    state.hasTag("gameOver") && state.context.winner === state.context.player;
  const isCpuWinner =
    state.hasTag("gameOver") && state.context.winner === state.context.cpu;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      send({ type: "gameOver" });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.playerCpuGestureWrapper}>
      <div className={`${styles.textGestureWrapper} ${styles.player}`}>
        <Gesture gesture={state.context.player!} isWinner={isPlayerWinner} />
        <span>you picked</span>
      </div>

      <div className={`${styles.textGestureWrapper} ${styles.cpu}`}>
        <Gesture gesture={state.context.cpu!} isWinner={isCpuWinner} />
        <span>the house picked</span>
      </div>
    </div>
  );
};
