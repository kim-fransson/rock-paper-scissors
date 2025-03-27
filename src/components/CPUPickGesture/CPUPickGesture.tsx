// import { Button } from "react-aria-components";
import { GameMachineContext } from "../../context/gameMachineContext";
import { Loading, Paper, Rock, Scissors } from "../Gesture";

import styles from "./CPUPickGesture.module.scss";

const gestureMap = {
  ROCK: <Rock />,
  PAPER: <Paper />,
  SCISSORS: <Scissors />,
};

// const textMap: Record<string, string> = {
//   win: "you win",
//   lose: "you lose",
//   draw: "draw",
// };

export const CPUPickGesture = () => {
  const state = GameMachineContext.useSelector((state) => state);
  // const { send } = GameMachineContext.useActorRef();

  // const handlePlayAgain = () => {
  //   send({ type: "player.playAgain" });
  // };
  // const gameOver = state.hasTag("gameOver");

  return (
    <>
      <div className={styles.playerCpuGestureWrapper}>
        <div className={`${styles.textGestureWrapper} ${styles.player}`}>
          {gestureMap[state.context.player!]}
          <span>you picked</span>
        </div>

        <div className={`${styles.textGestureWrapper} ${styles.cpu}`}>
          {state.hasTag("waiting") ? (
            <Loading />
          ) : (
            gestureMap[state.context.cpu!]
          )}
          <span>the house picked</span>
        </div>
      </div>

      {/* {gameOver && (
        <div className={styles.gameOverWrapper}>
          <span className={styles.gameOverText}>
            {textMap[state.value as string]}
          </span>
          <Button
            onPress={() => handlePlayAgain()}
            className={styles.playAgainBtn}
          >
            play again
          </Button>
        </div>
      )} */}
    </>
  );
};
