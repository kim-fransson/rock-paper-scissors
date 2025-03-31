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

import { Button } from "../ui";

import styles from "./Rules.module.scss";
import { useState } from "react";
import { motion } from "motion/react";
import { useApp } from "../../hooks";

type AnimationState = "unmounted" | "hidden" | "visible";

const MotionModalOverlay = motion.create(ModalOverlay);
const MotionModal = motion.create(Modal);

export const Rules = () => {
  const [animation, setAnimation] = useState<AnimationState>("unmounted");
  const { state } = useApp();

  const {
    settings: { gameMode },
  } = state.context;

  const handleOpenChange = (isOpen: boolean) =>
    setAnimation(isOpen ? "visible" : "hidden");

  return (
    <DialogTrigger onOpenChange={handleOpenChange}>
      <Button variant="secondary" className={styles.triggerBtn}>
        Rules
      </Button>
      <MotionModalOverlay
        isDismissable
        isExiting={animation === "hidden"}
        onAnimationComplete={(animation) => {
          setAnimation((a) =>
            animation === "hidden" && a === "hidden" ? "unmounted" : a
          );
        }}
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
            <Button variant="icon" slot="close">
              <FaXmark size={30} />
              <span className="sr-only">Close modal</span>
            </Button>
          </Dialog>
        </MotionModal>
      </MotionModalOverlay>
    </DialogTrigger>
  );
};
