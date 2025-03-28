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
      isSettingsOpened: boolean;
    },
    events: {} as
      | { type: "user.toggleRules" }
      | { type: "user.toggleSettings" }
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
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2BjA1gBQIYAcxkBldAS1llWQHFcBbMAYgFdYiA6AF1SigBswAJRaDYAbQAMAXUSh8qWGS5lUAOzkgAHogBsAdn0cArAEZ9ugEzHjkywBZJu0wBoQAT0SnJRy-vv++gDMjk66ABz6AL5RbmhYeIQk5JTUdIys7MjcvAJgxGBcKmpQEjKaCkoq6po6CLoGHKaWQf6W3naS4QCcbp4IzTFxGDgERKQUVLQMYBxkEIJM+Py47pywXLjIXOlgUrJIIJXKqhqHdcHhHJKmxrq2QXbd3UF9iPam3RzhH+HNQd1TLpAbogkMQPFRkkJqlpowOPgyFgaHAuCxkMxlqtOIisJAURt0XtyodjtUzqA6sZ9G8EH5dN99A5TM17nc-mDYhCRolxikprsOOh8CxsEjMAS0RiOAB3XAnEoAMWoAGFsABVJhaDa4LizXAAMz1yAAFNZJJIAJRMSG85KTNIzIUisXI1FE2Xy4pQZXINXq-YVRQnGrnRDWewcSzhMz3W7hLqmIK6WnGBwmCwPYzdexpoLhcG2sb22GC4Wi8WSj3l12YfHujFanV6jiG41m2xWm084swgVOmuVhuzQd4iBVjGB0nB8m1PS6SNBO76HPAgFpmkeRAPKP2AyghftH7Jws96H8x3w0cS4fOitjifMbWbFttogdi3Wovnh1wkcuodCWla96yAvZTAOeQZ1OOd6gXDglwMVcXm6DdaV0LoTHufQ0yccxgmMU8El7C8-zvWtH3I8VQKlJ9m31I133NLtvz5X8ywAt0wKoh9h3ESxIKOaDQ0pPRjEXZdkPXPx0O6SQOACC1bDk2xwksSwiKhNjSydGUyDUJYVjWbIsXcABBKB5TUKcoKqGCwwGFkGW8IEbnuIJLCsFMtwQWxTA4fxnCTUx7Baew5M5YZiJ-HT4X4RRMSMnEjIsqybKEuyRO0LxbiCEwgW6UFwujSQ03QnxrjjG47k+fNIu5aLtP7eEIGQXAZUM7ETJSyz9PSsl7NEhBnkXexWjU24FxC1wfIiK5CpzC1HDTPduhiLk1FQCA4E0ViS2asAg0yilsoQABaexaVMHoTHC+xIlKnx8yZTS7T7S9ZnmQQjpDE66nuCSkNW6TN36UL5Itbp9D+ZpJDk5bXpI9inVxG8wJ+2cHKTexI26FpPLk5wggBS6fNsSMPkcCJcNhjSuT296yOvR8McG06cdpD5LBMJx2lacTwlaOmoq0-aPp4tHaM9BUfVVDVWayuo8c555vksQEfFzSwuncxGYoOiXKJA8dhwVv7EHzK5zGuuSmTMaHvLB1W1I1-xcPCXX6bPJrxb0k6BsVxANY4KGkw9v5qQtUH3mhhTnmTGw8YBNTCK9xqxbI+L2DN2CcyufMDHutkHCXVNBe+a6l2zWrk2FhrRcZwVWvanOHIikOQrhuxFNKx29BupNgmBbHcxedaoiAA */
  context: {
    score: 0,
    isRulesOpened: false,
    isSettingsOpened: false,
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
    "user.toggleSettings": {
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
