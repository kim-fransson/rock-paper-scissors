import styles from "./App.module.scss";
import { GameFooter, GameHeader, GamePanel } from "./components";
import { AppProvider } from "./app.provider";

function App() {
  return (
    <AppProvider>
      <div className={styles.grid}>
        <GameHeader />
        <GamePanel />
        <GameFooter />
      </div>
    </AppProvider>
  );
}

export default App;
