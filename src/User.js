import React from 'react'
import Comment from './Comments'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class User extends React.Component{

render(){
  return <span>
          <Image style={{width:'50px', margin: '1em', display: 'inline-block'}} src={this.props.baseUrl+this.props.user.avatar.url}
          />
          <span>@{this.props.user.displayname}</span>
          </span>
  }

}
export default withRouter(User)
