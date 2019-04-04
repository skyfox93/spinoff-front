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
import Spinoffs from './Spinoffs'
import Nav from './Nav'
import Profile from './Profile'
import adapter from './Adapter'
import { connect } from 'react-redux'
import { updateCurrentUser, selectPhoto, selectProfilePhoto } from './Actions/actions'

class App extends Component {

  componentDidMount(){
    this.props.updateCurrentUser({token:sessionStorage.getItem('token'),user: JSON.parse(sessionStorage.getItem('user')) })
  }
// view photo from the feed
  viewPhoto=(id,history)=> {
    this.props.selectPhoto(id)
    history.push('/photo')
  }
/* view photo from the profile page (opens a seperate component to avoid losing scroll position)
  (alternatively, store page state then restore).
 */
  viewProfPhoto=(id, history) => {
    this.props.selectProfPhoto(id)
    history.push('/photo')
  }

  render() {
    let user= this.props.user
    let editing=this.props.editing
    let profilePhoto= this.props.ProfilePhoto
    let feedPhoto=this.props.feedPhoto
    return (
      <div className="App">
        <Router>
          <div>
          <Nav/>
          <div style={{height:'50px'}}></div> // for spacing
            <Route
              path="/signin"
              render={(props)=> user ?
                 <Redirect to='/'/>
                : <SignIn updateCurrentUser={this.updateCurrentUser} />
              }
            />
            <Route path='/signup'
              render={
                props=> user ?
                  <Redirect to='/'/>
                :<SignUp updateCurrentUser={this.updateCurrentUser}/>
              }
            />
            <Route
              path='/'
              render={props =>
                user ?
                  (!editing) ?
                    <Feed />
                    : null
                : <Redirect to='/signin'/>
              }
            />
            <Route
              path='/photo'
              render= {props=>
                (this.props.user) ?
                    <Spinoffs viewPhoto={this.viewPhoto}
                    id= {feedPhoto}/>
                : <Redirect to= '/signin'/>
              }
            />


            <Route
              path='/spinoff'
              render= {props=>
                user ?
                  editing  ?
                    <Editor
                     url={editing && editing.file.url}
                     id={editing && editing.id}
                    />
                  : <Redirect to='/'/>
                : <Redirect to= '/signin'/>
              }
            />

            <Route
              path={'/profile'}
              render= {props=>
                (this.props.user) ?
                  (this.props.viewingUser) ?
                    <Profile viewPhoto={this.viewProfPhoto}/>
                    : <Redirect to='/' />
                : <Redirect to= '/signin'/>
              }
            />

            <Route
              path='/profile/photo'
              render= {props=>
                user ?
                  profilePhoto ?
                    <Spinoffs viewPhoto={this.viewProfPhoto}
                    id={props.selProfPhotoId}/>
                  : <Redirect to='/' />
                : <Redirect to= '/signin'/>
              }
            />
            <Route
              path={'/edit_user'}
              render={props=>
                user ?
                    <EditUser/>
                  : <Redirect to='./signin'/>}
              />
          </div>

        </Router>
      </div>

    );
  }
}

const mapStateToProps=(state)=> {
  return {
    user: state.currentUser,
    editing: (state.editingPhotoId || state.createNew),
    profilePhoto: state.selProfPhotoId,
    feedPhoto: state.selPhotoId,
    viewingUser: !!state.viewingUser
  }
}

const mapDispatchToProps = {
 updateCurrentUser,
 selectPhoto,
 selectProfilePhoto
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
