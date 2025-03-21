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
          target: "cpuSelectedGesture",
          actions: {
            type: "setPlayer",
          },
        },
      },
    },
    cpuSelectedGesture: {
      initial: "waitingForCPU",
      states: {
        waitingForCPU: {
          after: {
            "5000": {
              target: "cpuPickedGesture",
            },
          },
          entry: {
            type: "setCPU",
          },
          tags: "waiting",
        },
        cpuPickedGesture: {
          after: {
            "5000": [
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
    },
    draw: {
      on: {
        "player.playAgain": {
          target: "pickGesture",
        },
      },
    },
  },
});
