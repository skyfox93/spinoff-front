import React from 'react'
import Photo from './Photo2.js'
import { Message } from 'semantic-ui-react'
class PhotosContainer extends React.Component{
  render(){

    viewPhoto=(photo_id,history)=>{
      props.viewPhoto(photo_id)
     history.push('/profile/photo')}


    return this.props.photos.map((photo)=>
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
