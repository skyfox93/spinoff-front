import React from 'react'
import Comment from './Comments'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from './config'
import { connect } from 'react-redux'
const Comments=(props=>
  props.comments.map((comment)=>
    <Comment {...comment}
      />
  )
)
class FeaturePhoto extends React.Component{
  // hideLInk= link to the spinoff page is hidden on the spinoff page.
  // photo.photo_id=exists if the photo is not an original

render(){
  return <Card raised className='card' key={this.props.id} style={{width:'500px', margin: '20px, auto', display: 'inline-block'}}>
          <Card.Content><img src={baseUrl+this.props.user.avatar.url} className='user-avatar'/>@{this.props.user.displayname}</Card.Content>
          <Image src={baseUrl+this.props.url}
          />
            <Card.Content  className='photo-UI'>
            <a onClick={()=>{this.props.viewPhoto(this.props.id,this.props.history)}}>{
              this.props.photo_id ?
                this.props.hideLink ?
                  null
                  : 'View Original'
              : `${this.props.numSpinoffs} spinoffs`}
                </a>
            {this.props.photo_id ?
              null : <button onClick={()=>{this.props.editPhoto(this.props.id);this.props.history.push('/spinoff')}}>Spinoff </button>}
            </Card.Content>
            <Comments comments={this.props.comments}/>
          </Card>
  }

}
const mapDispatchToProps={
  editPhoto,
  setViewingUser,
}

export default connect(mapDispatchToProp)(withRouter(FeaturePhoto))
