import React, { Component } from 'react';
//import { Stage, Sprite, AppConsumer } from '@inlet/react-pixi'
// import * as PIXI from 'pixi.js'
// import { ConvolutionFilter } from '@pixi/filter-convolution';
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
initEditor(this.editorC.current,stackBlurImage)
  }

  render() {
    return (
        <div id="container" ref={this.editorC}>
    	    <img className={'show'} src="openi.jpg" id='open'></img>
    	     <div id='hiddenInputs'>
    		     <input type={"file"} name={"file"} id={"file" }accept={"image/*"} /><br/>
             <input type={'checkbox'} id={'resize'}/>
             <input type={'checkbox'} id={'sharpen'}/>
             <input type={'checkbox'} id={'boost'} defaultChecked={'true'}/>
             <input type={'checkbox'} id={'boost2'}/>
            </div>
            <canvas id='blurCanvas'></canvas>
            <canvas id='tempCanvas'></canvas><br/>
            <div className='border'>
              <div className='wrapper' id={'wrap'}>
              	<img src={this.props.baseUrl+this.props.url} id='image' crossOrigin = "Anonymous"></img>
              	<canvas id={'canvas3'}></canvas>
              	<canvas id="c3" width="500" height="750"></canvas>
              	<canvas id="c2" width="500" height="750"></canvas>
              	<canvas id="c4" width="500" height="750"></canvas>
              	<canvas id="c" width="500" height="750"></canvas>
            	   <div className='menu' id='bottombar'>
            		   <div id="guide" className="guide">
              			<p> Use file Icon to load the image you want to edit.</p>
              			<p>You can paint an effect onto the image, or selectively erase the effect.</p>
              			<p>The Eraser only affects the filter currently selected</p>
              			<p> click the eraser again to turn it off</p>
              			<p> Structure is painted in by default</p>
              			<button id="dismiss"> Okay</button>
              		</div>
            		  <img className='show' src="./Icons/savei.jpg" id='saveBtn'></img>

            		  <button className='show' id='sharpenonly'> Brighten </button>
            		  <button className='show' id='details'> Structure</button>
                  <button className='show' id='eraseBTN'>Eraser</button>
                  <button className='show' id='colorBurn'> Color
                    <input type='color' className='show' id='color' defaultValue='#87CEFA'/>
                  </button>
            		  <button id='help' className='show'>Help</button>
            		  <div className='tools'><span className="slider"> Brush Size
            				<input id='brsize' type="range" min={20} max={300} defaultValue={100}/></span>
                    <button id="fill">Fill Mask</button> <button id="clear">Clear Mask</button><br/>
            			  <span className="slider"> Filter Opacity
            				    <input id='brstrength' type="range" min={0 }max={10} defaultValue={10}/>
                    </span>
                  </div>
                </div>
        	<div id='notes'></div>
        	 <button className='menu' id='maskb'>Settings</button>
          </div>
      </div>
    </div>
    );
  }
}

export default Editor;
