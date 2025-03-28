import { setup, assign, assertEvent } from "xstate";
import { beatMapper, Gesture, gestures, Settings } from "./app.model";

export const gameMachine = setup({
  types: {
    context: {} as {
      player?: Gesture;
      winner?: Gesture;
      score: number;
      cpu?: Gesture;
      isRulesOpened: boolean;
      isSettingsOpened: boolean;
      settings: Settings;
    },
    events: {} as
      | { type: "player.toggleRules" }
      | { type: "player.toggleSettings" }
      | { type: "player.startGame" }
      | { type: "player.pickedGesture"; gesture: Gesture }
      | { type: "player.playAgain" },
  },
  actions: {
    setCPU: function ({ context }) {
      let gesture: Gesture;
      switch (context.settings.difficulty) {
        case "random": {
          const index = Math.floor(Math.random() * gestures.length);
          gesture = gestures[index];
          break;
        }
        case "tactician": {
          const numberOfGestures =
            context.settings.gameMode === "default" ? 3 : 5;

          if (!context.cpu) {
            const index = Math.floor(Math.random() * numberOfGestures);
            gesture = gestures[index];
            // what was cpu previous game, and did cpu won
          } else if (context.winner === context.cpu) {
            const index =
              (gestures.indexOf(context.cpu) + 1) % numberOfGestures;
            gesture = gestures[index];
          } else {
            const index =
              (gestures.indexOf(context.cpu) - 1 + numberOfGestures) %
              numberOfGestures;
            gesture = gestures[index];
          }
          break;
        }
        case "unfair": {
          gesture = Object.keys(beatMapper).find((key) =>
            beatMapper[key as Gesture].includes(context.player!)
          ) as Gesture;
          break;
        }
      }
      context.cpu = gesture;
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
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2BjA1gBQIYAcxkBldAS1llWQHFcBbMAYnwBtcBPIgOgBdUoUVmABKAV2GwA2gAYAuolD5UsMrzKoAdopAAPRDIA0IDgYC+Z42ix5CJcpWp1GLdl2R8BQsMTC91mlDS8jrKqupaOvoIACwAzACM3ACcAKwJMckAHFmZcWmpccamCAC0WdxZcXEyyckAbJkJDakATBZWGDgERKQUVLQMYNxkEMKunDywvLjIvM5gsgpIIGFqGtor0QDscRUyCan1qTI1rXVFJogxzZU3WQmt+Qn1yS9xHSDW3XZ9joOMbj4MhYGhwXhiZDMNiTDzArCQMHTSGLEIrNYRTagaKpbbFRCtbb1SrbVo3R7HI4PD6WL5dWy9BwDBbcdD4MTYEGYJEQqHcADuuHWgQAYtQAMLYACqTF001wvGGuAAZorkAAKVonGQASiY3wZ9n6TiGrPZnNB4JRAqFASgYuQkqlS1CKnWkS2BNSMW4rSy6WOhyyMmp9XxCDaPtxx1OqWSMTae0+Bp6Rv+LLZHK5POtmYtmERVqhsvliu4KrVmu1epTvyZJsBeezReGTYREBzUJd6LdmKiiHqjW4cSO23jr3ybTxVwjp19MXqRLijVaCVyy+T9NTf2Zprb3JbZqz7c7zDlMzLFaIVZkuv1W7rxoBrfNzeRfP3hffiwSyyUvY2fsEEHH0R0XcdkknQlw3qENuCOXE2hkeoEm2XZUk3Gxt3rZ8j3zU88K5L9eTPUslVVa8tVvGsH0ZJ8M1fS1v0Ik8WykVo-1WACPWxAdvWHUcIKg6cSleGRuBibZbxOZIZBOLJWnaWlazo9NTX5MhNAmdwgTcABBKAhU0bt-3CQDPQQBIrOJBIDlgl5ClaeonPDE4km2BcrMSGInkyU5MJ+VTd0BVgVGhNweBhDgDKMkyuLMni9EQKzCngl4GjiTI-Tk1oYJkbZuGQ9IDiOZo9hpTosMfNTAQgZBcH5bTIv0wzNLijFzN4hA6lA+JtgUw5GgyBIYJyFJXhiW9JsjV4LFpTRUAgOAdBUtNgrAV0EqxJKyhicM12SeDMkk7Yg3y-IAsNHcG2GUZhE291tuiY5QMEhdILSaCZx88Tb2SfqrNaWoZGmy7sPo014QPb8Hr7CyEkyn1kieJzZJQ6p41ckGJIyZD-SBx4ZCUyrArWm6WOhkjYc6naYj277Hng5DFPywkajiDyweq9aKYIwVhXtCVpWpxLomR8NMkOhS3nyhMgayY4KrpKqgvJ-cCM-DsWxFp7ED2CpUIO1n0n6sNvrqSpzlsjykIVwoudV3CNO2jrRcQGWUlOvZ6geXFbxE65+oki5KWR-IFIw5TaLJ3DQtgDaey2oD4wqb2PLtyMR1cqpKjXEc4zK5dieV0nrtwuqGp15O5zeSbZLJKS5LN0SskOhHdleBG6bjGkLCAA */
  context: {
    score: 0,
    isRulesOpened: false,
    isSettingsOpened: false,
    settings: {
      difficulty: "random",
      gameMode: "default",
    },
  },
  id: "rockPaperScissorGame",
  initial: "idle",
  on: {
    "player.toggleRules": {
      actions: assign(({ context }) => {
        return {
          isRulesOpened: !context.isRulesOpened,
        };
      }),
    },
    "player.toggleSettings": {
      actions: assign(({ context }) => {
        return {
          isSettingsOpened: !context.isSettingsOpened,
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
