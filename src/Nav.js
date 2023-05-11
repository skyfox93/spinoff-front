import React from 'react'
import Requests from './Requests'
import Friends from './Friends'
import { Link } from 'react-router-dom'
import { Menu, Image, Label } from 'semantic-ui-react'
const Nav = (props) => {
  return <div style={{ width: '100%', position: 'absolute', zIndex: '1', }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', margin: '0px,auto', backgroundColor: 'white', width: '100%', height: '50px' }}>
      {props.user ?
        <>
          <div id='center-menu'>
          <Link to='/'> Home </Link>
            <Link className='menu-button' to='/spinoff' onClick={() => { props.addPhoto(); }}>
              <button> New Post</button>
            </Link>
            <Friends
              userId={props.user.id}
              token={props.token}
              baseUrl={props.baseUrl}
              setViewingUser={props.setViewingUser}
            />
          </div>
          <div className='signout'>
            <Image avatar margin='20px' src={props.baseUrl + props.user.avatar.url} /><Link to='/signin' onClick={props.signout}><span >{props.user.displayname}</span></Link>

          </div>
        </>
        : null}
    </div>
  </div>
}
export default Nav
