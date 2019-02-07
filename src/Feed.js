import React from 'react'
import adapter from './Adapter'
import PhotosContainer from './PhotosContainer'
import Photo from './Photo'
import Editor from'./Editor'
import Friends from './Friends'
import Requests from './Requests'

const baseUrl='http://localhost:3000'

class Feed extends React.Component{

  state={
    photos:[],
    selectedPhotoId: null,
    editingPhotoId: null,
    createNew: false,
    selected: null,
  }



  /*viewPhoto= (selPhoto)=>{
    let spinoffs= this.state.photos.filter(photo=> photo.id===sellPhoto.id)
    let photo= {...photo, spinoffs: spinoffs}
    this.state.selected=spinoffs
  }*/

  viewPhoto=(photo_id)=>{
    this.setState({selectedPhotoId:photo_id})
  }
  deSelect=(photo_id)=>{
    this.setState({selectedPhotoId:null})
  }

  editPhoto=(photo_id)=>{
    this.setState({editingPhotoId:photo_id})
  }

  getSpinoffs=()=>{
    let selected=this.getSelectedPhoto()
    let id=selected.id
  return this.state.photos.filter(photo=> photo.photo_id === id)
  }

  getSelectedPhoto=()=>{
    // find the selected photo, if its not the original, look for the original one.
    // if you can't find the original, select the spinoff
   let selPhoto= this.state.selectedPhotoId && this.state.photos.find(photo=> photo.id===this.state.selectedPhotoId)
   let original=(selPhoto && selPhoto.photo_id) ?
     this.state.photos.find(photo=> photo.id===selPhoto.photo_id)
     : selPhoto
  return  original

  }



  updateSelectedPhoto=()=>{
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
      photo.id===this.state.editingPhotoId
    )
  }


  addPhoto=()=>{
    this.setState({createNew:true})
  }
  savePhoto=(data, removeListeners)=>{
    const editing=this.getEditingPhoto()
    const photo_id= editing && (editing.photo_id || editing.id)

    const id=this.props.user.id
    adapter.postPhoto(
      id,{
        photo:{file:data, user_id:id, like_count:0, photo_id: photo_id  }
      },this.props.token)
    .then((photo)=>{
      removeListeners()
      let newPhotos=[photo, ...this.state.photos]
      this.setState({editingPhotoId:null})
    })
    .catch((error)=> alert('sorry,something went wrong'))
  }


  fetchPhotos= ()=>{
    return adapter.getFeed(this.props.user.id,this.props.token).then(
      photos => this.setState({photos: photos})
    )
    //.then(()=>this.setState({selectedPhotoId:14}))
  }

  componentDidMount(){
    this.fetchPhotos()
    //.then(this.setState({editingPhotoId:14}))
  }
  render () {
    const selected=this.getSelectedPhoto()
    const editing=this.getEditingPhoto()
    console.log(selected)


    if(!editing){
      return  <>
      <div style={{width:'100%',position:'absolute',zIndex:'1',}}>
      <div style={{display:'inline-block',margin:'0px,auto',backgroundColor:'white',width:'100%',height:'50px'}}>
      <button onClick={this.addPhoto}> New Post </button>
      <Friends userId={this.props.user.id} token={this.props.token}/>

      <Requests userId={this.props.user.id} token={this.props.token}/>

      </div>
      </div>
        <div style={{top:'50px',width:'100%', height:'80%', left:'0px', display: 'inline-block',position:'absolute',overflow: 'scroll',backgroundColor:'white'}}>
      <div style={{width:'500px', margin: '50px, auto', display: 'inline-block'}}>
      <PhotosContainer
      photos={this.state.photos}
      baseUrl={baseUrl}
      editPhoto={this.editPhoto}
      viewPhoto={this.viewPhoto}
      canSpinOff={true}
      showInfo={true}
      />
      </div>
      </div>

      {selected ?

        <div style={{width:'100%',height:'100%',left:'0px', top:'0px', display: 'inline-block',position:'fixed', zIndex: '2'}}>
        <div style={{height:'100%',width:'100%', padding:'10px', display: 'inline-block', backgroundColor:'grey'}}>
        <span>Viewing Photo</span><button onClick={this.deSelect}> Back to Feed </button>

        <div style={{height:'100%',overflow: 'scroll',backgroundColor:'white'}}>
        <div>
          <Photo
            id={selected.id}
            url={selected.file.url}
            comments={selected.comments}
            baseUrl={baseUrl}
            user={selected.user}
            numSpinoffs={selected.spinoff_count}
            canSpinOff={'yes'}
            spinOffPhoto={this.spinoffPhoto}
            viewPhoto={this.viewPhoto}
            editPhoto={this.editPhoto}
            showingOrig={true}
            />
            </div>
          <PhotosContainer
          photos={this.getSpinoffs()}
          baseUrl={baseUrl}
          spinOffPhoto={this.spinoffPhoto}
          viewPhoto={this.viewPhoto}
          editPhoto={this.editPhoto}
          showingOrig={true}
          />
      </div>
      </div>
      </div>

      : null}
      </>
    }

     if (editing||this.state.createNew){
           return <Editor
           url={editing && editing.file.url}
           id={editing && editing.id}
           baseUrl={baseUrl}
           //photo will save as belonging to currentUser
           currentUserID={this.props.user.id}
           baseUrl={baseUrl}
           savePhoto={this.savePhoto}
           existingImg={!this.state.createNew}
           />}
    else {return null}
  }
}
export default Feed
