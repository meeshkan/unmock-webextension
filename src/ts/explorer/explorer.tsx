import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { State as StorageState } from "../browser/state";
import { Button, Form, Col, Row, Tab, ListGroup } from "react-bootstrap";
import ActiveStateComponent from "./activeStateComponent";

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
    const { activePath, url, phase } = active;
    return (
      <div>
        <h1>Welcome to Unmock API labeling explorer!</h1>
        <h3>It is {this.state.date.toLocaleTimeString()}.</h3>
        <ActiveStateComponent active={active} />
        <div id="labeled">
          <h3>Labeled URLs</h3>
          <ul>
            {Object.keys(labeled).map((labeledUrl: string) => (
              <li key={labeledUrl}>labeledUrl</li>
            ))}
          </ul>
        </div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos enim labore cumque sed optio. Nihil fugiat velit
                  et amet error quas incidunt cum optio magnam corrupti. Maiores
                  suscipit consequatur atque totam blanditiis, illo unde
                  perspiciatis modi odio fugit voluptas dolor iusto sint!
                  Corrupti facilis odio illum voluptatibus laudantium excepturi
                  impedit sed harum adipisci placeat, magnam aliquid optio
                  voluptas quia cum cumque ducimus. Dolore placeat magni illo
                  vero, fugit incidunt quisquam hic ex quasi in possimus eaque
                  quo at quod illum tenetur aperiam! Incidunt, assumenda
                  accusamus eveniet nam tenetur sit necessitatibus, aut
                  repudiandae ipsum iusto quia. Ipsam illum incidunt reiciendis
                  vel.
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">Text 2</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
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

export default hot(module)(Explorer);
