import { ReducerActionType } from "./reducer";
import { State } from "../state";

/**
 * Actions to dispatch state changes.
 */
export type Actions = {
  triggerFetchSuccess(data: State): void;
  triggerSetActiveUrl(url: string): void;
};

/**
 * Convert plain-english actions to dispatches.
 * @param dispatch Message dispatcher
 * @returns Actions.
 */
export const useActions = (
  dispatch: React.Dispatch<ReducerActionType>
): Actions => ({
  triggerFetchSuccess: (data: State) =>
    dispatch({ type: "FETCH_SUCCESS", payload: data }),
  triggerSetActiveUrl: (url: string) =>
    dispatch({ type: "SET_ACTIVE_URL", payload: url }),
});
