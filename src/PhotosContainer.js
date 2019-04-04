import React from 'react'
import Photo from './Photo2.js'
import { Message } from 'semantic-ui-react'
// from parent: viewPhoto, hideLink, photos
class PhotosContainer extends React.Component{
  render(){
    return this.props.photos.map((photo)=>
      <Photo
        id={photo.id}
        owner={photo.owner}
        comments={photo.comments}
        url={photo.file.url}
        user={photo.user}
        numSpinoffs={photo.spinoff_count}
        viewPhoto={this.props.viewPhoto}
        photo_id={photo.photo_id}
        hideLink={this.props.hideLink}
      />
    )
  }
}


export default PhotosContainer
