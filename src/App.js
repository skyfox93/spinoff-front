import React, { Component } from 'react';
//import { Stage, Sprite, AppConsumer } from '@inlet/react-pixi'
// import * as PIXI from 'pixi.js'
// import { ConvolutionFilter } from '@pixi/filter-convolution';
import logo from './logo.svg';
import './App.css';
import Feed from'./Feed'
import Editor from'./Editor'
import SignIn from'./forms/SignIn'


import Adapter from './Adapter'

class App extends Component {

  state={
    currentUser:null
  }

  updateCurrentUser=(user=>
  this.setState({user:user}))


  render() {
    return (
      <div className="App">
      {this.state.user ? <Feed user={this.state.user}/> : <SignIn updateCurrentUser={this.updateCurrentUser}/>}

  </div>
    );
  }
}

export default App;
