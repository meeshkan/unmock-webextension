import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Labeled } from "../../browser/state";
import { Button, Form, Col, Row, Tab, ListGroup } from "react-bootstrap";

interface Props {
  labeled: Labeled;
}

class ActiveStateComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { labeled } = this.props;
    return (
      <div>
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

export default hot(module)(ActiveStateComponent);
