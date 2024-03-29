import React from 'react'
import adapter from './Adapter'
import { Popup, Icon, Label } from 'semantic-ui-react'

class Requests extends React.Component{

  state = {
    requesting:[]
  }

  acceptRequest=(followerId)=>{
    adapter.acceptFollow(this.props.userId,followerId,this.props.token)
    const requesting=this.state.requesting.map(user=>{
    return user.id===followerId ? {...user, accepted:true} : user
    })
    this.setState({requesting})
  }

  componentDidMount(){
    adapter.getRequests(this.props.userId,this.props.token).then(
      requests=>{
        console.log(requests)
        this.setState({requesting:requests})
      }
    )
  }

 render(){
   return <Popup
   on='click'
   trigger={<div className='menu-right'
>Requests  <Label color='red' floating>
        {this.state.requesting.length}
      </Label></div>}
   position='bottom left'>
   {this.state.requesting.map(user=>
      <div className="collection-item">{user.displayname}
       <button onClick={()=>this.acceptRequest(user.id)}>
         {user.accepted ? "Request Accepted" : "Accept Request"}
       </button>
       </div>
    )}
   </Popup>


 }
}
 export default Requests
