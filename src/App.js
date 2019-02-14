import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
//import { Stage, Sprite, AppConsumer } from '@inlet/react-pixi'
// import * as PIXI from 'pixi.js'
// import { ConvolutionFilter } from '@pixi/filter-convolution';
import logo from './logo.svg';
import './App.css';
import SignIn from'./forms/SignIn'
import SignUp from'./forms/SignUp'
import EditUser from'./forms/EditUser'
import Editor from './Editor'
import Feed from './Feed'
import PhotoViewer from './PhotoViewer'
import Nav from './Nav'
import Profile from './Profile'
import adapter from './Adapter'
import {Loader, Dimmer} from 'semantic-ui-react'
const baseUrl='http://localhost:3000'

class App extends Component {

  state={
    currentUser:null,
    photos:[],
    loading: true,
    viewingUser:null,
    // Photo viewing && editing
    selectedPhotoId: null,
    editingPhotoId: null,
    sProfilePhotoId: null,
    createNew: false,
  }

  /*updateProfileId= (id)=> {
    this.setState({profileId:id})
  }*/



  updateCurrentUser=(json=>{
    this.setState({user:json.user,token:json.token})
    sessionStorage.setItem('token',json.token)
    sessionStorage.setItem('user', JSON.stringify(json.user))
  }
  )
  clearCurrentUser=()=> {
    this.setState({user:null})
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('user')
    }

// Functions for Main Viewer
  viewPhoto=(photo_id,history)=>{
    this.setState({selectedPhotoId:photo_id});
    history.push('/photo')
  }


  setViewingUser=(user)=>{
    this.setState({viewingUser:user})
  }
  editPhoto=(photo_id)=>{
    this.setState({editingPhotoId:photo_id})
  }
  // Functions for ProfileViewer

  viewProfilePhoto=(photo_id,history)=>{
    this.setState({sProfilePhotoId:photo_id})
    history.push('/profile/photo')
  }
  deSelectProfilePhoto=(photo_id)=>{
    this.setState({sProfilePhotoId:null})
  }

  getSpinoffs=()=>{
    let selected=this.getSelectedPhoto(this.state.selectedPhotoId)
    let id=selected.id
  return this.state.photos.filter(photo=> photo.photo_id === id)
  }

  getPSpinoffs=()=>{
    let selected=this.getSelectedPhoto(this.state.sProfilePhotoId)
    let id=selected.id
  return this.state.photos.filter(photo=> photo.photo_id === id)
  }

  getSelectedPhoto=(id)=>{
    // find the selected photo, if its not the original, look for the original one.
    // if you can't find the original, select the spinoff
   let selPhoto= this.state.photos.find(photo=> photo.id===id)
   let original=(selPhoto && selPhoto.photo_id) ?
     this.state.photos.find(photo=> photo.id===selPhoto.photo_id)
     : selPhoto
  return  original
}



  getEditingPhoto=()=>{
    if(!this.state.editingPhotoId){ return}
    return this.state.photos.find((photo)=>
      photo.id===this.state.editingPhotoId
    )
    debugger
  }


  addPhoto=()=>{
    this.setState({createNew:true})
  }

  savePhoto=(data, removeListeners)=>{
    const editing=this.getEditingPhoto()
    const photo_id= editing && (editing.photo_id || editing.id)

    const id=this.state.user.id
    adapter.postPhoto(
      id,{
        photo:{file:data, user_id:id, like_count:0, photo_id: photo_id  }
      },this.state.token)
    .then((photo)=>{
      removeListeners()
      let newPhotos=[photo, ...this.state.photos]
      this.setState({editingPhotoId:null,createNew:null})
    })
    .catch((error)=> alert('sorry,something went wrong'))
  }


  fetchFeed= ()=>{
    this.setState({loading:true})
     adapter.getFeed(this.state.user.id,this.state.token)
    .then(
      photos => this.setState({photos, loading:false})
    )
  }
  profilePhotos=()=> {
    return this.state.photos.filter(photo => (photo.user.id=== this.state.viewingUser.id||photo.owner.id=== this.state.viewingUser.id))
    }


