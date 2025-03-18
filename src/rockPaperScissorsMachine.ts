import { setup, assign } from "xstate";

type Symbol = "ROCK" | "PAPER" | "SCISSORS";

export const gameMachine = setup({
  types: {
    context: {} as {
      player?: Symbol;
      winner?: Symbol;
      score: number;
      cpu?: Symbol;
      isRulesOpened: boolean;
    },
    events: {} as
      | { type: "user.toggleRules" }
      | { type: "player.pickedSymbol" }
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
      // ...
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
  initial: "pickSymbol",
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
    pickSymbol: {
      on: {
        "player.pickedSymbol": {
          target: "cpuSelectSymbol",
          actions: {
            type: "setPlayer",
          },
        },
      },
    },
    cpuSelectSymbol: {
      initial: "waitingForCPU",
      states: {
        waitingForCPU: {
          after: {
            "5000": {
              target: "cpuPickedSymbol",
            },
          },
          entry: {
            type: "setCPU",
          },
        },
        cpuPickedSymbol: {
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
          target: "pickSymbol",
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
