import { GameHeader, Rules } from "./components";
import { GameMachineContext } from "./context/gameMachineContext";
import { GamePanel } from "./components/GamePanel";

import styles from "./App.module.scss";

function App() {
  return (
    <GameMachineContext.Provider>
      <div className={styles.grid}>
        <GameHeader />
        <GamePanel />
        <Rules />
      </div>
    </GameMachineContext.Provider>
  );
}

export default App;
