import React from 'react'
import adapter from './Adapter'
import { Popup, Image, List, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class Friends extends React.Component {

  state = {
    // notReqResults= users that match the search,
    //to whom no follow request was made
    noRelation: [],
    following: [],
    requested: [],
    searchLength: 0,
    loading: false
  }
  requestFollow = (followeeId) => {
    let noRelation = this.state.noRelation.map(
      user =>
        user.id === followeeId ? { ...user, requested: true } : user
    )
    this.setState({ noRelation })
    adapter.requestFollow(this.props.userId, followeeId, this.props.token)

  }

  componentDidMount(){
   this.search('')
  }

  handleChange = (e) => {
    let value = e.target.value
    this.setState({ loading: true })
    this.search(value)
  }

  search = (value) => {
    adapter.search(this.props.userId, value, this.props.token)
    .then(data => {
      // if no results, set results to empty array
      this.setState({results: data})
    })
  }
  
  results = () => {
    let baseUrl = this.props.baseUrl
    return (
      <List size='small'>
        {this.state.results.map(
          (result =>
            <List.Item>
              <List.Header>
                <Image src={baseUrl + result.avatar.url} className='user-avatar' avatar />
                <Link to='/profile' onClick={() => this.props.setViewingUser(result)}>
                  {result.displayname}
                </Link>
              </List.Header>
            </List.Item>
          )
        )}
      </List>
    )
  }

  render() {

    return <>
      <Popup
        on='focus'
        trigger={<input className="search-bar" type='text' onKeyUp={this.handleChange} value={this.state.name} placeholder='Search Users' />}
      >
          <div className='collection'>
            {this.state.results && this.results()}
          </div>
      </Popup>
    </>

  }
}
export default Friends
