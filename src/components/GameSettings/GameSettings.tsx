import {
  Dialog,
  DialogTrigger,
  Popover,
  Heading,
  Switch,
  Separator,
} from "react-aria-components";
import useSound from "use-sound";
import { FaGear } from "react-icons/fa6";

import { RadioGroup, Radio, Label } from "react-aria-components";
import { Difficulty, GameMode } from "../../app.model";
import bubble from "../../assets/bubble.wav";
import pop1 from "../../assets/pop-1.wav";
import pop3 from "../../assets/pop-3.wav";
import switchOn from "../../assets/switchOn.mp3";
import switchOff from "../../assets/switchOff.mp3";

import { Button } from "../ui";

import styles from "./GameSettings.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "../../hooks";

type AnimationState = "hidden" | "visible";

const MotionPopover = motion.create(Popover);

export const GameSettings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [animation, setAnimation] = useState<AnimationState>("hidden");

  const { state, send } = useApp();

  const { difficulty, gameMode, volume } = state.context.settings;

  const [playBubble] = useSound(bubble, { volume: 0.5 * volume });
  const [playOpen] = useSound(pop1, { volume: 0.5 * volume });
  const [playClose] = useSound(pop3, { volume: 0.5 * volume });
  const [playSwitchOn] = useSound(switchOn, { volume: 0.5 * volume });
  const [playSwitchOff] = useSound(switchOff, { volume: 0.5 * volume });

  const handleOnOpenChange = () => {
    if (isSettingsOpen) {
      setAnimation("hidden");
      playClose();
    } else {
      setAnimation("visible");
      playOpen();
    }
    setIsSettingsOpen((prev) => !prev);
  };

  const handleDifficultyChange = (difficulty: string) => {
    playBubble();
    send({
      type: "player.updateSettings",
      settings: {
        ...state.context.settings,
        difficulty: difficulty as Difficulty,
      },
    });
  };

  const handleGameModeChange = (gameMode: string) => {
    playBubble();
    send({
      type: "player.updateSettings",
      settings: { ...state.context.settings, gameMode: gameMode as GameMode },
    });
  };

  const handleVolumeToggle = (volumeOn: boolean) => {
    if (volumeOn) {
      playSwitchOn();
      send({
        type: "player.updateSettings",
        settings: { ...state.context.settings, volume: 1 },
      });
    } else {
      playSwitchOff();
      setTimeout(() => {
        send({
          type: "player.updateSettings",
          settings: { ...state.context.settings, volume: 0 },
        });
      }, 200); // Delay ensures the sound plays before volume is cut off
    }
  };

  const handleResetGame = () => {
    playBubble();
    send({
      type: "player.resetGame",
    });
    handleOnOpenChange();
  };

  return (
    <DialogTrigger>
      <Button
        onPress={handleOnOpenChange}
        variant="icon"
        className={styles.triggerBtn}
      >
        <FaGear size={30} />
        <span className="sr-only">toggle game settings</span>
      </Button>

      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                },
                exit: {
                  opacity: [0],
                },
              }}
              initial="hidden"
              exit="exit"
              animate={animation}
              className={styles.overlay}
            ></motion.div>
            <MotionPopover
              isOpen
              onOpenChange={handleOnOpenChange}
              className={styles.popover}
              variants={{
                hidden: { opacity: 0, scale: 1 },
                visible: {
                  opacity: 1,
                  scale: [1, 1.1, 1], // Bounce effect
                  transition: {
                    duration: 0.3,
                  },
                },
                exit: { opacity: 0, scale: 1 },
              }}
              initial="hidden"
              exit="exit"
              animate={animation}
            >
              <Dialog className={styles.dialog}>
                <Heading slot="title" className={styles.heading}>
                  Settings
                </Heading>
                <RadioGroup
                  className={styles.difficulty}
                  value={difficulty}
                  onChange={handleDifficultyChange}
                >
                  <Label className={styles.label}>Difficulty</Label>
                  <Radio className={styles.difficultyRadio} value="random">
                    Unpredictable
                  </Radio>
                  <Radio className={styles.difficultyRadio} value="tactician">
                    Tactician
                  </Radio>
                  <Radio className={styles.difficultyRadio} value="unfair">
                    Completely Unfair
                  </Radio>
                </RadioGroup>

                <RadioGroup
                  className={styles.gameMode}
                  value={gameMode}
                  onChange={handleGameModeChange}
                >
                  <Label className={styles.label}>Game Mode</Label>
                  <Radio className={styles.gameModeRadio} value="default">
                    Default
                  </Radio>
                  <Radio className={styles.gameModeRadio} value="spock">
                    Spicy
                  </Radio>
                </RadioGroup>

                <Separator className={styles.separator} />

                <Switch
                  isSelected={volume > 0 ? true : false}
                  onChange={handleVolumeToggle}
                  className={styles.soundSwitch}
                >
                  <div className={styles.indicator} />
                  Activate Sound
                </Switch>

                <Button
                  onPress={handleResetGame}
                  className={styles.resetBtn}
                  variant="destructive"
                >
                  RESET
                </Button>
              </Dialog>
            </MotionPopover>
          </>
        )}
      </AnimatePresence>
    </DialogTrigger>
  );
};
