import React from 'react'
import Requests from './Requests'
import Friends from './Friends'
import {Link} from 'react-router-dom'
import {Menu, Image, Label} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addPhoto, clearCurrentUser} from './Actions/actions'
import { baseUrl } from './config'
  function signOut(clearUser){
    clearUser()
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
  }
 const Nav= (props)=>{
 return <div style={{width:'100%',position:'absolute',zIndex:'1',}}>

<div style={{display:'flex',justifyContent:'center', alignItems:'baseline', margin:'0px,auto',backgroundColor:'white',width:'100%',height:'50px'}}>
{props.user ?
  <>
  <div id='center-menu'><Link className='menu-button' to='/spinoff'onClick={()=>{props.addPhoto();}}>
  <button> New Post</button> </Link>
  <Friends/>
  </div>
  <Requests/>

  <div className='signout'>
    <Image avatar margin='20px' src={baseUrl+props.user.avatar.url}/><Link  to='/signin' onClick={()=>signOut(props.clearCurrentUser)}><span >{props.user.displayname}</span></Link>

    </div>
  </>
: null}
</div>
</div>
}

const mapStateToProps=(state)=>{
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps={
  addPhoto,
  clearCurrentUser
}
export default connect(mapStateToProps,mapDispatchToProps)(Nav)
