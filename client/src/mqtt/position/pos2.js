import React from "react";

class Pos2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.props.messages.length > 0 ? this.props.messages[this.props.messages.length - 1].message.split('|')[0] : null}
      </div>
    );
  }
}

export default Pos2;