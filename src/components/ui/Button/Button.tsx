import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";

import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps extends AriaButtonProps {
  variant?: "primary" | "secondary" | "icon";
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
