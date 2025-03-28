import { Button } from "react-aria-components";
import { GameMachineContext } from "../../context/gameMachineContext";

import styles from "./StartGame.module.scss";

export const StartGame = () => {
  const { send } = GameMachineContext.useActorRef();

  const handleStartGame = () => {
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
