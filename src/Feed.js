import React from 'react'
import Adapter from './Adapter'
import PhotosContainer from './PhotosContainer'
import Photo from './Photo'
const baseUrl='http://localhost:3000'
const adapter=Adapter(baseUrl+'/api/v1')
class Feed extends React.Component{

  state={
    photos:[],
    selectedPhotoId: null
  }

  getCurrentPhoto=()=>{
    return this.state.photos.find((photo)=>photo.id===this.state.selectedPhotoId)
  }

  addComment= (content, photoId)=>{
    return adapter.postComment(content,photoId)
    .then(
      comment=>{
        let newPhotos= this.state.photos.map(
          (photo)=>{
            if (photo.id===photoId){
              return {...photo, comments: [...photo.comments,comment]}
            }
            else{
              let updatedSpinoffs=photo.spinoffs.map(
                spinoff=>{
                  return (spinoff.id===photo.id)?
                    {...spinoff, comments: [...spinoff.comments, comment]}
                    : spinoff
                }
              )
              return {...photo, spinoffs:updatedSpinoffs}
            }
          }
        )
      }
    )
  }



  editComment= (content,photoId,commentId)=>{
    return adapter.postComment(content,photoId)
    .then(
      comment=>{
       let updatedPhotos= this.state.photos.map(
          (photo)=>{
            if (photo.id===photoId){
              let updatedComments=photo.comments.map(comment=>{
                return comment.id === commentId ?
                  {...comment, content: content}
                  : comment
              })
              return {...photo, comments:updatedComments}
            }
            else{
              let updatedSpinoffs=photo.spinoffs.map(
                spinoff=>{
                  if(spinoff.id===photo.id){
                    let updatedComments=spinoff.comments.map(
                      comment=>{
                        return comment.id === commentId ?
                          {...comment, content: content}
                          : comment
                      }
                    )
                    return {...spinoff, comments:updatedComments}
                  }
                }
              )
              return {...photo, spinoffs:updatedSpinoffs}
            }
          }
        )
      }
    )
  }


  fetchPhotos= ()=>{
    return adapter.getPhotos(2).then(
      photos => this.setState({photos: photos})
    ).then(()=>this.setState({selectedPhotoId:14}))
  }

  componentDidMount(){
    this.fetchPhotos()
  }
  render () {
  const selected=this.state.selectedPhotoId
  const photo=this.getCurrentPhoto()
  console.log(selected)
     return selected ?
       <div>
         <Photo
           id={photo.id}
           url={photo.file.url}
           comments={photo.comments}
           baseUrl={baseUrl}
           />
         <PhotosContainer photos={photo.spinoffs} baseUrl={baseUrl}/>
       </div>
     :
      <PhotosContainer photos={this.state.photos} baseUrl={baseUrl}/>
  }
}
export default Feed
