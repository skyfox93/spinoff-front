import React from 'react'
import FeaturePhoto from '../low_level/FeaturePhoto'
import PhotosContainer from './PhotosContainer'
import User from './User'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../../config'
// PhotoViewer is rendered by Profile, by SpinOffs
// If rendered by Profile, it contains a users profile pic, along with photos from that user
// If rendered by Spinoffs, it contains the original photo, along with spinoffs.

// The PhotoViewer
const PhotoViewer= (props)=> {

  return (
      <div style={{width:'100%',height:'100%',left:'0px', top:'50px', display: 'inline-block',position:'fixed', zIndex:2 }}>
        <div style={{height:'100%',width:'100%', display: 'inline-block' }}>
          <div style={{padding:'20px',backgroundColor:'white'}}>
            <span>{props.location.pathname==='/profile' ?
              `@${props.user.displayname}'s profile`
            :' Viewing Original Photo '}
            </span>

            <button onClick={()=> props.history.push('/')}> Back to Feed </button>

            {props.location.pathName==='/profile/photo' ? <button onClick={()=> props.history.push('/profile')}> Back to Profile </button> : null

            }
          </div>

        <div style={{height:'100%',overflow: 'scroll',backgroundColor:'white'}}>
          <div>
            {props.view==='Profile' ?
              <User user={props.user}/>
              : <FeaturePhoto
                hideLink={props.view==='Spinoffs'}
                owner={props.selected.owner}
                id={props.selected.id}
                url={props.selected.file.url}
                user={props.selected.user}
                numSpinoffs={props.selected.spinoff_count}
                viewPhoto={props.viewPhoto}
              />}
          </div>
          <PhotosContainer
          photos={props.photos}
          // hide link to original if viewing spinoffs
          hideLink={props.view==='Spinoffs'}
          viewPhoto={props.viewPhoto}
          />
      </div>
    </div>
  </div>
  )
}
export default withRouter(PhotoViewer)
