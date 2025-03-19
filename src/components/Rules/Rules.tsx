import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
} from "react-aria-components";

import rules from "../../assets/image-rules.svg";
import iconClose from "../../assets/icon-close.svg";

import styles from "./Rules.module.scss";
import { GameMachineContext } from "../../context/gameMachineContext";

export const Rules = () => {
  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);

  const isRulesOpen = state.context.isRulesOpened;

  const handleOnOpenChange = () => {
    send({ type: "user.toggleRules" });
  };

  return (
    <DialogTrigger>
      <Button onPress={handleOnOpenChange} className={styles.triggerButton}>
        Rules
      </Button>
      <Modal
        className={styles.modal}
        isDismissable
        isOpen={isRulesOpen}
        onOpenChange={handleOnOpenChange}
      >
        <Dialog className={styles.dialog}>
          <Heading className={styles.heading} slot="title">
            RULES
          </Heading>
          <img
            width={305}
            height={271}
            src={rules}
            alt=""
            className={styles.image}
          />
          <p className="sr-only">
            Rock beats Scissors, Scissors beats Paper, Paper beats Rock
          </p>
          <Button className={styles.closeButton} onPress={handleOnOpenChange}>
            <img src={iconClose} alt="" />
            <span className="sr-only">Close modal</span>
          </Button>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};
