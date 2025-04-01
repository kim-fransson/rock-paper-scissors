import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";
import clsx from "clsx";

import styles from "./Button.module.scss";

interface ButtonProps extends AriaButtonProps {
  variant?: "primary" | "secondary" | "icon" | "destructive";
  className?: string;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      {...props}
      className={clsx(styles.btn, styles[variant], className)}
    >
      {children}
    </AriaButton>
  );
};
