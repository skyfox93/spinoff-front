import React, { Component } from 'react';
//import { Stage, Sprite, AppConsumer } from '@inlet/react-pixi'
// import * as PIXI from 'pixi.js'
// import { ConvolutionFilter } from '@pixi/filter-convolution';
import adapter from './Adapter'
import stackBlurImage from './blurFunction.js'
import logo from './logo.svg';
import initEditor from './editor_plugin_2.js'

class Editor extends Component {
  constructor(props) {
    super(props);
    this.editorC = React.createRef();
    this.state = {file: null}
  }



handleselectedFile = (event) => {
  const url=URL.createObjectURL(event.target.files[0]);
  this.setState({url:url,file:event.target.files[0]},()=>console.log(this.state.file))

  }


  componentDidMount(){
initEditor(this.editorC.current,stackBlurImage,this.props.savePhoto,this.props.existingImg)
  }

  render() {
    console.log('RENDER EDITOR')

    return (
        <div id="container" ref={this.editorC}>

    	     <div id='hiddenInputs'>
    		     <input type={"file"} name={"file"} id={"file" }accept={"image/*"} /><br/>
             <input type={'checkbox'} id={'resize'}/>
             <input type={'checkbox'} id={'sharpen'}/>
             <input type={'checkbox'} id={'boost'} defaultChecked={'true'}/>
             <input type={'checkbox'} id={'boost2'}/>
            </div>
            <div className='tool-wrapper'>
            <div className='tools-1'>
              <div className='tools-div'>
               <img className='show' src="savei.jpg" id='saveBtn'></img>
                <img className='show' src="openi.jpg" id='open'></img>
                <button className='show' id='eraseBTN'>Eraser</button>
                <button id='help' className='show'>Help</button>
              </div>
            <div className='tools-div'>
              <button id="fill">Re-Apply</button> <button id="clear">Clear</button>
              <span className="slider"> Brush Size
                <input id='brsize' type="range" min={20} max={300} defaultValue={100}/>
              </span>
            </div>
          </div>
            <div className='tools' id='tools'>

              <span className="slider" > Total Opacity
                  <input id='brstrength' type="range" min={0 }max={10} defaultValue={10}/>
              </span>
              <span className="slider"   id='sharpenonly'> Brighten
                <input  type="range" id='br-strength' min={64 }max={191} defaultValue={128}/>
              </span>
              <span className="slider" id='details'> Structure
                  <input  type="range" id='struct-strength' min={0 }max={10} defaultValue={10}/>
              </span>
              <span className="slider" id='saturation'> Structure-Color
                  <input  type="range" id='sat-strength' min={0 }max={10} defaultValue={0}/>
              </span>
              <span className="slider"  id='colorburn'> Tint
              <input type='color' className='show' id='color' defaultValue='#87CEFA'/>
              <input type="range" id='clr-strength' min={0 }max={10} defaultValue={0}/>
              </span>

            </div>
            <div id="guide" className="guide">
            <p> Select the effect by clicking on it.</p>
            <p> Use the sliders to adjust the strength </p> <p> use the brush or eraser to apply/remove the effect</p>
            <p> Use the 'b' key to toggle between the brush and eraser </p>
            <p> Use the bracket keys to adjust brush size</p>
           </div>
            </div>
            <canvas id='blurCanvas'></canvas>
            <canvas id='tempCanvas'></canvas>
            <div className='border'>
              {this.props.url?	<img src={this.props.baseUrl+this.props.url} id='image' crossOrigin = "Anonymous"></img>: <img src='Guide.jpeg' id='image' crossOrigin = "Anonymous"></img> }
              	<canvas id={'canvas3'}></canvas>
                <svg id='svg' height="200" width="200" style={{position:'fixed'}}>
        <circle id="br-guide" cx="100" cy="100" r="40" stroke="black" stroke-width="3" fill="none" />
        </svg>
              	<canvas id="c3" width="750" height="750"></canvas>
              	<canvas id="c2" width="750" height="750"></canvas>
              	<canvas id="c4" width="750" height="750"></canvas>
              	<canvas id="c" width="750" height="750"></canvas>
            	   <div className='menu' id='bottombar'>


                </div>
        	<div id='notes'></div>
        	 <button className='menu' id='maskb'>Settings</button>
          </div>
      </div>
    );
  }
}

export default Editor;
