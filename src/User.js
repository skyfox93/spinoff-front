import React from 'react'
import Comment from './Comments'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class User extends React.Component{

render(){
  return <Card raised className='card' style={{width:'500px', margin: '20px, auto', display: 'inline-block'}}>
          <Image src={this.props.baseUrl+this.props.user.avatar.url}
          />
          <Card.Content>{this.props.user.displayname}</Card.Content>
        {this.props.user.bio ? <Card.Content> Bio: {this.props.user.bio}</Card.Content> : null}

          </Card>
  }

}
export default withRouter(User)
