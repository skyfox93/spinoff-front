import React from 'react'
import PhotosContainer from './PhotosContainer'
import {withRouter} from 'react-router-dom'
class  FeedViewer extends React.Component{

  componentDidMount(){
    this.props.fetchFeed()
  }

  render(){

  return  <div style={this.props.match.isExact ? {top:'50px',width:'100%', height:'90%', left:'0px', display: 'inline-block',position:'absolute',overflow: 'scroll',backgroundColor:'rgb(200,200,200)'}:{display:'none'} }>
    <div style={{width:'700px', margin: '50px, auto', display: 'inline-block'}}>
        <PhotosContainer
        {...this.props}
        />
      </div>
    </div>
  }
}
export default withRouter(FeedViewer)
