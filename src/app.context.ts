import { createContext } from "react";
import { AppContextType, AppState } from "./app.model";

export const AppContext = createContext<AppContextType>({
  state: {} as AppState,
  send: () => {},
});
