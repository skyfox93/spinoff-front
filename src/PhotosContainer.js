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
    numSpinoffs={photo.spinoffs && photo.spinoffs.length}
    canSpinOff={!!photo.spinoffs}

    />

  )
  }

}
export default PhotosContainer
