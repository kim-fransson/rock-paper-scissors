import { Dialog, DialogTrigger, Popover, Heading } from "react-aria-components";
import useSound from "use-sound";
import { FaGear } from "react-icons/fa6";

import { GameMachineContext } from "../../context/gameMachineContext";
import { RadioGroup, Radio, Label } from "react-aria-components";
import { Difficulty, GameMode } from "../../app.model";
import bubble from "../../assets/bubble.wav";
import pop1 from "../../assets/pop-1.wav";
import pop3 from "../../assets/pop-3.wav";

import { Button } from "../ui";

import styles from "./GameSettings.module.scss";

export const GameSettings = () => {
  const [play] = useSound(bubble, { volume: 0.05 });
  const [playOpen] = useSound(pop1, { volume: 0.1 });
  const [playClose] = useSound(pop3, { volume: 0.1 });

  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);

  const isSettingsOpened = state.context.isSettingsOpened;
  const { difficulty, gameMode } = state.context.settings;

  const handleOnOpenChange = () => {
    if (isSettingsOpened) {
      playClose();
    } else {
      playOpen();
    }
    send({ type: "player.toggleSettings" });
  };

  const handleDifficultyChange = (difficulty: string) => {
    play();
    state.context.settings.difficulty = difficulty as Difficulty;
  };

  const handleGameModeChange = (gameMode: string) => {
    play();
    state.context.settings.gameMode = gameMode as GameMode;
  };

  return (
    <DialogTrigger>
      {isSettingsOpened && <div className={styles.overlay}></div>}
      <Button
        onPress={handleOnOpenChange}
        variant="icon"
        className={styles.triggerBtn}
      >
        <FaGear size={30} />
        <span className="sr-only">toggle game settings</span>
      </Button>
      <Popover
        isOpen={isSettingsOpened}
        onOpenChange={handleOnOpenChange}
        className={styles.popover}
      >
        <Dialog className={styles.dialog}>
          <Heading slot="title" className={styles.heading}>
            Settings
          </Heading>
          <RadioGroup
            className={styles.difficulty}
            defaultValue={difficulty}
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
            defaultValue={gameMode}
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
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
