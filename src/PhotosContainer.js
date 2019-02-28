import React from 'react'
import Photo from './Photo2.js'
import { Message } from 'semantic-ui-react'
class PhotosContainer extends React.Component{
  render(){
    if (this.props.photos.length<1 && this.props.loaded){
    return <Message> <Message.Header> No posts to show </Message.Header> You are not following anyone, or the people you are following haven't posted anything. Use the search bar above to find your friends. Once they accept your request, their photos will appear here. </Message>}
    else
    {return this.props.photos.map((photo)=>
      <Photo
      id={photo.id}
      owner={photo.owner}
      comments={photo.comments}
      url={photo.file.url}
      user={photo.user}
      baseUrl={this.props.baseUrl}
      numSpinoffs={photo.spinoff_count}
      editPhoto={this.props.editPhoto}
      viewPhoto={this.props.viewPhoto}
      photo_id={photo.photo_id}
      showingOrig={this.props.showingOrig}
      setViewingUser={this.props.setViewingUser}
      />

    )
    }
  }

}
export default PhotosContainer
