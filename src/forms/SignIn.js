import React from 'react'
import { withRouter } from 'react-router-dom'

import { Button, Divider, Form, Grid, Segment, Message } from 'semantic-ui-react'
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

  handleLogin = event => {
    event.preventDefault()
    // console.log(this.state)

    fetch(`https://spinoff.herokuapp.com/api/v1/login`, {
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
  // Redirect to Signup page
  handleRedirect =() =>{
    this.props.history.push('/signup')
  }



  render() {
    return (
      <React.Fragment>
        <div> <h1>Welcome to Spinoff! </h1>
          <Segment placeholder>

            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
              <Form onSubmit={this.handleLogin}>
              { this.state.error ? <Message warn> {this.state.error} </Message> : null}

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

                  <Form.Button content='Login' primary  />
                  </Form>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <Button content='Sign up' icon='signup' size='big' onClick={this.handleRedirect} />
              </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
          </Segment>
          <img src='/example.png'/>
        </div>
      </React.Fragment>
    )


  }
}

export default withRouter(SignInForm)
