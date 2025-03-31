import useSound from "use-sound";
import { useEffect } from "react";
import { motion } from "motion/react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import winSound from "../../assets/win.mp3";
import loseSound from "../../assets/lose.wav";
import drawSound from "../../assets/draw.wav";
import bubble from "../../assets/bubble.wav";

import { Button } from "../ui";

import styles from "./PlayAgain.module.scss";
import { useApp } from "../../hooks";

const textMap: Record<string, string> = {
  win: "you win",
  lose: "you lose",
  draw: "draw",
};

const soundMap: Record<string, string> = {
  win: winSound,
  lose: loseSound,
  draw: drawSound,
};

export const PlayAgain = () => {
  const { width, height } = useWindowSize();
  const { state, send } = useApp();

  const [playGameOver, { stop: stopGameOver }] = useSound(
    soundMap[state.value as string],
    {
      volume: 0.5 * state.context.settings.volume,
    }
  );
  const [playBubble] = useSound(bubble, {
    volume: 0.5 * state.context.settings.volume,
  });

  const handlePlayAgain = () => {
    playBubble();
    send({ type: "player.playAgain" });
    stopGameOver();
  };

  useEffect(() => {
    playGameOver();
  }, [playGameOver]);

  return (
    <>
      {state.value === "win" && (
        <Confetti width={width} height={height} className={styles.confetti} />
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={styles.gameOverWrapper}
      >
        <span className={styles.gameOverText}>
          {textMap[state.value as string]}
        </span>
        <Button onPress={() => handlePlayAgain()}>play again</Button>
      </motion.div>
    </>
  );
};
