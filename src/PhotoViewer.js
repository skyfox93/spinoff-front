import React from 'react'
import Photo from './Photo'
import PhotosContainer from './PhotosContainer'
import User from './User'
import { withRouter } from 'react-router-dom'
const PhotoViewer= (props)=>{
  const path= 'http://localhost:3001/profile/photo'
  console.log(window.location.href)
  return (
    <div style={{width:'100%',height:'100%',left:'0px', top:'50px', display: 'inline-block',position:'fixed', zIndex:2 }}>
      <div style={{height:'100%',width:'100%', display: 'inline-block' }}>
        <div style={{padding:'20px',backgroundColor:'white'}}>
      {window.location.href===path ? <button onClick={()=> props.history.push('/profile')}> Back to Profile </button> : null}
          {props.profileView ?
          <span>
            Photos by
            <User user={props.viewingUser}  baseUrl={props.baseUrl}/>
          </span>
          : null
        }
        </div>

        <div style={{height:'calc(100% - 120px)',overflow: 'scroll',backgroundColor:'white'}}>
          <div>

           {props.profileView? null
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
          hideOriginal = {true}
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
