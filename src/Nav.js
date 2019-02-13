import React from 'react'
import Requests from './Requests'
import Friends from './Friends'
import {Link} from 'react-router-dom'
 const Nav= (props)=>{
 return <div style={{width:'100%',position:'absolute',zIndex:'1',}}>

<div style={{display:'inline-block',margin:'0px,auto',backgroundColor:'white',width:'100%',height:'50px'}}>
{props.user ?
  <>
  <Link to='/spinoff'onClick={()=>{props.addPhoto();}}>
  > New Post </Link>
  <Requests userId={props.user.id} token={props.token}/>
  <Friends userId={props.user.id} token={props.token} baseUrl={props.baseUrl}/>
  </>
: null}
</div>
</div>
}
export default Nav
