import React, { Component } from 'react';
//import { Stage, Sprite, AppConsumer } from '@inlet/react-pixi'
// import * as PIXI from 'pixi.js'
// import { ConvolutionFilter } from '@pixi/filter-convolution';
import logo from './logo.svg';
import './App.css';
import Feed from'./Feed'
import Adapter from './Adapter'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {file: null}
  }


 


  render() {
    return (
      <div className="App">
      <Feed/>
  </div>
    );
  }
}

export default App;
