import React from 'react'
import PhotoViewer from './PhotoViewer'
import { connect } from 'react-redux'
// rendered as a class function to prepare for a refactor
class Spinoffs extends React.Component {

  getSelectedPhoto= (getOrig)=>{
    const id=this.props.id
    let selected= this.props.photos.find(photo=> photo.id ===id)
    let original= this.props.photos.find(photo=> photo.id ===selected.photo_id)
    return (getOrig ? original : selected )
  }

  spinoffs = () => {
    let selected=this.getSelectedPhoto()
    const originalId=selected.photo_id
    return this.props.photos.filter((photo)=> photo.photo_id=== originalId )
  }
  render(){
    return(
      <PhotoViewer
        view='Spinoffs'
        photos={this.spinoffs()}
        selected={this.getSelectedPhoto(true)}
        viewPhoto={this.props.viewPhoto}
      />
    )
  }
}
function mapStateToProps(state){
  return {photos:state.photos}
}
export default connect(mapStateToProps)(Spinoffs)
