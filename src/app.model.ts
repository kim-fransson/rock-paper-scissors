export const Gestures = ["ROCK", "PAPER", "SCISSORS"] as const;

export type Gesture = (typeof Gestures)[number];
