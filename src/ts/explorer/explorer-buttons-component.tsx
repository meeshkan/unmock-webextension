import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";
import { Button } from "react-bootstrap";
import { utils } from "../browser";
import { Labeled } from "../state";
import { ExplorerActionsContext } from "./context";

interface Props {
  labeled: Labeled;
}

const ExplorerButtonsComponent = (props: Props) => {
  const { labeled } = props;
  const { actions } = React.useContext(ExplorerActionsContext);
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
