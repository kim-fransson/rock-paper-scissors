import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { FaXmark } from "react-icons/fa6";
import { motion } from "motion/react";
import { useState } from "react";

import rules from "../../assets/image-rules.svg";
import spicyRules from "../../assets/image-rules-bonus.svg";
import { Button } from "../ui";
import { useApp } from "../../hooks";
import pop1 from "../../assets/pop-1.wav";
import pop3 from "../../assets/pop-3.wav";

import styles from "./Rules.module.scss";
import useSound from "use-sound";

type AnimationState = "unmounted" | "hidden" | "visible";

const MotionModalOverlay = motion.create(ModalOverlay);
const MotionModal = motion.create(Modal);

export const Rules = () => {
  const [animation, setAnimation] = useState<AnimationState>("unmounted");
  const { state } = useApp();
  const volume = state.context.settings.volume;
  const [playOpen] = useSound(pop1, { volume: 0.5 * volume });
  const [playClose] = useSound(pop3, { volume: 0.5 * volume });

  const {
    settings: { gameMode },
  } = state.context;

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      playOpen();
      setAnimation("visible");
    } else {
      playClose();
      setAnimation("hidden");
    }
  };

  return (
    <DialogTrigger onOpenChange={handleOpenChange}>
      <Button variant="secondary" className={styles.triggerBtn}>
        Rules
      </Button>
      <MotionModalOverlay
        className={styles.modalOverlay}
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
          variants={{
            hidden: { opacity: 0, scale: 1 },
            exit: { opacity: 0, scale: 1 },
            visible: {
              opacity: 1,
              scale: [1, 1.1, 1], // Bounce effect
              transition: {
                duration: 0.3,
              },
            },
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
            <Button className={styles.closeBtn} variant="icon" slot="close">
              <FaXmark size={30} />
              <span className="sr-only">Close modal</span>
            </Button>
          </Dialog>
        </MotionModal>
      </MotionModalOverlay>
    </DialogTrigger>
  );
};
