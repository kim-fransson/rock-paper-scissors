import { setup, assign, assertEvent } from "xstate";
import { Gesture } from "./app.model";

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
    setCPU: assign({
      // ...
    }),
    setWinner: assign({
      // ...
    }),
    updateScore: assign({
      // ...
    }),
    setPlayer: assign({
      player: ({ event }) => {
        assertEvent(event, "player.pickedGesture");
        return event.gesture;
      },
    }),
  },
  guards: {
    checkWin: function ({ context, event }) {
      console.log({
        context,
        event,
      });
      return true;
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
        },
        cpuPickedGesture: {
          always: [
            {
              target: "#rockPaperScissorGame.gameOver.winner",
              guard: {
                type: "checkWin",
              },
            },
            {
              target: "#rockPaperScissorGame.gameOver.draw",
            },
          ],
        },
      },
    },
    gameOver: {
      initial: "winner",
      on: {
        "player.playAgain": {
          target: "pickGesture",
        },
      },
      states: {
        winner: {
          entry: [
            {
              type: "setWinner",
            },
            {
              type: "updateScore",
            },
          ],
          tags: "winner",
        },
        draw: {
          tags: "draw",
        },
      },
    },
  },
});
