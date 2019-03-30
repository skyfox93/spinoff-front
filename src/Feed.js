import React from 'react'
import PhotosContainer from './PhotosContainer'
import {withRouter} from 'react-router-dom'
import { Message } from 'semantic-ui-react'

class  FeedViewer extends React.Component{
  state= {
    loading:false;
  }

  fetchFeed= () => {
    this.setState({loading:true})
    adapter.getFeed(this.props.user.id,this.token)
    .then(photos => {
      this.props.setPhotos(photos);
      this.setState({loading:false, feedLoaded:true})}
    )}

  componentDidMount(){
    this.fetchFeed()
  }

  render(){

  return(
    <div
      style={this.props.match.isExact ? {
        top:'50px',
        width:'100%',
        height:'90%',
        left:'0px',
        display: 'inline-block',
        position:'absolute',
        overflow:'scroll',
        backgroundColor:'rgb(200,200,200)'
      }
        :{display:'none'} }>

      <div style={{
        width:'700px',
        margin: '50px, auto',
        display: 'inline-block'}}>

    {(this.props.photos.length<1 && this.state.feedLoaded) ?
   <Message>
   <Message.Header> No posts to show </Message.Header>
   You are not following anyone, or the people you are following haven't posted anything. Use the search bar above to find your friends. Once they accept your request, their photos will appear here.
   </Message> : null}
  <PhotosContainer
        {...this.props}}
        />
      </div>
    </div>)
  }
}
export default withRouter(FeedViewer)
