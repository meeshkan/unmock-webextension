import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import ActiveStateComponent from "./activeStateComponent";
import LabeledComponent from "./list-item/labeledComponent";
import { Button } from "react-bootstrap";
import { ExplorerDataContext, ExplorerActionsContext } from "./context";

const ExplorerComponent = () => {
  const isLoading = false;
  const { data } = React.useContext(ExplorerDataContext);
  const { actions } = React.useContext(ExplorerActionsContext);

  return (
    <div>
      <h1>Welcome to Unmock API labeling explorer!</h1>
      {data === null || isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ActiveStateComponent active={data.active} />
          <LabeledComponent labeled={data.labeled} />
          <Button onClick={() => actions.setActiveUrl("https://www.unmock.io")}>
            Set active URL
          </Button>
        </div>
      )}
    </div>
  );
};

export default hot(module)(ExplorerComponent);
