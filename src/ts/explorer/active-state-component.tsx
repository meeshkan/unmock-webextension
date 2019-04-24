import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Active } from "../state";
import { Alert } from "react-bootstrap";

interface Props {
  active: Active;
}

class ActiveStateComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { active } = this.props;
    const { activePath, url, phase, userState } = active;
    return (
      <div>
        <div id="active">
          <h3>Active state</h3>
          <Alert variant="info">Active URL: {url}</Alert>
          <Alert variant="info">Active phase: {phase}</Alert>
          <Alert variant="info">Active path: [{activePath.join(", ")}]</Alert>
          <Alert variant="info">
            Active user state: {JSON.stringify(userState, null, 2)}
          </Alert>
        </div>
      </div>
    );
  }
}

export default hot(module)(ActiveStateComponent);
