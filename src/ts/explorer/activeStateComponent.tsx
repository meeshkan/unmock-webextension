import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Active } from "../state";

interface Props {
  active: Active;
}

class ActiveStateComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { active } = this.props;
    const { activePath, url, phase } = active;
    return (
      <div>
        <div id="active">
          <p>Active URL: {url}</p>
          <p>Active phase: {phase}</p>
          <p>Active path: [{activePath.join(", ")}]</p>
        </div>
      </div>
    );
  }
}

export default hot(module)(ActiveStateComponent);
