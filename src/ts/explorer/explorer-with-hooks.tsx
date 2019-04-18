import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { defaultState, State } from "../state";
import { store } from "../browser";
import { hot } from "react-hot-loader";
import ActiveStateComponent from "./activeStateComponent";
import LabeledComponent from "./list-item/labeledComponent";

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
      <h1>Welcome to Unmock API labeling explorer!</h1>
      <ActiveStateComponent active={state.active} />
      <LabeledComponent labeled={state.labeled} />
    </div>
  );
};

export default hot(module)(ExplorerComponent);
