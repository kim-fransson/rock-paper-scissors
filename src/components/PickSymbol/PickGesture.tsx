import { Button } from "react-aria-components";
import bgTriangle from "../../assets/bg-triangle.svg";

import styles from "./PickGesture.module.scss";
import { Gesture } from "../../app.model";
import { GameMachineContext } from "../../context/gameMachineContext";

export const PickGesture = () => {
  const { send } = GameMachineContext.useActorRef();

  const handlePickGesture = (gesture: Gesture) => {
    send({ type: "player.pickedGesture", gesture });
  };

  return (
    <div className={styles.wrapper}>
      <img src={bgTriangle} alt="" />
      <Button
        onPress={() => handlePickGesture("PAPER")}
        className={`${styles.button} ${styles.paper}`}
      >
        <span className="sr-only">Pick paper</span>
      </Button>
      <Button
        onPress={() => handlePickGesture("ROCK")}
        className={`${styles.button} ${styles.rock}`}
      >
        <span className="sr-only">Pick rock</span>
      </Button>
      <Button
        onPress={() => handlePickGesture("SCISSORS")}
        className={`${styles.button} ${styles.scissors}`}
      >
        <span className="sr-only">Pick scissors</span>
      </Button>
    </div>
  );
};
