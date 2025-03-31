/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "motion/react";
import useSound from "use-sound";
import { useEffect } from "react";

import { Gesture as GestureType } from "../../app.model";
import pop from "../../assets/pop-1.wav";

import styles from "./Gesture.module.scss";
import { useApp } from "../../hooks";

interface GestureProps {
  gesture: GestureType;
}

const Gesture: React.FC<GestureProps> = ({ gesture }) => {
  const { state } = useApp();
  const [playPop] = useSound(pop, {
    volume: 0.5 * state.context.settings.volume,
  });

  const gestureStyles = {
    PAPER: styles.paper,
    ROCK: styles.rock,
    SCISSORS: styles.scissors,
    LIZARD: styles.lizard,
    SPOCK: styles.spock,
  };

  useEffect(() => {
    playPop();
  }, [gesture, playPop]);

  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      className={`${styles.gesture} ${gestureStyles[gesture]}`}
    ></motion.div>
  );
};

export const Paper = () => <Gesture gesture="PAPER" />;
export const Rock = () => <Gesture gesture="ROCK" />;
export const Scissors = () => <Gesture gesture="SCISSORS" />;
export const Lizard = () => <Gesture gesture="LIZARD" />;
export const Spock = () => <Gesture gesture="SPOCK" />;
export const Loading = () => (
  <div className={`${styles.gesture} ${styles.loading}`}></div>
);
