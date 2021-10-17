import React from "react";

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
    const styles = {
      //backgroundColor: '#f0fbeb', 
      backgroundColor: 'white', 
      width: '10%',
      height: '56px', 
      borderRadius: '10px', 
      float: 'left', 
      //border: '3px solid #9bdf70', 
      border: '3px solid black',
      textAlign: 'center', 
      margin: '10px', 
      fontFamily: 'sans-serif', 
      fontSize: '15px', 
      fontWeight: 'bold', 
      boxShadow: '0px 0px 20px #9E9E9E'
    }

    return (
      <div>
        <button onClick={this.handleConnect} style={styles}> {this.props.connectBtn} </button>
        <button onClick={this.props.disconnect} style={styles}> Disconnect </button>
      </div>
    );
  }
}

export default Connection;