import React from 'react'
import Comment from './Comments'
import { Button, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


const User = ({user, avatarUrl, history, setViewing}) => (
  <div style={{display:"flex", alignItems: 'center', justifyContent: "center"}}>
    <a onClick={()=>{
        setViewing(user)
        history.push(`./profile`)
      }}>
        @{user.displayname}
    </a>
    {avatarUrl && <img 
        style={{margin: '0.25em'}}
        alt={user.displayname}
        src={avatarUrl}
        className='user-avatar'
      />
    }
   
</div>
)
class Photo extends React.Component{

render(){
  return <Card raised className='card' key={this.props.id} style={{width: '500px', margin: '20px, auto', display: 'inline-block',backgroundColor:'white'}}>
          <div style={{width:'100%', backgroundColor:'rgb(75,75,75)', height:'100%'}} >
          <Card.Content style={{width:'500px', height:'400px',backgroundImage:`url(${this.props.baseUrl+this.props.url})`,backgroundSize:'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
          </Card.Content>
          </div>
            <Card.Content  className='photo-UI'>
                <User 
                  user={this.props.user}
                  avatarUrl={this.props.user.avatar.url && `${this.props.baseUrl}${this.props.user.avatar.url}`}
                  history={this.props.history}
                  setViewing={this.props.setViewingUser}
                />
                <div>
                  {this.props.hideOriginal?
                    null :
                    <a onClick={()=>{this.props.viewPhoto(this.props.id,this.props.history)}}>
                      {this.props.photo_id ? `View Original (@${this.props.owner.displayname})` : `${this.props.spinoff_count} spinoffs`}
                    </a>
                  }
                  {this.props.photo_id ?
                  null : <Button
                          style ={{margin: '0.5em'}}
                          onClick={()=>{this.props.editPhoto(this.props.id);this.props.history.push('/spinoff')}}
                        >
                          Spinoff 
                        </Button>}
                </div>
            </Card.Content>
          </Card>
  }

}
export default withRouter(Photo)
