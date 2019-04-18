import * as React from "react";
import { defaultState, State } from "../state";
import { store } from "../browser";
import ActiveStateComponent from "./activeStateComponent";

const ExplorerComponent = () => {
  const initialState: State = defaultState;
  const [state, setState] = React.useState(initialState);

  function handleStateChange(newState: State) {
    setState(newState);
  }

  // Set initial state, only called in the first time
  React.useEffect(() => {
    const fetchState: () => Promise<void> = async () => {
      const newState = await store.getLocalStorage();
      setState(newState);
    };
    fetchState();
  }, []);

  // Subscribe to store changes
  React.useEffect(() => {
    const listener = store.subscribeToChanges(handleStateChange);
    return () => store.unsubscribeToChanges(listener);
  });

  return (
    <div>
      <ActiveStateComponent active={state.active} />
    </div>
  );
};

export default ExplorerComponent;
