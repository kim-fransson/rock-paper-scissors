/* eslint-disable react-hooks/exhaustive-deps */
import { useMachine } from "@xstate/react";
import { gameMachine } from "./gameMachine";
import { AppContext } from "./app.context";
import { AppState } from "./app.model";

const serializedState = localStorage.getItem("rps-state");
let previousState: AppState;

if (serializedState) {
  previousState = JSON.parse(serializedState);
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, send, service] = useMachine(gameMachine, {
    state: previousState ? gameMachine.resolveState(previousState) : undefined,
  });

  service.subscribe((state) => {
    localStorage.setItem("rps-state", JSON.stringify(state));
  });

  return (
    <AppContext.Provider value={{ state, send }}>
      {children}
    </AppContext.Provider>
  );
};
