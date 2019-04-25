import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Alert } from "react-bootstrap";

interface Props {
  userState: any;
}

class UserStateComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { userState } = this.props;
    return (
      <div>
        <div id="active">
          <h3>User state</h3>
          <Alert variant="info">
            Active user state: {JSON.stringify(userState, null, 2)}
          </Alert>
        </div>
      </div>
    );
  }
}

export default hot(module)(UserStateComponent);
