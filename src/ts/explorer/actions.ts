import { ExplorerState } from "./context";
import { ReducerActionType } from "./reducer";

export type Actions = {
  triggerSetActiveUrl(url: string): void;
};

export const useActions = (
  state: ExplorerState,
  dispatch: React.Dispatch<ReducerActionType>
): Actions => ({
  triggerSetActiveUrl: (url: string) =>
    dispatch({ type: "SET_ACTIVE_URL", payload: url }),
});
