import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Alert } from "react-bootstrap";
import { Labeled, Paths, Path } from "../../state";
import { Actions } from "../actions";
import { UserStateConfig } from "../../browser/machine";

interface Props {
  userState: UserStateConfig;
  labeled: Labeled;
  actions: Actions;
}

function LabeledUrlsComponent(props: Props) {
  const { actions, userState, labeled } = props;

  function handleClick(url = "https://www.unmock.io") {
    actions.triggerSetActiveUrl(url);
  }

  function renderPath(path: Path) {
    return (
      <ul>
        {Object.keys(path).map(operation => (
          <li key={operation}>{operation}</li>
        ))}
      </ul>
    );
  }

  function renderPaths(paths: Paths) {
    return (
      <ul>
        {Object.keys(paths).map(path => (
          <li key={path}>
            {path}
            {renderPath(paths[path])}
          </li>
        ))}
      </ul>
    );
  }

  function renderLabeled() {
    const buttonVariant = (labeledUrl: string) =>
      labeledUrl === userState.context.url ? "success" : "info";
    return (
      <div id="labeled">
        <h3>Labeled URLs</h3>
        <ul>
          {Object.keys(labeled).map((labeledUrl: string) => (
            <Alert key={labeledUrl} variant={buttonVariant(labeledUrl)}>
              <div onClick={() => handleClick(labeledUrl)}>{labeledUrl}</div>
              {renderPaths(labeled[labeledUrl])}
            </Alert>
          ))}
        </ul>
      </div>
    );
  }

  return <div>{renderLabeled()}</div>;
}

export default hot(module)(LabeledUrlsComponent);
