import { EventFromLogic, SnapshotFrom } from "xstate";
import { gameMachine } from "./gameMachine";

export type AppState = SnapshotFrom<typeof gameMachine>;
export type AppEvents = EventFromLogic<typeof gameMachine>;

export type AppContextType = {
  state: AppState;
  send: (event: AppEvents) => void;
};

export const gestures = [
  "ROCK",
  "PAPER",
  "SCISSORS",
  "LIZARD",
  "SPOCK",
] as const;

export type Gesture = (typeof gestures)[number];

export const beatMapper: Record<Gesture, Gesture[]> = {
  ROCK: ["SCISSORS", "LIZARD"],
  SCISSORS: ["PAPER", "LIZARD"],
  PAPER: ["ROCK", "SPOCK"],
  LIZARD: ["SPOCK", "PAPER"],
  SPOCK: ["SCISSORS", "ROCK"],
};

export type Difficulty = "random" | "tactician" | "unfair";
export type GameMode = "default" | "spicy";

export type Settings = {
  difficulty: Difficulty;
  gameMode: GameMode;
  volume: number;
};
