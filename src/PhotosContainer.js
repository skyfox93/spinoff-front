import React from 'react'
import Photo from './Photo.js'

class PhotosContainer extends React.Component{
  render(){
    return this.props.photos.map((photo)=>
    <Photo
    id={photo.id}
    comments={photo.comments}
    url={photo.file.url}
    user={photo.user}
    baseUrl={this.props.baseUrl}
    numSpinoffs={photo.spinoff_count}
    canSpinOff={this.props.canSpinOff}
    editPhoto={this.props.editPhoto}
    viewPhoto={this.props.viewPhoto}
    />

  )
  }

}
export default PhotosContainer
