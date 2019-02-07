import React from 'react'
import adapter from './Adapter'
class Requests extends React.Component{

  state = {
    requesting:[]
  }

  acceptRequest=(followerId)=>{
    adapter.acceptFollow(this.props.userId,followerId,this.props.token)
    const requesting=this.state.requesting.map(user=>{
    return user.id=followerId ? {...user, accepted:true} : user
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
   return <div style={{float:'right'}}>
   <div> Requests</div>
  {this.state.requesting.map(user=>
     <div className="collection-item">{user.displayname}
      <button onClick={()=>this.acceptRequest(user.id)}>
        {user.accepted ? "Request Accepted" : "Accept Request"}
      </button>
      </div>
   )}
    </div>
 }
}
 export default Requests
