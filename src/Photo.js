import React from 'react'
import Comment from './Comments'
const Comments=(props=>
  props.comments.map((comment)=>
    <Comment {...comment}
      />
  )
)
class Photo extends React.Component{

render(){
  return <div key={this.props.id}>

          <img

            src={this.props.baseUrl+this.props.url}
            style={{width:'500px'}}
            />
            <div className='photo-UI'>
            <a onClick={()=>this.props.viewPhoto(this.props.id)}>{
              this.props.photo_id ?
                !this.props.showingOrig ? 'View Original': null
              : `${this.props.numSpinoffs} spinoffs`}
                </a>
            {this.props.photo_id ?
              null : <button onClick={()=>this.props.editPhoto(this.props.id)}>Spinoff </button>}
            </div>
            <Comments comments={this.props.comments}/>
          </div>
  }

}
export default Photo
