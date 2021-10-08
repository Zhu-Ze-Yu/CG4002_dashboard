import React from "react";
import { Card, Form, Button } from "antd";

class Subscriber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        topic: "testtopic/cg4002",
        qos: 0,
      },
    };
  }

  handleSubscribe = () => {
    const { topic, qos } = this.state.record;
    this.props.subscribe(topic, qos);
  };

  handleUnsub = () => {
    const { topic } = this.state.record;
    this.props.unsubscribe(topic);
  };

  render() {
    const SubForm = (
      <Form>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleSubscribe}>
            Start
          </Button>
          {this.props.showUnsub ? (
            <Button type="danger" style={{ marginLeft: "10px" }} onClick={this.handleUnsub}>
              Pause
            </Button>
          ) : null}
        </Form.Item>
      </Form>
    );

    return <Card>{SubForm}</Card>;
  }
}

export default Subscriber;