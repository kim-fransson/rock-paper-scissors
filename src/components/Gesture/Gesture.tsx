import { Gesture as GestureType } from "../../app.model";
import styles from "./Gesture.module.scss";

interface GestureProps {
  gesture: GestureType;
}

const Gesture: React.FC<GestureProps> = ({ gesture }) => {
  const gestureStyles = {
    PAPER: styles.paper,
    ROCK: styles.rock,
    SCISSORS: styles.scissors,
  };

  return <div className={`${styles.gesture} ${gestureStyles[gesture]}`}></div>;
};

export const Paper = () => <Gesture gesture="PAPER" />;
export const Rock = () => <Gesture gesture="ROCK" />;
export const Scissors = () => <Gesture gesture="SCISSORS" />;
export const Loading = () => (
  <div className={`${styles.gesture} ${styles.loading}`}></div>
);
