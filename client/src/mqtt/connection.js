import React from "react";
import { Card, Button } from "antd";

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        host: "broker.emqx.io",
        clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
        port: 8083,
      },
    };
  }

  handleConnect = () => {
    const { host, clientId, port } = this.state.record;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = clientId;
    this.props.connect(url, options);
  };

  render() {
    return (
      <Card
        title="Device Connection"
        actions={[
          <Button type="primary" onClick={this.handleConnect}>
            {this.props.connectBtn}
          </Button>,
          <Button danger onClick={this.props.disconnect}>
            Disconnect
          </Button>
        ]}
      >
      </Card>
    );
  }
}

export default Connection;