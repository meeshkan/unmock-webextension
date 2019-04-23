import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import ActiveStateComponent from "./activeStateComponent";
import LabeledComponent from "./labeled/labeledComponent";
import { ExplorerDataContext } from "./context";
import ExplorerButtons from "./explorer-buttons-component";

export const ExplorerComponent = () => {
  const isLoading = false;
  const { data } = React.useContext(ExplorerDataContext);

  return (
    <div>
      <h1>Welcome to Unmock API labeling explorer!</h1>
      {data === null || isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ActiveStateComponent active={data.active} />
          <LabeledComponent active={data.active} labeled={data.labeled} />
          <ExplorerButtons labeled={data.labeled} />
        </div>
      )}
    </div>
  );
};

export default hot(module)(ExplorerComponent);
