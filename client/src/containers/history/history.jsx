/*
list of history sessions of the user
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getSessionList } from "../../redux/actions";

import SessionList from "../../components/session-list/session-list";

class History extends Component {
  componentDidMount () {
    // get the end sessionList
    this.props.getSessionList('true')
  }

  render() {
    return (
      <div style={{marginTop:50, marginBottom:50}}>
         <SessionList sessionList={this.props.sessionList}/>
      </div>
    )
  }
}


export default connect(
  state => ({sessionList: state.sessionList}),
  {getSessionList}
)(History)