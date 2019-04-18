import { ExplorerState } from "./context";
import { store } from "../browser";

const setActiveUrl = ({ url }: { url: string }) => {
  store.setActiveUrl(url);
};

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
    case "SET_ACTIVE_URL":
      // Nasty side-effect, any way to avoid this without something like /// redux-saga?
      setActiveUrl({ url: action.payload });
      return { ...state };
    default:
      throw Error(`Unknown action type: ${action.type}`);
  }
};
