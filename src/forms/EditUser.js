import React from 'react'
import Avatar from 'react-avatar-edit'

class SignUpForm extends React.Component {
  state = {
    user:{username: '',
    password: ''
  },
  error: null,
  preview: null
  }


  onClose=()=> {
   this.setState({preview: null})
 }

  onCrop=(preview)=>{
   this.setState({preview})
 }


  handleChange = event => {
    this.setState({
      user: {...this.state.user,[event.target.name]: event.target.value}
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.state)

    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({
        user:{...this.state.user, avatar:this.state.preview}
      })
    })
    .then(resp =>{
      resp.json().then(
        json => {
          if(resp.ok){
            this.props.updateCurrentUser(json)
            //this.props.fetchMyStuff(json.id)
          }
          else{
            console.log(json)
            if(json.message){
              this.setState({error: json.message})}
            else {this.setState({error: resp.statusText})}
          }
        }
      )
    }
  )
  }



  render() {
    console.log('login rendereddd')
    return (
      <div className="login">
      <h2>  SignUp </h2>
      {this.state.error ? <div>{this.state.error}</div> :null}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
          className="ui input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
          className="ui input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        <Avatar
        width={390}
        height={295}
        imageWidth={500}
        onCrop={this.onCrop}
        onClose={this.onClose}
        onBeforeFileLoad={this.onBeforeFileLoad}
      />
      <img src={this.state.preview} alt="Preview" />

        <input className="ui input" type="submit" value="SignUp"/>
        </form>
      </div>
    )
  }
}

export default SignUpForm
