import * as React from "react";
import { State, Phase } from "../browser/state";
import { store } from "../browser";
import ActiveStateComponent from "./activeStateComponent";

interface Props {}

const ExplorerComponent = (props: Props) => {
  const [count, setCount] = React.useState(0);
  const initialState: State = {
    active: {
      phase: Phase.ADD_PATH,
    },
    labeled: {},
  };
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
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <ActiveStateComponent active={state.active} />
    </div>
  );
};

export default ExplorerComponent;
