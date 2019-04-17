import * as React from "react";
import { hot } from "react-hot-loader";
import { State as StorageState } from "../browser/state";

interface Props {
  localStorage: StorageState;
}

interface State {
  date: Date;
}

class Clock extends React.Component<Props, State> {
  private timerID: any;
  constructor(props: Props) {
    super(props);
    this.state = { date: new Date() };
  }

  public componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timerID);
  }

  public tick() {
    this.setState({
      date: new Date(),
    });
  }

  public render() {
    return (
      <div>
        <h1>Welcome to Unmock API labeling explorer!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h3> Current state: {JSON.stringify(this.props)}</h3>
      </div>
    );
  }
}

export default hot(module)(Clock);
