import { ReducerActionType } from "./reducer";
import { State } from "../state";
import { store } from "../browser";

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

export const applyLoggingMiddleware = (
  dispatch: React.Dispatch<ReducerActionType>
) => (action: ReducerActionType) => {
  console.log(`Got action: ${JSON.stringify(action)}`);
  dispatch(action);
};

export const applyStoreActionsMiddleware = (
  dispatch: React.Dispatch<ReducerActionType>
) => (action: ReducerActionType) => {
  switch (action.type) {
    case "SET_ACTIVE_URL":
      console.log(`Setting active URL: ${action.payload}`);
      store.setActiveUrl(action.payload);
      break;
    default:
      dispatch(action);
  }
};
