export const Gestures = ["ROCK", "PAPER", "SCISSORS"] as const;

export type Gesture = (typeof Gestures)[number];

export const beatMapper: Record<Gesture, Gesture[]> = {
  ROCK: ["SCISSORS"],
  SCISSORS: ["PAPER"],
  PAPER: ["ROCK"],
};
