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
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2BjA1gBQIYAcxkBldAS1llWQHFcBbMAYgFdYiA6AF1SigBswAJRaDYAbQAMAXUSh8qWGS5lUAOzkgAHogBsAdgBMHACwBGXboDMR3WZv6rAGhABPRGcMBfLy7RY8QhJySmo6Rg58MiwaOC4WZGZ8flxXTiisSFjYeMSpWSQQBSUVdU0dBABWfRd3BDMADjMOI3tK9rMLSUlDBp8-DBwCIlIKKloGMA50fBZsaMxs3KmAd1xlMjUoADFqAGFsAFUmLRzcLincADML5AAKSu6nyQBKJn8hoNHQiYiZuYWSwSq3WKi2u2QB0O+U0xQ2ZUKFUMuhMpjMlSsKP0ZkkVh6DVqiBMlVRAE4GvpJOjHIYjCZ+iAPoERiFxuEpv95jE4sDprMuZgsjzEiczhcONdbg8nm8mcNgmMwpM+QDuTleZyFkL1XkZLDFPCNIi9JYWpJKVZDKT0eTcYSEFYTKSOJZ9KT9LpcY0zKT6b5GYNmQqfuyVQKgYkw1qIBHmKcuOdLjciNLurLA-LvmzlZq1cso5kY8KwOIzAV5AbSkbQBVLLozRarTaGna3ESSRxyZTqZa6ZJKgy5V9WUq-vzAcWC4Kizq42Kk1LHmn3hnh4rfhzx3mNVvp7HxIZy0VK6pq9oTfXKY3rZVbc421VMRwGtbHW77DiTPpB6uWevQysmxMMkqTpCkrgAIJQOsagwoUcJVuUHg4vWX7WiYFJWJULaOvajoNBwFg0iY1gYpUZg-gEmYjhuHD8IoSTgWBqRQTBcEViUp5IfUZjEhwkiWFYFIUtYvomPaxJWKYDTWCiViYoY7S6JRnx-iGyoQMguArMBTHIJE4GsZs7HHpxCI1ogpKkpUHBYb6uJKboOH2mRtmkgJpK6ORgkoj4-pqKgEBwJoQ5qdmjD6mZZ4VAAtOJD6+m5DQmCY5qpS+7qkipQZZqOUwZIsxaRYa3H2I6LpmNijz6C2qXEvahg+hwhgta6GKVZIvp9P6oXBuFm6qoVs7FYhxoICleEmMY1oGN0TQtSSinZdR-45rusYcGsGzgvsRwjVxY2koYEl4s1Vieei2FWiS+h+gMVFrupY6DRtuZ7kV8EnuZ57jVSzWeTJjXmk0XnxXUJinYY512O0DTXV+d0Bg9YV5Ztmz7d9FTucY50Cci1oNEJvp4YYZKGP2+jYXD-Y9Mtj39XRDEY9FlmpZ2+g1ZY-Yvi2lQnZIZ3WRSvq6O5WEDj1v59ajmnacz3HuTZDQko0jVfj6-YuVhHCw15lS9EJt5WH5XhAA */
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
            "1000": {
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
            "1000": [
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
