import { useApp } from "../../hooks";
import { CPUPickGesture } from "../CPUPickGesture";
import { PickGesture } from "../PickSymbol";
import { PlayAgain } from "../PlayAgain";
import { StartGame } from "../StartGame";

import styles from "./GamePanel.module.scss";

export const GamePanel = () => {
  const { state } = useApp();
  const renderContent = () => {
    switch (true) {
      case state.matches("idle"):
        return <StartGame />;

      case state.matches("pickGesture"):
        return <PickGesture />;

      case state.matches("cpuPickGesture"):
        return <CPUPickGesture />;

      case state.hasTag("gameOver"):
        return (
          <>
            <CPUPickGesture />
            <PlayAgain />
          </>
        );
    }
  };

  return <div className={styles.gamePanel}>{renderContent()}</div>;
};
