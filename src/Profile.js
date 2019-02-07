import React from 'react'

class Profile extends React.Component {
  state= {
    profilePhotos= []
  }

  getPhotos=() {
    adapter.getProfile
  }
  componentDidMount(){
  this.getPhotos()
  }
}
