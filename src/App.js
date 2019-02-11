import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
//import { Stage, Sprite, AppConsumer } from '@inlet/react-pixi'
// import * as PIXI from 'pixi.js'
// import { ConvolutionFilter } from '@pixi/filter-convolution';
import logo from './logo.svg';
import './App.css';
import Feed from'./Feed'
import Editor from'./Editor'
import SignIn from'./forms/SignIn'
import SignUp from'./forms/SignUp'
import EditUser from'./forms/EditUser'


import Adapter from './Adapter'
import Friends from './Friends'
import Requests from './Requests'

class App extends Component {

  state={
    currentUser:null
  }

  updateCurrentUser=(json=>{
    this.setState({user:json.user,token:json.token})
    localStorage.setItem('token',json.token)
    localStorage.setItem('user', JSON.stringify(json.user))
  }
  )
  componentDidMount(){
    this.setState({token:localStorage.getItem('token')})
    //this.setState({user: JSON.parse(localStorage.getItem('user'))})
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/'
              render= { () => <Redirect to='./home' />}
            />
            <Route path="/signin"
              render={(props)=> this.state.user ?
                 <Redirect to='/home'/>
                : <SignIn updateCurrentUser={this.updateCurrentUser} history=/>}
            />
            <Route path='/signup'
              render={props=> <SignUp updateCurrentUser={this.updateCurrentUser}/>}
            />
            <Route
              path='/home'
              render={props => this.state.user ?
                <Feed user={this.state.user} token={this.state.token}/>
                : <Redirect to={'/signin'}/>}
            />
          </div>
        </Router>
      </div>

    );
  }
}

export default App;
