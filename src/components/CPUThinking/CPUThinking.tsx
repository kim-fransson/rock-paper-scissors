/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { Loading, Gesture } from "../Gesture";

import { useApp } from "../../hooks";

import styles from "./CPUThinking.module.scss";

export const CPUThinking = () => {
  const { state, send } = useApp();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      send({ type: "cpu.loadingDone" });
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.playerCpuGestureWrapper}>
      <div className={`${styles.textGestureWrapper} ${styles.player}`}>
        <Gesture gesture={state.context.player!} />
        <span>you picked</span>
      </div>

      <div className={`${styles.textGestureWrapper} ${styles.cpu}`}>
        <Loading />
        <span>Thinking...</span>
      </div>
    </div>
  );
};
