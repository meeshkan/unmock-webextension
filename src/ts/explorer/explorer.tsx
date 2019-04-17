import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { State as StorageState } from "../browser/state";
import { Button, Form } from "react-bootstrap";

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
    const { active, labeled } = this.props.localStorage;
    const { activePath, url, phase } = active;
    return (
      <div>
        <h1>Welcome to Unmock API labeling explorer!</h1>
        <h3>It is {this.state.date.toLocaleTimeString()}.</h3>
        <div id="active">
          <p>Active URL: {url}</p>
          <p>Active phase: {phase}</p>
          <p>Active path: {activePath}</p>
        </div>
        <div id="labeled">
          <p>Labeled URLs: {Object.keys(labeled).join(", ")}</p>
        </div>
        <div>
          <Form>
            <Form.Group controlId="textarea">
              <Form.Label>Current state</Form.Label>
              <Form.Control
                as="textarea"
                plaintext
                readOnly
                rows="5"
                value={JSON.stringify(this.props, null, 2)}
              />
            </Form.Group>
          </Form>
        </div>
        <Button onClick={() => console.log("Button pressed!")}>
          My first button!
        </Button>
      </div>
    );
  }
}

export default hot(module)(Clock);
