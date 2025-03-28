import { Dialog, DialogTrigger, Popover, Heading } from "react-aria-components";
import { Button } from "../ui";
import { FaGear } from "react-icons/fa6";
import { GameMachineContext } from "../../context/gameMachineContext";
import { RadioGroup, Radio, Label } from "react-aria-components";
import { Difficulty } from "../../app.model";

import styles from "./GameSettings.module.scss";

export const GameSettings = () => {
  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);

  const isSettingsOpened = state.context.isSettingsOpened;
  const { difficulty } = state.context.settings;

  const handleOnOpenChange = () => {
    send({ type: "player.toggleSettings" });
  };

  const handleDifficultyChange = (difficulty: string) => {
    state.context.settings.difficulty = difficulty as Difficulty;
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
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
