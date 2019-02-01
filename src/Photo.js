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
            {this.props.canSpinOff ? <a>{`${this.props.numSpinoffs} spinoffs`}</a>: null}
            {this.props.canSpinOff ? <button>Spinoff </button>: null}

            </div>
            <Comments comments={this.props.comments}/>

          </div>
  }

}
export default Photo
