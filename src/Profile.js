import React from 'react'
import PhotoViewer from './PhotoViewer'
class Profile extends React.Component {

  componentDidMount(){
  }

  render(){
    return <PhotoViewer
    profileView={true}
    setViewingUser={this.props.setViewingUser}
    viewingUser={this.props.viewingUser}
    photos={this.props.photos}
    baseUrl={this.props.baseUrl}
    spinOffPhoto={this.spinoffPhoto}
    viewPhoto={this.props.viewPhoto}
    editPhoto={this.props.editPhoto}
    showingOrig={false}
    deSelect={this.props.deSelect}
    />

  }
}
export default Profile
