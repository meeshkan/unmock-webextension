import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { State } from "../state";
import { store } from "../browser";
import { hot } from "react-hot-loader";
import ActiveStateComponent from "./activeStateComponent";
import LabeledComponent from "./list-item/labeledComponent";

const useData = () => {
  const [data, setData] = React.useState(null);

  // Set initial state, only called in the first time
  React.useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      const newData = await store.getLocalStorage();
      setData(newData);
    };
    fetchData();
  }, []); // Does not depend on any state changes so only called once

  const handleDataChange = (newData: State) => {
    setData(newData);
  };

  // Subscribe to store changes
  React.useEffect(() => {
    const listener = store.subscribeToChanges(handleDataChange);
    return () => store.unsubscribeToChanges(listener);
  });
  return { data, setData };
};

const ExplorerComponent = () => {
  const { data } = useData();

  return (
    <div>
      <h1>Welcome to Unmock API labeling explorer!</h1>
      {data === null ? (
        <div>"Loading..."</div>
      ) : (
        <div>
          <ActiveStateComponent active={data.active} />
          <LabeledComponent labeled={data.labeled} />
        </div>
      )}
    </div>
  );
};

export default hot(module)(ExplorerComponent);
