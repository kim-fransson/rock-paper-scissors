import { setup, assign, assertEvent } from "xstate";
import { beatMapper, Gesture, Gestures } from "./app.model";

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
      | { type: "player.startGame" }
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

      if (beatMapper[player!].includes(cpu!)) {
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
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2BjA1gBQIYAcxkBldAS1llWQHFcBbMAYgFdYiA6AF1SigBswAJRaDYAbQAMAXUSh8qWGS5lUAOzkgAHogCsugEwddATgAcAFgsBmAIy2T92wBoQAT0QBaAOy6Oki28zOxNdSQA2CIsDAF8Y1zQsPEISckpqOkYOfDIsGjguFmRmfH5cN04crEh82ELiqVkkEAUlFXVNHQRdb1cPBFszW2MTb3DvW2trEwtDQziEjBwCIlIKKloGMA50fBZsXMxa+u2Ad1xlMjUoADFqAGFsAFUmLTrcLm3cADNP5AAKAxhSQASiYiWWKTW6U2WV2+0OxyKZwuKmud2QjyejU0rUuHWaXSBFg4BjMuls4VMkhM4QswT6iFmJLMklsFNsFlsBic4QWIAhyVWaQ2mW28IOeQKyJ2e0lmBq0uKr3enw4Pz+gOBYMFK1S6wyW1lCKldRlEsOirNDRkuMU+I0hMQVJJ1l04Us1m81g93gMJkZCGsFhMHHpBkCZgMkhjoVC-N1UJFhrhcsRSvFaeqECRyreXA+X1+RC1MZ1SyF+phYuN8tzmZNCpzGfEtia8nt7UdoC6Lo4bo9Nm9vv9geZHFZ7PsXJ59nGCYreuhoqNFtNJ1rlub1uY+cL6uLAKBZfBi6TBthDbrGc32fr4gM7ZandU3e0zt0rvdnuHZj9AfcPQfQ4bxJB6RxKRMUJwmsBckiXZNLw4U4riYUpykqMo3AAQSgC41BxZo8S7TpEHsCIOFsNkYPMAxwnsAxekAoNAg4cxbG8ExrAiTkuQsODIWFC8a34RQSiwzDylw-DCI7NpX1IgZOWsYwOLA6IKUkAxrAMMddBU7jJCjcJGODHoIgEytlxTbYIGQXBTjQiTkGyLDpKuWTn3kgke0QKDXRsIZ2RnKJA30vxowpP9OK9SJdEshDhKNMgIEEJyMJc95kC4MVPOIhSnQQGCjCGaIhjGbw-W9QMqOGOlWUsVloPdWD+TUVAIDgTREyE6stjtby3y6TwLBqlSoLsaMZh0sIxj5eIBTPXqVyyKojgzAaHUUyZgzY7TuLpYMbEDHlQ0kL1Jm5ek4xMBLzz61NG3rTaSMKqxA2DIxvXsIJAnCD14oWnqqxWq90x3ZDUSuW4HmeF6Ct8hATF05ibEkfxPyMmCo29Wk7uWmzb3WiG1ybZ6iJfHz3yDMwzEoiYTHOxwwOCN0x24jGLCx6wcemebFng+7QeQq54aprpGfR0ZlPMYMaTZ5idJJb0wn0tS-WmfGQcJ0T2DFoa-J5-szABjTJeO1GOfU7nebxoGlu1pC7Ic-XFMZ8bOU5IJ6O0+kwrdftvocUxAn0fj7cFgmkJSwRXbegOTNpNkyXGfbwhqtl+0pc7zosf6dtuuIYiAA */
  context: {
    score: 0,
    isRulesOpened: false,
  },
  id: "rockPaperScissorGame",
  initial: "idle",
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
    idle: {
      on: {
        "player.startGame": { target: "pickGesture" },
      },
    },
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
