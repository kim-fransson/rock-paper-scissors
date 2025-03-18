import { Button } from "react-aria-components";
import bgTriangle from "../../assets/bg-triangle.svg";

import styles from "./PickSymbol.module.scss";

export const PickSymbol = () => {
  return (
    <div className={styles.wrapper}>
      <img src={bgTriangle} alt="" />
      <Button className={`${styles.button} ${styles.paper}`}>
        <span className="sr-only">Pick paper</span>
      </Button>
      <Button className={`${styles.button} ${styles.rock}`}>
        <span className="sr-only">Pick rock</span>
      </Button>
      <Button className={`${styles.button} ${styles.scissors}`}>
        <span className="sr-only">Pick scissors</span>
      </Button>
    </div>
  );
};
