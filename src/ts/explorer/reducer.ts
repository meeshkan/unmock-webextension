import { ExplorerState } from "./wrapped-explorer";

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export const explorerStateReducer = (
  state: ExplorerState,
  action: ReducerActionType
) => {
  console.log(`State change: ${JSON.stringify(action)}`);
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "DATA_UPDATED":
      return { ...state, data: action.payload };
    default:
      console.warn(`Got unknown action: ${JSON.stringify(action)}`);
  }
};
