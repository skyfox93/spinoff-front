import React from 'react'
import Photo from './Photo'
import PhotosContainer from './PhotosContainer'
import User from './User'
import { withRouter } from 'react-router-dom'
const PhotoViewer= (props)=>{
  const path= 'http://localhost:3000/profile/photo'
  return (
    <div style={{width:'100%',height:'100%',left:'0px', top:'50px', display: 'inline-block',position:'fixed', zIndex:2 }}>
      <div style={{height:'100%',width:'100%', display: 'inline-block' }}>
        <div style={{padding:'20px',backgroundColor:'white'}}><span>{props.profileView ? `@${props.viewingUser.displayname}'s profile` : ' Viewing Original Photo'}</span><button onClick={()=> props.history.push('/')}> Back to Feed </button>
      {window.location===path ? <button onClick={()=> props.history.push('/profile')}> Back to Profile </button> : null}
        </div>

        <div style={{height:'100%',overflow: 'scroll',backgroundColor:'white'}}>
          <div>

            {props.profileView ?
              <User user={props.viewingUser} baseUrl={props.baseUrl} />

              :<Photo
                owner={props.selected.owner}
                id={props.selected.id}
                url={props.selected.file.url}
                comments={props.selected.comments}
                baseUrl={props.baseUrl}
                user={props.selected.user}
                numSpinoffs={props.selected.spinoff_count}
                canSpinOff={'yes'}
                spinOffPhoto={props.spinoffPhoto}
                viewPhoto={props.viewPhoto}
                editPhoto={props.editPhoto}
                showingOrig={props.showingOrig}
                setViewingUser={props.setViewingUser}
              />}
          </div>
          <PhotosContainer
          photos={props.photos}
          baseUrl={props.baseUrl}
          spinOffPhoto={props.spinoffPhoto}
          viewPhoto={props.viewPhoto}
          editPhoto={props.editPhoto}
          showingOrig={props.showingOrig}
          setViewingUser={props.setViewingUser}

          />
      </div>
    </div>
  </div>
  )
}
export default withRouter(PhotoViewer)
