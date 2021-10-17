import React, { createContext } from "react";
import { keyframes } from "styled-components";
import Connection from "./connection/connection";
import Subscriber from "./subscriber";
import Dance1 from "./dance/dance1";
import Dance2 from "./dance/dance2";
import Dance3 from "./dance/dance3";
import Pos1 from "./position/pos1";
import Pos2 from "./position/pos2";
import Pos3 from "./position/pos3";
import Delay from "./sync_delay/delay";
import EMG from "./emg/emg";

import mqtt from "mqtt";
import { WhiteSpace } from "antd-mobile";


export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

class ClassMqtt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      connectStatus: "Connect",
      isSubed: false,
      messages: [],
    };
  }
  
  handleConnect = (host, mqttOptions) => {
    this.setState({ connectStatus: "Connecting" });
    this.client = mqtt.connect(host, mqttOptions);

    if (this.client) {
      this.client.on("connect", () => {
        this.setState({ connectStatus: "Connected" });
      });
      this.client.on("error", (err) => {
        console.error("Connection error: ", err);
        this.client.end();
      });
      this.client.on("reconnect", () => {
        this.setState({ connectStatus: "Reconnecting" });
      });
      this.client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        const { messages } = this.state;
        if (payload.topic) {
          const changedMessages = messages.concat([payload]);
          this.setState({ messages: changedMessages });
        }
      });
    }
  };

  handleSubscribe = (topic, qos) => {
    if (this.client) {
      this.client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        this.setState({ isSubed: true });
      });
    }
  };

  handleUnsub = (topic) => {
    if (this.client) {
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        this.setState({ isSubed: false });
      });
    }
  };

  handleDisconnect = () => {
    if (this.client) {
      this.client.end(() => {
        this.setState({ connectStatus: "Connect" });
        this.setState({ client: null });
      });
    }
  };

  render() {
    // const animated_border = keyframes`
    //   0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
    //   100% { box-shadow: 0 0 0 20px rgba(255,255,255,0); }
    // `;

    // const style = {
    //   animation: `${animated_border} 1.5s infinite`,
    //   fontSize: '18px',
    //   lineHeight: '30px',
    //   fontWeight: 'bold',
    //   color: 'white',
    //   border: '2px solid',
    //   borderRadius: '10px',
    //   padding: '15px'
    // };

    const emg_styles = {
      //backgroundColor: '#f0fbeb', 
      backgroundColor: 'white', 
      width: '400px', 
      height: '50px', 
      borderRadius: '10px', 
      float: 'right', 
      //border: '4px solid #9bdf70', 
      border: '4px solid black', 
      margin: '10px 0px 10px 10px',
      boxShadow: '0px 0px 20px #9E9E9E'
    }

    const sync_styles = {
      //backgroundColor: '#f0fbeb', 
      backgroundColor: 'white', 
      width: '10%', 
      height: '50px', 
      borderRadius: '10px', 
      float: 'right',
      //border: '4px solid #9bdf70', 
      border: '4px solid black', 
      margin: '10px 10px 10px 10px',
      boxShadow: '0px 0px 20px #9E9E9E'
    }

    const dance_info_styles = {
      backgroundColor: 'white', 
      width: '80%', 
      height: '100%', 
      borderRadius: '15px', 
      boxShadow: '0px 0px 20px #9E9E9E', 
      margin: '0 auto',
      border: '3px solid black'
    }

    const user_name_styles = {
      fontFamily: 'sans-serif', 
      fontSize: '20px', 
      fontWeight: 'bold', 
      textAlign: 'center'
    }

    const dance_styles = {
      fontFamily: 'sans-serif', 
      fontSize: '15px'
    }

    const position_styles = {
      fontFamily: 'sans-serif', 
      fontSize: '15px',
      marginBottom: '40px'
    }

    return (
      <div>
        <div style={{height:'65px'}}>
          <Connection
            connectBtn={this.state.connectStatus}
            connect={this.handleConnect}
            disconnect={this.handleDisconnect}
          />

          <QosOption.Provider value={qosOption}>
            <Subscriber
              showUnsub={this.state.isSubed}
              subscribe={this.handleSubscribe}
              unsubscribe={this.handleUnsub}
            />
          </QosOption.Provider>

          <div style={emg_styles}>
            <div>EMG: </div>
            <EMG messages={this.state.messages}/>
          </div>

          <div style={sync_styles}>
            <div style={{textAlign:'center'}}>Sync Delay: </div>
            <Delay messages={this.state.messages}/>
          </div>
        </div>
          
        <WhiteSpace/>

        <div>
          <div style={{width: '33.3%', height: '550px', float: 'left'}}>
            <div style={dance_info_styles}>
              <div style={user_name_styles}>USER 1</div>
              <hr/>
              <div style={dance_styles}>dance moves: </div>
              <Dance1 messages={this.state.messages}/>
              <div style={position_styles}>relative position: </div>
              <Pos1 messages={this.state.messages}/>
            </div>
          </div>

          <div style={{width: '33.3%', height: '550px', float: 'left'}}>
            <div style={dance_info_styles}>
              <div style={user_name_styles}>USER 2</div>
              <hr/>
              <div style={dance_styles}>dance moves: </div>
              <Dance2 messages={this.state.messages}/>
              <div style={position_styles}>relative position: </div>
              <Pos2 messages={this.state.messages}/>
            </div>
          </div>

          <div style={{width: '33.3%', height: '550px', float: 'left'}}>
            <div style={dance_info_styles}>
              <div style={user_name_styles}>USER 3</div>
              <hr/>
              <div style={dance_styles}>dance moves: </div>
              <Dance3 messages={this.state.messages}/>
              <div style={position_styles}>relative position: </div>
              <Pos3 messages={this.state.messages}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassMqtt;