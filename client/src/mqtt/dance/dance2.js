import React from "react";

class Dance2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{height: '250px'}}>
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          {this.props.messages.length > 0 ? 
          <div>
            <div><img src={require(`../../assets/images/${this.props.messages[this.props.messages.length - 1].message.split('|')[1] + '_name'}.png`)} style={{height:'40px'}} alt="dance name"/></div>
            <div><img src={require(`../../assets/images/${this.props.messages[this.props.messages.length - 1].message.split('|')[1]}.jpg`)} style={{height: '200px'}} alt="dance pic"/></div>
          </div>
          : null}
        </div>
      </div>
    );
  }
}

export default Dance2;