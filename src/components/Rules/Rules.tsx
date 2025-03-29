import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { FaXmark } from "react-icons/fa6";

import rules from "../../assets/image-rules.svg";
import spicyRules from "../../assets/image-rules-bonus.svg";
import { GameMachineContext } from "../../context/gameMachineContext";

import { Button } from "../ui";

import styles from "./Rules.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type AnimationState = "unmounted" | "hidden" | "visible";

const MotionModalOverlay = motion.create(ModalOverlay);
const MotionModal = motion.create(Modal);

export const Rules = () => {
  const [animation, setAnimation] = useState<AnimationState>("unmounted");
  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);

  const {
    isRulesOpened,
    settings: { gameMode },
  } = state.context;

  const handleOnOpenChange = () => {
    setAnimation(isRulesOpened ? "hidden" : "visible");
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
      <AnimatePresence>
        {isRulesOpened && (
          <MotionModalOverlay
            isDismissable
            isOpen
            onOpenChange={handleOnOpenChange}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            exit="hidden"
            animate={animation}
          >
            <MotionModal
              className={styles.modal}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <Dialog className={styles.dialog}>
                <Heading className={styles.heading} slot="title">
                  RULES
                </Heading>
                <img
                  width={305}
                  height={271}
                  src={gameMode === "default" ? rules : spicyRules}
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
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </DialogTrigger>
  );
};
