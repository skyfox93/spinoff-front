import React from 'react'
import Comment from './Comments'
import { Card, Icon, Image } from 'semantic-ui-react'

const Comments=(props=>
  props.comments.map((comment)=>
    <Comment {...comment}
      />
  )
)
class Photo extends React.Component{

render(){
  return <Card raised className='card' key={this.props.id} style={{width:'500px', margin: '20px, auto', display: 'inline-block'}}>
          <Card.Content><img src={this.props.baseUrl+this.props.user.avatar.url} className='user-avatar'/>@{this.props.user.displayname}</Card.Content>
          <Image

            src={this.props.baseUrl+this.props.url}
            />
            <Card.Content  className='photo-UI'>
            <a onClick={()=>this.props.viewPhoto(this.props.id)}>{
              this.props.photo_id ?
                !this.props.showingOrig ? 'View Original': null
              : `${this.props.numSpinoffs} spinoffs`}
                </a>
            {this.props.photo_id ?
              null : <button onClick={()=>this.props.editPhoto(this.props.id)}>Spinoff </button>}
            </Card.Content>
            <Comments comments={this.props.comments}/>
          </Card>
  }

}
export default Photo
