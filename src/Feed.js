import React from 'react'
import Adapter from './Adapter'
import PhotosContainer from './PhotosContainer'
import Photo from './Photo'
import Editor from'./Editor'

const baseUrl='http://localhost:3000'
const adapter=Adapter(baseUrl+'/api/v1')

class Feed extends React.Component{

  state={
    photos:[],
    selectedPhotoId: null,
    editingPhotoId: null,
    displayOriginal:false

  }

  getSelectedPhoto=()=>{
    if(!this.state.selectedPhotoId){ return}
    return this.state.photos.find((photo)=>
      photo.id===this.state.selectedPhotoId||
        photo.spinoffs.find(spinoff=>
          spinoff.id===this.state.selectedPhotoId
        )
    )
  }
  getEditingPhoto=()=>{
    if(!this.state.editingPhotoId){ return}
    return this.state.photos.find((photo)=>
      photo.id===this.state.editingPhotoId||
        photo.spinoffs.find(spinoff=>
          spinoff.id===this.state.editingPhotoId
        )
    )
  }



  editPhoto=(photoID)=> {
    this.setState({editingPhotoId:photoID})
  }
  viewPhoto=(photoID)=>{
    this.setState({selectedPhotoId:photoID})

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
    )
    .then(()=>this.setState({selectedPhotoId:14}))
  }

  componentDidMount(){
    this.fetchPhotos()
    //.then(this.setState({editingPhotoId:14}))
  }
  render () {
  const selected=this.getSelectedPhoto()
  const editing=this.getEditingPhoto()
  const dispOriginal=this.state.displayOriginal
  console.log(selected)
     if(selected && !editing && !dispOriginal){
       return <div>
         <Photo
           id={selected.id}
           url={selected.file.url}
           comments={selected.comments}
           baseUrl={baseUrl}
           user={selected.user}
           numSpinoffs={selected.spinoffs.length}
           canSpinOff={!!selected.spinoffs}
           />
         <PhotosContainer photos={selected.spinoffs} baseUrl={baseUrl} />
       </div>
     }
     else if (editing){
       return <Editor url={editing.file.url} baseUrl={baseUrl}/>
     }
     else{
    return   <PhotosContainer photos={this.state.photos} baseUrl={baseUrl} />
    }
  }
}
export default Feed
