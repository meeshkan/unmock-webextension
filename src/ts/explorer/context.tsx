import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { State } from "../state";
import { store } from "../browser";
import { hot } from "react-hot-loader";
import { explorerStateReducer } from "./reducer";
import { Actions, useActions } from "./actions";

export type ExplorerState = {
  data: State;
  isLoading: boolean;
};

const useData = (): { state: ExplorerState; actions: Actions } => {
  const initialState: ExplorerState = {
    isLoading: false,
    data: null,
  };
  const [state, dispatch] = React.useReducer(
    explorerStateReducer,
    initialState
  );

  const actions = useActions(dispatch);

  const fetchData: () => Promise<void> = async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const newData = await store.getLocalStorage();
      actions.triggerFetchSuccess(newData);
    } catch (err) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []); // Does not depend on any state changes so only called once

  const handleDataChange = (newData: State) => {
    dispatch({ type: "DATA_UPDATED", payload: newData });
  };

  // Subscribe to store changes
  React.useEffect(() => {
    const listener = store.subscribeToChanges(handleDataChange);
    return () => store.unsubscribeToChanges(listener);
  });

  return { state, actions };
};

type ExplorerDataContextType = {
  data: State;
};

type ExplorerActionsContextType = {
  actions: Actions;
};

export const ExplorerDataContext = React.createContext(
  null as ExplorerDataContextType
);

export const ExplorerActionsContext = React.createContext(
  null as ExplorerActionsContextType
);

export const ExplorerContextProvider = ({ children }) => {
  const { state, actions } = useData();

  return (
    <ExplorerActionsContext.Provider value={{ actions }}>
      <ExplorerDataContext.Provider value={{ data: state.data }}>
        {children}
      </ExplorerDataContext.Provider>
    </ExplorerActionsContext.Provider>
  );
};

export default hot(module)(ExplorerContextProvider);