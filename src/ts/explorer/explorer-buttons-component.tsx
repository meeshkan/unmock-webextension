import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";
import { Button } from "react-bootstrap";
import { Labeled } from "../state";
import { Actions } from "./actions";

interface Props {
  labeled: Labeled;
  actions: Actions;
}

const ExplorerButtonsComponent = (props: Props) => {
  const { actions, labeled } = props;

  async function exportLabeled() {
    actions.triggerDownload(labeled);
  }

  async function initialize() {
    await actions.triggerInitializeStore();
  }

  return (
    <div>
      <Button id="export" onClick={exportLabeled}>
        Export
      </Button>
      <Button id="initialize" onClick={initialize}>
        Clear all
      </Button>
    </div>
  );
};

export default ExplorerButtonsComponent;
