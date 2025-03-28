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
export type GameMode = "default" | "spock";

export type Settings = {
  difficulty: Difficulty;
  gameMode: GameMode;
};
