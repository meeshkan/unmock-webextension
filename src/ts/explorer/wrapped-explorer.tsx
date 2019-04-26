import * as React from "react";
import { State } from "../state";
import { utils, storage } from "../browser";
import { hot } from "react-hot-loader";
import { explorerStateReducer } from "./reducer";
import {
  Actions,
  useActions,
  applyLoggingMiddleware,
  applyStoreActionsMiddleware,
} from "./actions";
import Explorer, { ExplorerState } from "./explorer";

const useData = (): { state: ExplorerState; actions: Actions } => {
  const initialState: ExplorerState = {
    isLoading: false,
    data: null,
  };
  const [state, dispatch] = React.useReducer(
    explorerStateReducer,
    initialState
  );

  const enhancedDispatch = applyLoggingMiddleware(
    applyStoreActionsMiddleware(dispatch)
  );

  const actions = useActions(enhancedDispatch);

  const fetchData: () => Promise<void> = async () => {
    enhancedDispatch({ type: "FETCH_INIT" });
    try {
      const newData = await storage.getLocalStorage();
      actions.triggerFetchSuccess(newData);
    } catch (err) {
      console.error("Failed fetching data", err);
      enhancedDispatch({ type: "FETCH_ERROR" });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []); // Does not depend on any state changes so only called once

  const handleDataChange = (newData: State) => {
    enhancedDispatch({ type: "DATA_UPDATED", payload: newData });
  };

  // Subscribe to store changes
  React.useEffect(() => {
    const listener = utils.subscribeToChanges(handleDataChange);
    return () => utils.unsubscribeToChanges(listener);
  });

  return { state, actions };
};

export const ExplorerContextProvider = () => {
  const { state, actions } = useData();
  return <Explorer state={state} actions={actions} />;
};

export default hot(module)(ExplorerContextProvider);
