import { GameMachineContext } from "../../context/gameMachineContext";
import { PickGesture } from "../PickSymbol";

import styles from "./GamePanel.module.scss";

export const GamePanel = () => {
  const state = GameMachineContext.useSelector((state) => state);
  return (
    <div className={styles.gamePanel}>
      {state.matches("pickGesture") && <PickGesture />}
      {state.matches("cpuSelectedGesture") && state.tags.has("waiting")
        ? "CPU is picking"
        : state.tags.has("ready") && "CPU made its choice"}
      {state.matches("win") && "You win"}
      {state.matches("lose") && "You lose"}
      {state.matches("draw") && "It's a draw"}
    </div>
  );
};
