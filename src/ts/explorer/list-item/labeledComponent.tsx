import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Active, Labeled, Paths, Path } from "../../state";
import { ExplorerActionsContext } from "../context";

interface Props {
  active: Active;
  labeled: Labeled;
}

function LabeledUrlsComponent(props: Props) {
  const { labeled } = props;
  const { actions } = React.useContext(ExplorerActionsContext);

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
    return (
      <div id="labeled">
        <h3>Labeled URLs</h3>
        <ul>
          {Object.keys(labeled).map((labeledUrl: string) => (
            <li key={labeledUrl}>
              <div onClick={() => handleClick(labeledUrl)}>{labeledUrl}</div>
              {renderPaths(labeled[labeledUrl])}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>{renderLabeled()}</div>;
}

export default hot(module)(LabeledUrlsComponent);
