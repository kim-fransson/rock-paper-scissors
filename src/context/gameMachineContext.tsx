import { createActorContext } from "@xstate/react";
import { gameMachine } from "../gameMachine";

export const GameMachineContext = createActorContext(gameMachine);
