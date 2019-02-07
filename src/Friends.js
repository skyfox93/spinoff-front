import React from 'react'
import adapter from './Adapter'
import { List} from 'semantic-ui-react'
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
    adapter.requestFollow(this.props.userId,followeeId, this.props.token)

  }

  handleChange=(e)=> {
    let value=e.target.value
    if(value.length>1){
      this.setState({loading:true})
      adapter.search(this.props.userId,value,this.props.token)
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
    else{this.setState({
      noRelation:[],
      following:[],
      requested: [],
    })
  }
  }
  results=()=> {
    return <List size='big'>
      {this.state.following.map(
        (result=> <List.Item><List.Header><span>{result.displayname}</span><span>Friends</span></List.Header></List.Item>)
      )}
      {this.state.noRelation.map(
        (result=>
          <List.Item ><List.Header>
<span>{result.displayname}</span><button onClick={()=>this.requestFollow(result.id)} >{result.requested ? "Requested": "Follow"}</button></List.Header>
</List.Item>
      ))}
      {this.state.requested.map(
        (result=>
          <List.Item><List.Header><span>{result.displayname}</span><button onClick={()=>this.requestFollow(result.id)} >Requested</button></List.Header></List.Item>
      ))}
      </List>

  }

  render(){

    return <>
    <input className="search-bar" type='text' onKeyUp={this.handleChange} value={this.state.name} placeholder='Search Users'/>
    {this.state.noRelation.length>0 || this.state.following.length>0 || this.state.requested.length>0 ?
      <div style={{width:'100%',position:'absolute',zIndex:'1',}}>
      <div className='collection'>
     {this.results()}
    </div></div> : null

    }
    </>

  }
}
export default Friends
