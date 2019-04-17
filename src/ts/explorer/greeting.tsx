import * as React from "react"; // import { hot } from "react-hot-loader";

interface Props {
  who: string;
}

class GreetingComponent extends React.Component<Props> {
  public render() {
    const { who } = this.props;
    return (
      <div>
        <p>Hello, {who}!</p>
      </div>
    );
  }
}

// eexport default hot(module)(GreetingComponent);
export default GreetingComponent;
