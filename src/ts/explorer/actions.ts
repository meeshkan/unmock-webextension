import { ExplorerState } from "./context";
import { ReducerActionType } from "./reducer";
import { State } from "../state";

export type Actions = {
  triggerFetchSuccess(data: State): void;
  triggerSetActiveUrl(url: string): void;
};

export const useActions = (
  state: ExplorerState,
  dispatch: React.Dispatch<ReducerActionType>
): Actions => ({
  triggerFetchSuccess: (data: State) =>
    dispatch({ type: "FETCH_SUCCESS", payload: data }),
  triggerSetActiveUrl: (url: string) =>
    dispatch({ type: "SET_ACTIVE_URL", payload: url }),
});
