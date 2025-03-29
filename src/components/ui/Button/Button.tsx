import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
  PressEvent,
} from "react-aria-components";
import useSound from "use-sound";
import clsx from "clsx";

import bubble from "../../../assets/bubble.wav";

import styles from "./Button.module.scss";
import { GameMachineContext } from "../../../context/gameMachineContext";

interface ButtonProps extends AriaButtonProps {
  variant?: "primary" | "secondary" | "icon";
  className?: string;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  onPress,
  ...props
}: ButtonProps) => {
  const volume = GameMachineContext.useSelector(
    (state) => state.context.settings.volume
  );
  const [playBubble] = useSound(bubble, { volume: 0.5 * volume });

  const handlePressWithSound = (e: PressEvent) => {
    playBubble();
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <AriaButton
      {...props}
      onPress={handlePressWithSound}
      className={clsx(styles.btn, styles[variant], className)}
    >
      {children}
    </AriaButton>
  );
};
