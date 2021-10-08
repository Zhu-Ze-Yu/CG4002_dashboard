import React from "react";
import { Card, List } from "antd";

class Receiver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const renderListItem = (item) => (
      <List.Item>
        <List.Item.Meta description={item.message} />
      </List.Item>
    );

    return (
      <List
        dataSource={this.props.messages}
        renderItem={renderListItem}
      />
    );
  }
}

export default Receiver;