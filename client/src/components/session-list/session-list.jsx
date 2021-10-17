/*
session list 
*/

import React, { Component } from 'react'
import {WhiteSpace, Card, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class SessionList extends Component {
  static propTypes = {
    sessionList: PropTypes.array.isRequired
  }

  render() {
    const {sessionList} = this.props

    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
        <QueueAnim type='scale'>
          {
            sessionList.map(session => (
              <div key={session._id}>
                <WhiteSpace/>
                <Card onClick={() => 
                    { if(session.end === "true") this.props.history.push(`/evaluation/${session._id}`)
                      else this.props.history.push(`/start_dance/${session._id}`)}
                  }>
                  <Header
                    thumb={require(`../../assets/images/session.png`)}
                    extra={session.session_name}
                  />
                  <Body>
                  <div>Create time: {session.create_time}</div>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(SessionList)