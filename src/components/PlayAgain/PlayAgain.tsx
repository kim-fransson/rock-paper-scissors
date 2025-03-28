import { Button } from "react-aria-components";
import styles from "./PlayAgain.module.scss";
import { GameMachineContext } from "../../context/gameMachineContext";

const textMap: Record<string, string> = {
  win: "you win",
  lose: "you lose",
  draw: "draw",
};

export const PlayAgain = () => {
  const state = GameMachineContext.useSelector((state) => state);
  const { send } = GameMachineContext.useActorRef();

  const handlePlayAgain = () => {
    send({ type: "player.playAgain" });
  };
  return (
    <div className={styles.gameOverWrapper}>
      <span className={styles.gameOverText}>
        {textMap[state.value as string]}
      </span>
      <Button onPress={() => handlePlayAgain()} className={styles.playAgainBtn}>
        play again
      </Button>
    </div>
  );
};
