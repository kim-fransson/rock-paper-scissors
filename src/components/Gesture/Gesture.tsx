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
  isWinner?: boolean;
}

export const Gesture: React.FC<GestureProps> = ({
  gesture,
  isWinner = false,
}) => {
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
    <div className={styles.wrapper}>
      {/* Three pulsating circles */}
      {isWinner &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={styles.pulse}
            animate={{
              scale: [0.5, 2],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 1.75,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
              delay: i * 0.4, // Staggered effect
              repeatDelay: 0.4,
            }}
          />
        ))}
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className={`${styles.gesture} ${gestureStyles[gesture]}`}
      ></motion.div>
    </div>
  );
};

export const Loading = () => (
  <div className={`${styles.gesture} ${styles.loading}`}></div>
);
