import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Photo extends React.Component{

render(){
  return <Card raised 
              className='card' key={this.props.id} style={{width:'500px', margin: '20px, auto', display: 'inline-block'}}>
          <Card.Content><img src={this.props.baseUrl+this.props.user.avatar.url} className='user-avatar'/>@{this.props.user.displayname}</Card.Content>
          <Image src={this.props.baseUrl+this.props.url}
          />
            <Card.Content  className='photo-UI'>
            <a onClick={()=>{this.props.viewPhoto(this.props.id,this.props.history)}}>{
              this.props.photo_id ?
                !this.props.showingOrig ? 'View Original': null
              : `${this.props.numSpinoffs} spinoffs`}
                </a>
            {this.props.photo_id ?
              null : <button onClick={()=>{this.props.editPhoto(this.props.id);this.props.history.push('/spinoff')}}>Spinoff </button>}
            </Card.Content>
\          </Card>
  }

}
export default withRouter(Photo)
