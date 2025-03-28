import { Button } from "react-aria-components";
import clsx from "clsx";

import bgTriangle from "../../assets/bg-triangle.svg";
import bgPentagon from "../../assets/bg-pentagon.svg";
import { Gesture } from "../../app.model";
import { GameMachineContext } from "../../context/gameMachineContext";

import styles from "./PickGesture.module.scss";

const GESTURES = {
  default: ["PAPER", "ROCK", "SCISSORS"],
  spicy: ["PAPER", "ROCK", "SCISSORS", "LIZARD", "SPOCK"],
};

export const PickGesture = () => {
  const { send } = GameMachineContext.useActorRef();
  const { gameMode } = GameMachineContext.useSelector(
    (state) => state.context.settings
  );

  const handlePickGesture = (gesture: Gesture) => {
    send({ type: "player.pickedGesture", gesture });
  };

  const isSpicyMode = gameMode !== "default";
  const gestures = isSpicyMode ? GESTURES.spicy : GESTURES.default;
  const background = isSpicyMode ? bgPentagon : bgTriangle;

  return (
    <div className={clsx(styles.wrapper, { [styles.spicy]: isSpicyMode })}>
      <img src={background} alt="" />
      {gestures.map((gesture) => (
        <Button
          key={gesture}
          onPress={() => handlePickGesture(gesture as Gesture)}
          className={clsx(styles.button, styles[gesture.toLowerCase()], {
            [styles.spicy]: isSpicyMode,
          })}
        >
          <span className="sr-only">Pick {gesture.toLowerCase()}</span>
        </Button>
      ))}
    </div>
  );
};
