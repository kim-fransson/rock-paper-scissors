import { GameMachineContext } from "./context/gameMachineContext";

import styles from "./App.module.scss";
import { GameFooter, GameHeader, GamePanel } from "./components";

function App() {
  return (
    <GameMachineContext.Provider>
      <div className={styles.grid}>
        <GameHeader />
        <GamePanel />
        <GameFooter />
      </div>
    </GameMachineContext.Provider>
  );
}

export default App;
