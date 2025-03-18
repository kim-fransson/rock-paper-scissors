import { GameHeader, PickSymbol, Rules } from "./components";

import styles from "./App.module.scss";
import { useMachine } from "@xstate/react";
import { gameMachine } from "./rockPaperScissorsMachine";

function App() {
  const [state] = useMachine(gameMachine);
  return (
    <div className={styles.grid}>
      <GameHeader />
      {state.matches("pickSymbol") && <PickSymbol />}
      <Rules />
    </div>
  );
}

export default App;
