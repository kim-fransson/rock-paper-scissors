/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useApp } from "../../hooks";
import { Gesture } from "../Gesture";

import styles from "./CPUPickGesture.module.scss";
import { motion } from "motion/react";
import { useMedia } from "react-use";

export const CPUPickGesture = () => {
  const { state, send } = useApp();
  const isWide = useMedia("(min-width: 768px)");

  const isPlayerWinner =
    state.hasTag("gameOver") && state.context.winner === state.context.player;
  const isCpuWinner =
    state.hasTag("gameOver") && state.context.winner === state.context.cpu;

  const PushThem = state.hasTag("gameOver") && isWide;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      send({ type: "gameOver" });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.playerCpuGestureWrapper}>
      <motion.div
        animate={{
          x: PushThem ? -50 : 0,
        }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`${styles.textGestureWrapper} ${styles.player}`}
      >
        <Gesture gesture={state.context.player!} isWinner={isPlayerWinner} />
        <span>you picked</span>
      </motion.div>

      <motion.div
        animate={{
          x: PushThem ? 50 : 0,
        }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`${styles.textGestureWrapper} ${styles.cpu}`}
      >
        <Gesture gesture={state.context.cpu!} isWinner={isCpuWinner} />
        <span>the house picked</span>
      </motion.div>
    </div>
  );
};
