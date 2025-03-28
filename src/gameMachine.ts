import { setup, assign, assertEvent } from "xstate";
import { Gesture, Gestures } from "./app.model";

export const gameMachine = setup({
  types: {
    context: {} as {
      player?: Gesture;
      winner?: Gesture;
      score: number;
      cpu?: Gesture;
      isRulesOpened: boolean;
    },
    events: {} as
      | { type: "user.toggleRules" }
      | { type: "player.pickedGesture"; gesture: Gesture }
      | { type: "player.playAgain" },
  },
  actions: {
    setCPU: function ({ context }) {
      const randomIndex = Math.floor(Math.random() * Gestures.length);
      context.cpu = Gestures[randomIndex];
    },
    determineWinner: function ({ context }) {
      const { player, cpu } = context;
      if (player === cpu) {
        context.winner = undefined;
        return;
      }

      if (
        (player === "ROCK" && cpu === "SCISSORS") ||
        (player === "PAPER" && cpu === "ROCK") ||
        (player === "SCISSORS" && cpu === "PAPER")
      ) {
        context.winner = player;
      } else {
        context.winner = cpu;
      }
    },
    updateScore: function ({ context }, params: { points: number }) {
      context.score = context.score + params.points;
    },
    setPlayer: assign({
      player: ({ event }) => {
        assertEvent(event, "player.pickedGesture");
        return event.gesture;
      },
    }),
  },
  guards: {
    playerWin: function ({ context }) {
      return context.winner === context.player;
    },
    playerLose: function ({ context }) {
      return context.winner === context.cpu;
    },
    draw: function ({ context }) {
      return !context.winner;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2BjA1gBQIYAcxkBldAS1llWQHFcBbMAYgFdYiA6AF1SigBswAJRaDYAbQAMAXUSh8qWGS5lUAOzkgAHogBsAdn0cArAEZ9ugMwAOAJwAmG5YAslgDQgAnolP2Avn4eaFh4hCTklNR0jBz4ZFg0cFwsyMz4-LienHFYkImwyalSskggCkoq6po6CMb6Ht4IptamJrYWjoaWBpaSzgFBGDgERKQUVLQMYBzo+CzY8Zj5hdMA7rjKZGpQAGLUAMLYAKpMWgW4XNO4AGaXyAAU9saSkgCUTMHDYWORkzGz80WyxSaw2Km2e2QhyOxU05U2VVKNSezg49msZl0kieums1kk+nsDUQzmMqPxplJ2N09l0xhpugGIE+oVGEQm0WmAIWCSSIJmcx5mDyfNSp3Olw4Nzuj2ebw+Q1Z4XGUSmAsBvIK-O5ixFWqKMjhigRGiRejJHEs9Os6P0tlMtmepmJCBctg4zhtznszkkNId5iZLJGyt+nPVQuBqQjuogUeYZy4FyutyIspe72D33Zqv+gqBoq5+dyccL4lMJXkxsqptANTpqKtuNt9sdkmdXhJFopzl0vgdfvspiDipDPw5ap1mpWMZL8fFScl0rTTwzCpCY5zfyLGqWhdnwtL+rA4nslbK1dUte05sb1pbDqdLuM3Q4+kkdWsrjJ9gslhHG7Ziq24cKsWxMOkmTZBkngAIJQBsaiwqU8I1tUPimH6HCYeYNi2M4vYuPUnaus4Ri2C0hgEWSdS4gBXxssB4b8IoaQwdBmTwYhyFVhUV7oU0lKWCY5iYS+lj2LSuguqSwm9JILSmH2lJkf+gTMqOQFhmqEDILgqwQexyCxDBXFbDxF58YidaILY+GWq4GKEr+-Ydo0L7GGiH6mERva6H2anqWoqAQHAmhZox2mMEaVnXjUAC0zguvZv5keYtgEoS2JqYMgGRROMQ5Hux4xSaAk+QRHAOJYLh2N6NWmG5iDGI4lq0p0GKuH29FKuOuY7pGhalWhZoIARLouPYb6WI1dKUtYLievoPWbkxk7FsVM7rJsEIHMcw38aNDgyb0HAfr6pIEbYVp+st6kRaGBUDQWx4HnqKwHdZN6uni2H6AGxiUTi7gka4khnWSfRks413PAYK1aU9oFbJ9cW2S8VX-b6+i9r6dTEY0EmovoN0KfYDietiCP5f1HAsewqMCdd1iWtYBgkxiSl2ESoOnedUNXTd8P3ZpNMgbp+mM0dkjCfazg+Rz9JWLYz5WpaJNk1iNJDsOAR+EAA */
  context: {
    score: 0,
    isRulesOpened: false,
  },
  id: "rockPaperScissorGame",
  initial: "pickGesture",
  on: {
    "user.toggleRules": {
      actions: assign(({ context }) => {
        return {
          isRulesOpened: !context.isRulesOpened,
        };
      }),
    },
  },
  states: {
    pickGesture: {
      on: {
        "player.pickedGesture": {
          target: "cpuPickGesture",
          actions: {
            type: "setPlayer",
          },
        },
      },
    },
    cpuPickGesture: {
      initial: "waitingForCPU",
      states: {
        waitingForCPU: {
          after: {
            "2500": {
              target: "cpuPickedGesture",
            },
          },
          exit: {
            type: "setCPU",
          },
          tags: "waiting",
        },
        cpuPickedGesture: {
          after: {
            "2500": [
              {
                target: "#rockPaperScissorGame.win",
                guard: {
                  type: "playerWin",
                },
              },
              {
                target: "#rockPaperScissorGame.lose",
                guard: {
                  type: "playerLose",
                },
              },
              {
                target: "#rockPaperScissorGame.draw",
                guard: {
                  type: "draw",
                },
              },
            ],
          },
          entry: {
            type: "determineWinner",
          },
          tags: "ready",
        },
      },
    },
    win: {
      entry: {
        type: "updateScore",
        params: {
          points: 1,
        },
      },
      on: {
        "player.playAgain": {
          target: "pickGesture",
        },
      },
      tags: "gameOver",
    },
    lose: {
      entry: {
        type: "updateScore",
        params: {
          points: -1,
        },
      },
      on: {
        "player.playAgain": {
          target: "pickGesture",
        },
      },
      tags: "gameOver",
    },
    draw: {
      on: {
        "player.playAgain": {
          target: "pickGesture",
        },
      },
      tags: "gameOver",
    },
  },
});
