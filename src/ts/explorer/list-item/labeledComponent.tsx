import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Labeled } from "../../state";
import { Button, Form, Col, Row, Tab, ListGroup } from "react-bootstrap";
import { ExplorerActionsContext } from "../context";

interface Props {
  labeled: Labeled;
}

function LabeledUrlsComponent(props: Props) {
  const { labeled } = props;
  const { actions } = React.useContext(ExplorerActionsContext);

  function handleClick() {
    actions.triggerSetActiveUrl("https://www.unmock.io");
  }

  return (
    <div>
      <div id="labeled">
        <h3>Labeled URLs</h3>
        <ul>
          {Object.keys(labeled).map((labeledUrl: string) => (
            <li key={labeledUrl}>
              {labeledUrl}
              {
                <ul>
                  {Object.keys(labeled[labeledUrl]).map(path => (
                    <li key={path}>
                      {path}
                      <ul>
                        {Object.keys(labeled[labeledUrl][path]).map(
                          operation => (
                            <li key={operation}>{operation}</li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              }
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={handleClick}>Set active URL</Button>
    </div>
  );
}

export default hot(module)(LabeledUrlsComponent);
