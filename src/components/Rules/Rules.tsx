import { Dialog, DialogTrigger, Heading, Modal } from "react-aria-components";
import { FaXmark } from "react-icons/fa6";

import rules from "../../assets/image-rules.svg";
import spockRules from "../../assets/image-rules-bonus.svg";
import { GameMachineContext } from "../../context/gameMachineContext";

import { Button } from "../ui";

import styles from "./Rules.module.scss";

export const Rules = () => {
  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);

  const {
    isRulesOpened,
    settings: { gameMode },
  } = state.context;

  const handleOnOpenChange = () => {
    send({ type: "player.toggleRules" });
  };

  return (
    <DialogTrigger>
      <Button
        variant="secondary"
        onPress={handleOnOpenChange}
        className={styles.triggerBtn}
      >
        Rules
      </Button>
      <Modal
        className={styles.modal}
        isDismissable
        isOpen={isRulesOpened}
        onOpenChange={handleOnOpenChange}
      >
        <Dialog className={styles.dialog}>
          <Heading className={styles.heading} slot="title">
            RULES
          </Heading>
          <img
            width={305}
            height={271}
            src={gameMode === "default" ? rules : spockRules}
            alt=""
            className={styles.image}
          />
          <p className="sr-only">
            Rock beats Scissors, Scissors beats Paper, Paper beats Rock
          </p>
          <Button variant="icon" onPress={handleOnOpenChange}>
            <FaXmark size={30} />
            <span className="sr-only">Close modal</span>
          </Button>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};
