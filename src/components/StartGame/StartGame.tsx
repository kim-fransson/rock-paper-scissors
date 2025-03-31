import useSound from "use-sound";
import { useApp } from "../../hooks";
import { Button } from "../ui";
import bubble from "../../assets/bubble.wav";
import styles from "./StartGame.module.scss";

export const StartGame = () => {
  const { send, state } = useApp();
  const [playBubble] = useSound(bubble, {
    volume: 0.5 * state.context.settings.volume,
  });

  const handleStartGame = () => {
    playBubble();
    send({ type: "player.startGame" });
  };
  return (
    <div className={styles.wrapper}>
      <Button className={styles.startGameBtn} onPress={handleStartGame}>
        start game
      </Button>
    </div>
  );
};
