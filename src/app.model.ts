export const gestures = ["ROCK", "PAPER", "SCISSORS"] as const;

export type Gesture = (typeof gestures)[number];

export const beatMapper: Record<Gesture, Gesture[]> = {
  ROCK: ["SCISSORS"],
  SCISSORS: ["PAPER"],
  PAPER: ["ROCK"],
};

export type Difficulty = "random" | "tactician" | "unfair";

export type Settings = {
  difficulty: Difficulty;
};
