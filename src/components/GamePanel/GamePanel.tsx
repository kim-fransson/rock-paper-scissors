import { GameMachineContext } from "../../context/gameMachineContext";
import { PickGesture } from "../PickSymbol";

import styles from "./GamePanel.module.scss";

export const GamePanel = () => {
  const state = GameMachineContext.useSelector((state) => state);
  return (
    <div className={styles.gamePanel}>
      {state.matches("pickGesture") && <PickGesture />}
    </div>
  );
};
