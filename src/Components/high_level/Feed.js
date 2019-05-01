import React from 'react'
import PhotosContainer from '../mid_level/PhotosContainer'
import {withRouter} from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import adapter from '../../Adapters/Adapter'
import {Loader, Dimmer} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectPhoto, setPhotos } from '../../Actions/actions'
class  FeedViewer extends React.Component{

  state= {
    loading:false
  }

  viewPhoto=(id,history)=> {
    this.props.selectPhoto(id)
    history.push('/photo')
  }


  fetchFeed= () => {
    this.setState({loading:true})
    adapter.getFeed(this.props.user.id,this.props.token)
    .then(photos => {
      this.props.setPhotos(photos);
      this.setState({loading:false, feedLoaded:true})}
    )
  }

  componentDidMount(){
    this.fetchFeed()
  }

  render(){

  return(
    <>
    <Dimmer active={this.state.loading}>
     <Loader size='big'> Loading Feed </Loader>
   </Dimmer>
    <div
      style={this.props.match.isExact ? {
        top:'50px',
        width:'100%',
        height:'100%',
        '-webkit-overflow-scrolling': 'touch',
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
    viewPhoto={this.props.viewPhoto}
    photos={this.props.photos}
    hideLink={false}
    viewPhoto={this.viewPhoto}
   />
      </div>
    </div>
    </>
  )
  }
}
 function mapStateToProps(state){
   return {
     photos: state.photos,
     user: state.currentUser,
     token: state.token
   }
 }

 let mapDispatchToProps= {
   selectPhoto,
   setPhotos
 }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FeedViewer))
