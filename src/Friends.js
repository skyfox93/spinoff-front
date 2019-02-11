import React from 'react'
import adapter from './Adapter'
import {Popup, Image, List, Button} from 'semantic-ui-react'
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
    let baseUrl=this.props.baseUrl
    return <List size='small'>
      {this.state.following.map(
        (result=><List.Item><List.Header><Image src={baseUrl+result.avatar.url} className='user-avatar' avatar /><span>{result.displayname}</span><span>Friends</span></List.Header></List.Item>)
      )}
      {this.state.noRelation.map(
        (result=>
          <List.Item ><List.Header><Image src={this.props.baseUrl+result.avatar.url} className='user-avatar'  avatar />
<span>{result.displayname}</span><Button floated='right' onClick={()=>this.requestFollow(result.id)} >{result.requested ? "Requested": "Follow"}</Button></List.Header>
</List.Item>
      ))}
      {this.state.requested.map(
        (result=>
          <List.Item><List.Header><Image src={this.props.baseUrl+result.avatar.url} className='user-avatar' avatar />
<span>{result.displayname}</span><Button  floated='right' onClick={()=>this.requestFollow(result.id)} >Requested</Button></List.Header></List.Item>
      ))}
      </List>

  }

  render(){

    return <>
    <Popup
    on='focus'
    trigger={<input className="search-bar" type='text' onKeyUp={this.handleChange} value={this.state.name} placeholder='Search Users'/>}
    >
    {this.state.noRelation.length>0 || this.state.following.length>0 || this.state.requested.length>0 ?
      <div className='collection'>
     {this.results()}
    </div> : null}
    </Popup>
    </>

  }
}
export default Friends
