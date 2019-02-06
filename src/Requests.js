import React from 'react'
import adapter from './Adapter'
class Requests extends React.Component{

  state = {
    requesting:[]
  }

  acceptRequest=(followerId)=>{
    adapter.acceptFollow(this.props.userId,followerId)
    const requesting=this.state.requesting.map(user=>{
    return user.id=followerId ? {...user, accepted:true} : user
    })
    this.setState({requesting})
  }

  componentDidMount(){
    adapter.getRequests(this.props.userId).then(
      requests=>{
        console.log(requests)
        this.setState({requesting:requests})
      }
    )
  }

 render(){
   return <div style={{float:'right'}}>
   <div className="collection"> Requests</div>
  {this.state.requesting.map(user=>
     <div class="collection-item">{user.displayname}
      <button onClick={()=>this.acceptRequest(user.id)}>
        {user.accepted ? "Request Accepted" : "Accept Request"}
      </button>
      </div>
   )}
    </div>
 }
}
 export default Requests
