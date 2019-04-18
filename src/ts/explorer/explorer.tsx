import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { State as StorageState } from "../browser/state";
import ActiveStateComponent from "./activeStateComponent";
import LabeledComponent from "./list-item/labeledComponent";

interface Props {
  localStorage: StorageState;
}

interface State {
  date: Date;
}

class Explorer extends React.Component<Props, State> {
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
    const { active, labeled } = this.props.localStorage;
    return (
      <div>
        <h1>Welcome to Unmock API labeling explorer!</h1>
        <h3>It is {this.state.date.toLocaleTimeString()}.</h3>
        <ActiveStateComponent active={active} />
        <LabeledComponent labeled={labeled} />
      </div>
    );
  }
}

export default hot(module)(Explorer);
