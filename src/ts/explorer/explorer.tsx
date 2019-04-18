import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { State } from "../state";
import { store } from "../browser";
import { hot } from "react-hot-loader";
import ActiveStateComponent from "./activeStateComponent";
import LabeledComponent from "./list-item/labeledComponent";

const useState = () => {
  const [state, setState] = React.useState(null);

  // Set initial state, only called in the first time
  React.useEffect(() => {
    const fetchState: () => Promise<void> = async () => {
      const newState = await store.getLocalStorage();
      setState(newState);
    };
    fetchState();
  }, []); // Does not depend on any state changes so only called once

  const handleStateChange = (newState: State) => {
    setState(newState);
  };

  // Subscribe to store changes
  React.useEffect(() => {
    const listener = store.subscribeToChanges(handleStateChange);
    return () => store.unsubscribeToChanges(listener);
  });
  return { state, setState };
};

const ExplorerComponent = () => {
  const { state } = useState();

  return (
    <div>
      <h1>Welcome to Unmock API labeling explorer!</h1>
      {state === null ? (
        <div>"Loading..."</div>
      ) : (
        <div>
          <ActiveStateComponent active={state.active} />
          <LabeledComponent labeled={state.labeled} />
        </div>
      )}
    </div>
  );
};

export default hot(module)(ExplorerComponent);
