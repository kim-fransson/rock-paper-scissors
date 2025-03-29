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

import { GameMachineContext } from "../../context/gameMachineContext";
import { RadioGroup, Radio, Label } from "react-aria-components";
import { Difficulty, GameMode } from "../../app.model";
import bubble from "../../assets/bubble.wav";
import pop1 from "../../assets/pop-1.wav";
import pop3 from "../../assets/pop-3.wav";
import switchOn from "../../assets/switchOn.mp3";
import switchOff from "../../assets/switchOff.mp3";

import { Button } from "../ui";

import styles from "./GameSettings.module.scss";

export const GameSettings = () => {
  const { send } = GameMachineContext.useActorRef();
  const state = GameMachineContext.useSelector((state) => state);
  const isSettingsOpened = state.context.isSettingsOpened;
  const { difficulty, gameMode, volume } = state.context.settings;

  const [playBubble] = useSound(bubble, { volume: 0.5 * volume });
  const [playOpen] = useSound(pop1, { volume: 0.5 * volume });
  const [playClose] = useSound(pop3, { volume: 0.5 * volume });
  const [playSwitchOn] = useSound(switchOn, { volume: 0.5 * volume });
  const [playSwitchOff] = useSound(switchOff, { volume: 0.5 * volume });

  const handleOnOpenChange = () => {
    if (isSettingsOpened) {
      playClose();
    } else {
      playOpen();
    }
    send({ type: "player.toggleSettings" });
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
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
