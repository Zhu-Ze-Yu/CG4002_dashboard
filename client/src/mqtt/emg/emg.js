import React from "react";

class EMG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>{this.props.messages.length > 0 ? this.props.messages[this.props.messages.length - 1].message.split('|')[7] : null}</div>
    );
  }
}

export default EMG;