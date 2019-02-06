import React from 'react'
import adapter from './Adapter'
class Friends extends React.Component{

  state= {
    // notReqResults= users that match the search,
    //to whom no follow request was made
    noRelation:[],
    following:[],
    requested: [],
    searchLength: 0,
    loading: false
  }
  requestFollow= (followeeId)=> {
    let noRelation= this.state.noRelation.map(
      user=>
        user.id===followeeId ? {...user, requested:true} : user
    )
      this.setState({noRelation})
    adapter.requestFollow(this.props.userId,followeeId)

  }

  handleChange=(e)=> {
    let value=e.target.value
    if(value.length>1){
      this.setState({loading:true})
      adapter.search(this.props.userId,value)
      .then(data=>{
        console.log(data)
        // if no results, set results to empty array
        const noRelation= data.no_relation || []
        const following= data.following || []
        const requested= data.requested || []
        this.setState({
          noRelation,
          following,
          requested,
          loading:false
        })
      })
    }
  }
  results=()=> {
    return <div className="collection">
      {this.state.following.map(
        (result=> <div class="collection-item"><span>{result.displayname}</span><span>Friends</span></div>)
      )}
      {this.state.noRelation.map(
        (result=>
          <div className="collection-item"><span>{result.displayname}</span><button onClick={()=>this.requestFollow(result.id)} >{result.requested ? "Requested": "Follow"}</button></div>
      ))}
      {this.state.requested.map(
        (result=>
          <div className="collection-item"><span>{result.displayname}</span><button onClick={()=>this.requestFollow(result.id)} >Requested</button></div>
      ))}
      </div>

  }

  render(){

    return <div>
    <input className="search-bar" type='text' onKeyUp={this.handleChange} value={this.state.name} placeholder='Search Users'/>
    { this.results()}
    </div>

  }
}
export default Friends
