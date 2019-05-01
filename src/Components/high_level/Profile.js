import React from 'react'
import PhotoViewer from '../mid_level/PhotoViewer'
import { connect } from 'react-redux'
class Profile extends React.Component {

  componentDidMount(){
  }

  profilePhotos=()=> {
    return this.props.photos.filter(photo => (photo.user.id=== this.props.user.id||
     photo.owner.id=== this.props.user.id)
   )
  }

  render(){
    return(
    <PhotoViewer
    view='Profile'
    photos={this.profilePhotos()}
    viewPhoto={this.props.viewPhoto}
    user={this.props.user}
    />
  )
  }
}
function mapStateToProps(state){
  return {
    photos:state.photos,
    user: state.viewingUser
  }
}
export default connect(mapStateToProps)(Profile)
