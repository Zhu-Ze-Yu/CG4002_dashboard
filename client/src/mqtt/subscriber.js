import React from "react";

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
        <button type='submit' style={styles} onClick={this.handleSubscribe}> Start </button>
        {this.props.showUnsub ? 
        (<button style={styles} onClick={this.handleUnsub}> Pause </button>) : 
        null}
      </div>
    );
  }
}

export default Subscriber;