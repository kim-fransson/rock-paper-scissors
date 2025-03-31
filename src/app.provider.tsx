/* eslint-disable react-hooks/exhaustive-deps */
import { useMachine } from "@xstate/react";
import { gameMachine } from "./gameMachine";
import { AppContext } from "./app.context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, send] = useMachine(gameMachine, {});

  return (
    <AppContext.Provider value={{ state, send }}>
      {children}
    </AppContext.Provider>
  );
};
