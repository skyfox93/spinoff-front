import React from 'react'
import Avatar from 'react-avatar-edit'
import { Button, Form, Message } from 'semantic-ui-react'
import adapter from "../Adapter.js"
class SignUpForm extends React.Component {
  state = {
    user:{username: '',
    password: '',
    displayname: ''
  },
  error: null,
  preview: null,
  isMatch: true

  }


  onClose=()=> {
   this.setState({preview: null})
 }

  onCrop=(preview)=>{
   this.setState({preview})
 }


  handleChange = event => {
    if(event.target.name ==='password-confirm'){
      let isMatch= (this.state.user.password === event.target.value)
      this.setState({isMatch})
    }
    else{
      this.setState({
        user: {...this.state.user,[event.target.name]: event.target.value}
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.state)
    if (!this.state.isMatch){
      return
    }

  adapter.signup({...this.state.user, avatar:this.state.preview})
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


    return (

      <div className="login">
      <h2>  SignUp </h2>
      {this.state.error ? <div>{this.state.error}</div> :null}
        <Form warning={!this.state.isMatch} onSubmit={this.handleSubmit}>
          <Form.Field>
          <label htmlFor="username">Username</label>
          <input
          required
          className="ui input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.user.username}
          />
          </Form.Field>
          <Form.Field>
          <label htmlFor="password">Password</label>
          <input
          required
          className="ui input"
            type="password"
            name="password"
            placeholder="Enter a Password"
            onChange={this.handleChange}
            value={this.state.user.password}
          />
          </Form.Field>
          <Form.Field>
          <label htmlFor="password">Confirm Password</label>
          <input
          required
          className="ui input"
            type="password"
            name="password-confirm"
            placeholder="Re-Enter your password"
            onChange={this.handleChange}
            />
          {this.state.isMatch===true ? null : <Message
       warning
       content='Passwords do not match' />}
          </Form.Field>
          <Form.Field>
          <label htmlFor="displayname">Display Name</label>
          <input
            required
            type="text"
            name="displayname"
            placeholder=" Enter a display name"
            onChange={this.handleChange}
            value={this.state.user.displayname}
          />
          </Form.Field>

        <label>Profile Picture </label>
        <Avatar
        label= 'Upload a picture to display next to your name (Click Here)'
        width={600}
        height={100}
        imageWidth={500}
        onCrop={this.onCrop}
        onClose={this.onClose}
        onBeforeFileLoad={this.onBeforeFileLoad}
      />
        <Button type="submit"> Sign Up </Button>
        </Form>
      </div>
    )
  }
}

export default SignUpForm
