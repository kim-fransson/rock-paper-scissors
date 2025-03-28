import { Dialog, DialogTrigger, Popover, Heading } from "react-aria-components";
import { Button } from "../ui";
import { FaGear } from "react-icons/fa6";

import styles from "./GameSettings.module.scss";
import { GameMachineContext } from "../../context/gameMachineContext";

export const GameSettings = () => {
  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);

  const isSettingsOpened = state.context.isSettingsOpened;

  const handleOnOpenChange = () => {
    send({ type: "user.toggleSettings" });
  };
  return (
    <DialogTrigger>
      <Button variant="icon" className={styles.triggerBtn}>
        <FaGear size={30} />
        <span className="sr-only">toggle game settings</span>
      </Button>
      <Popover
        isOpen={isSettingsOpened}
        onOpenChange={handleOnOpenChange}
        className={styles.popover}
      >
        <Dialog>
          <Heading slot="title">Settings</Heading>
          to be implemented...
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
