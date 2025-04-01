import { useApp } from "../../hooks";
import { CPUPickGesture } from "../CPUPickGesture";
import { CPUThinking } from "../CPUThinking";
import { PickGesture } from "../PickGesture";
import { PlayAgain } from "../PlayAgain";

import styles from "./GamePanel.module.scss";

export const GamePanel = () => {
  const { state } = useApp();
  const renderContent = () => {
    switch (true) {
      case state.matches("pickGesture"):
        return <PickGesture />;

      case state.matches("cpuPickGesture"):
        return state.hasTag("waiting") ? <CPUThinking /> : <CPUPickGesture />;

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
