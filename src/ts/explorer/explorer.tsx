import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import ActiveStateComponent from "./active-state-component";
import LabeledComponent from "./labeled/labeled-component";
import ExplorerButtons from "./explorer-buttons-component";
import { Actions } from "./actions";
import { State } from "../state";

export type ExplorerState = {
  data: State;
  isLoading: boolean;
};

interface Props {
  state: ExplorerState;
  actions: Actions;
}

export const ExplorerComponent = (props: Props) => {
  const { state, actions } = props;
  return (
    <div>
      <h1>Welcome to Unmock API labeling explorer!</h1>
      {state.data === null || state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ActiveStateComponent active={state.data.active} />
          <LabeledComponent
            actions={actions}
            active={state.data.active}
            labeled={state.data.labeled}
          />
          <ExplorerButtons actions={actions} labeled={state.data.labeled} />
        </div>
      )}
    </div>
  );
};

export default hot(module)(ExplorerComponent);
