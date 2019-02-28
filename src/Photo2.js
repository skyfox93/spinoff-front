import React from 'react'
import Comment from './Comments'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
const Comments=(props=>
  props.comments.map((comment)=>
    <Comment {...comment}
      />
  )
)
class Photo extends React.Component{

render(){
  return <Card raised className='card' key={this.props.id} style={{width: '500px', margin: '20px, auto', display: 'inline-block',backgroundColor:'white'}}>
          <Card.Content><img src={this.props.baseUrl+this.props.user.avatar.url} className='user-avatar'/><a  onClick={()=>{this.props.setViewingUser(this.props.user);this.props.history.push('./profile')}}>@{this.props.user.displayname}</a></Card.Content>
          <div style={{width:'100%', backgroundColor:'rgb(75,75,75)', height:'100%'}} >
          <Card.Content style={{width:'500px', height:'400px',backgroundImage:`url(${this.props.baseUrl+this.props.url})`,backgroundSize:'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
          </Card.Content>
          </div>

            <Card.Content  className='photo-UI'>
              <div style={{margin:'0,20px', display:'inline-block'}}>
              {(this.props.photo_id) ?
                <>
                  <a onClick={()=>{this.props.viewPhoto(this.props.id,this.props.history)}}>
                    Original
                  </a> by
                  <a  onClick={()=>{this.props.setViewingUser(this.props.owner);this.props.history.push('./profile')}}>
                  <img src={this.props.baseUrl+this.props.owner.avatar.url} className='user-avatar'/>
                    @{this.props.owner.displayname}
                  </a>
                </>

                : <a onClick={()=>{this.props.viewPhoto(this.props.id,this.props.history)}}>
                    {`${this.props.numSpinoffs} spinoffs`}
                  </a>
                  }
                  </div>

            {this.props.photo_id ?
              null : <button onClick={()=>{this.props.editPhoto(this.props.id);this.props.history.push('/spinoff')}}>Spinoff </button>}
            </Card.Content>
            <Comments comments={this.props.comments}/>
          </Card>
  }

}
export default withRouter(Photo)
