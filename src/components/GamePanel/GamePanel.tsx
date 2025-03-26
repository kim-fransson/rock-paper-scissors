import { GameMachineContext } from "../../context/gameMachineContext";
import { CPUPickGesture } from "../CPUPickGesture";
import { PickGesture } from "../PickSymbol";

import styles from "./GamePanel.module.scss";

export const GamePanel = () => {
  const state = GameMachineContext.useSelector((state) => state);
  return (
    <div className={styles.gamePanel}>
      {state.matches("pickGesture") ? <PickGesture /> : <CPUPickGesture />}
    </div>
  );
};
