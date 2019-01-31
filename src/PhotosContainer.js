import React from 'react'
import Photo from './Photo.js'

class PhotosContainer extends React.Component{
  render(){
    return this.props.photos.map((photo)=>
    <Photo
    id={photo.id}
    comments={photo.comments}
    url={photo.file.url}
    baseUrl={this.props.baseUrl}/>
  )
  }

}
export default PhotosContainer
