import React from 'react'

import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
class SignInForm extends React.Component {
  state = {
    user:{username: '',
    password: ''
  },
  error: null,
  }

  handleChange = event => {
    this.setState({
      user: {...this.state.user,[event.target.name]: event.target.value}
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.state)

    fetch(`http://localhost:3000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({user:this.state.user})
    })
    .then(resp =>{
      resp.json().then(
        json => {
          if(resp.ok){
            this.props.updateCurrentUser(json)
            debugger
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
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>

          <Form.Input icon='user' iconPosition='left' label='Username'
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}/>

          <Form.Input icon='lock' iconPosition='left' label='Password'  type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password} />

          <Button content='Login' primary onClick={this.handleSubmit} />

      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big'  />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
)


  }
}

export default SignInForm
