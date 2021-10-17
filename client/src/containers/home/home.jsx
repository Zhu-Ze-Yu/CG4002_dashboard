/*
create session and enter session page 
 */

import React from 'react'
import {connect} from 'react-redux'
import {SearchBar, InputItem, Button} from 'antd-mobile'
import { getSessionList } from "../../redux/actions";
//import styles from './styles.css'
import { create } from "../../redux/actions";
import SessionList from "../../components/session-list/session-list";

// const data = Array.from(new Array(3)).map((_val, i) => ({
//   icon: '../assets/images/header1.png',
//   text: `hhhh`,
// }));

class Home extends React.Component {
  // constructor(){
  //   super()
  //   this.state = {change: true}; 
  // }

  // componentDidMount(){
  //   // detect position -> get 
  //   if(position1){
  //     this.setState({change: false})
  //   }
  // }

  state = {
    session_name: '',
    session_id: '',
    end: 'false',
    create_time: ''
  }

  create = () => {
    this.props.create(this.state)
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  componentDidMount () {
    // get ongoing sessionList
    this.props.getSessionList('false')
  }

  render() {
    return (
      // <div>
      //   <div style={{marginTop: '50px'}}></div>
      //   <WingBlank>
      //   <WhiteSpace/>
      //   <div>Dancer 1</div>
      //   <div className={this.state.change ? styles.normal : styles.glow}>test</div>
      //   <Grid data={data}
      //         columnNum={3}
      //         hasLine={false}/>

      //   <WhiteSpace/>
      //   <div>Dancer 2</div>
      //   <Grid data={data}
      //         columnNum={3}
      //         hasLine={false}/>
        
      //   <WhiteSpace/>
      //   <div>Dancer 3</div>
      //   <Grid data={data}
      //         columnNum={3}
      //         hasLine={false}/>
      //   </WingBlank>
      // </div>

      
      <div style={{marginTop:50, marginBottom:50}}>
        <SearchBar placeholder="Search a session" maxLength={8}/>
        <InputItem placeholder='Create a new session by enter a session name' onChange={val => {this.handleChange('session_name', val)}}>Session Name:</InputItem>
        <InputItem placeholder='Enter the username of user 1' onChange={val => {this.handleChange('user1', val)}}>User 1 Name:</InputItem>
        <InputItem placeholder='Enter the username of user 2' onChange={val => {this.handleChange('user2', val)}}>User 2 Name:</InputItem>
        <InputItem placeholder='Enter the username of user 3' onChange={val => {this.handleChange('user3', val)}}>User 3 Name:</InputItem>

        <Button type='primary' onClick={this.create}>Create</Button>
        
        <SessionList sessionList={this.props.sessionList}/>
      </div>
    )
  }
}

export default connect(
  state => ({session: state.session, sessionList: state.sessionList}),
  {create, getSessionList}
)(Home)