import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";
import { Button } from "react-bootstrap";
import { utils } from "../browser";
import { Labeled } from "../state";
import { store } from "../browser";

interface Props {
  labeled: Labeled;
}

const ExplorerButtonsComponent = (props: Props) => {
  const { labeled } = props;
  async function exportLabeled() {
    console.log("Exporting data...");
    const text = JSON.stringify(labeled, null, 2);
    const url = "data:application/json;base64," + btoa(text);
    utils.downloadTo({ url });
    console.log(`Exported: ${text}`);
  }

  async function initialize() {
    await store.initialize();
  }

  return (
    <div>
      <Button id="export" onClick={exportLabeled}>
        Export
      </Button>
      <Button id="initialize" onClick={initialize}>
        Initialize
      </Button>
    </div>
  );
};

export default ExplorerButtonsComponent;