  componentDidMount(){
    this.setState({token:sessionStorage.getItem('token')})
    this.setState({user: JSON.parse(sessionStorage.getItem('user'))})

  }


  render() {

    const selected=this.getSelectedPhoto(this.state.selectedPhotoId)
    const profileSelected=this.getSelectedPhoto(this.state.sProfilePhotoId)
    const editing=this.getEditingPhoto()

    return (
      <div className="App">


        <Router>
          <div>
          <Nav
          setViewingUser={this.setViewingUser}
          addPhoto={this.addPhoto}
          user={this.state.user}
          token={this.state.token}
          baseUrl={baseUrl}
          user={this.state.user}
          signout={this.clearCurrentUser}
          />
          <div style={{height:'50px'}}>
            </div>
            <Route path="/signin"
              render={(props)=> this.state.user ?
                 <Redirect to='/'/>
                : <SignIn updateCurrentUser={this.updateCurrentUser} />}
            />
            <Route path='/signup'
              render={props=> this.state.user ? <Redirect to='./home'/> :<SignUp updateCurrentUser={this.updateCurrentUser}/>}
            />
            <Route
              path='/'
              render={props =>
                this.state.user ?
                  (!editing && !this.state.createNew) ?
                  <>

                    <Loader  active={this.state.loading}size='big'>Loading Feed</Loader>
                    <Feed
                      setViewingUser={this.setViewingUser}
                      photos={this.state.photos}
                      baseUrl={baseUrl}
                      editPhoto={this.editPhoto}
                      viewPhoto={this.viewPhoto}
                      canSpinOff={true}
                      showInfo={true}
                      fetchFeed={this.fetchFeed}
                    />
                    </>
                : null
              : <Redirect to='/signin'/>
              }
            />
            <Route
              path='/photo'
              render= {props=>
                (this.state.user) ?
                  (selected ?
                    <PhotoViewer
                      setViewingUser={this.setViewingUser}
                      selected={selected}
                      photos={this.getSpinoffs()}
                      baseUrl={baseUrl}
                      viewPhoto={this.viewPhoto}
                      editPhoto={this.editPhoto}
                      showingOrig={true}
                    />
                  : null)
                : <Redirect to= '/signin'/>
              }
            />


            <Route
              path='/spinoff'
              render= {props=>
                (this.state.user) ?
                  ((editing || this.state.createNew)  ?
                    <Editor
                     url={editing && editing.file.url}
                     id={editing && editing.id}
                     baseUrl={baseUrl}
                     //photo will save as belonging to currentUser
                     currentUserID={this.state.user.id}
                     baseUrl={baseUrl}
                     savePhoto={this.savePhoto}
                     existingImg={!this.state.createNew}
                    />
                  : <Redirect to='/'/>)
                : <Redirect to= '/signin'/>
              }
            />

            <Route
              path={'/profile'}
              render= {props=>
                (this.state.user) ?
                  (this.state.viewingUser  ?
                    <Profile
                    setViewingUser={this.setViewingUser}
                    viewingUser={this.state.viewingUser}
                    photos={this.profilePhotos()}
                    baseUrl={baseUrl}
                    viewPhoto={this.viewProfilePhoto}
                    editPhoto={this.editPhoto}

                    />
                  : null)
                : <Redirect to= '/signin'/>
              }
            />

            <Route
              path='/profile/photo'
              render= {props=>
                (this.state.user) ?
                  (profileSelected ?
                    <PhotoViewer
                      setViewingUser={this.setViewingUser}
                      selected={profileSelected}
                      photos={this.getPSpinoffs()}
                      baseUrl={baseUrl}
                      viewPhoto={this.viewProfilePhoto}
                      editPhoto={this.editPhoto}
                      showingOrig={true}
                    />
                  : null)
                : <Redirect to= '/signin'/>
              }
            />
            <Route
              path={'/edit_user'}
              render= {props=>
                (this.state.user) ?
                     <EditUser updateCurrentUser={this.updateCurrentUser} user={this.state.user} token={this.token}/>
                  : null }
              />
          </div>


        </Router>
      </div>

    );
  }
}

export default App;
