import React from 'react'
import Comments from './Comments'
class Photo extends React.Component{

render(){
  return <div key={this.props.id}>
          <img
            src={this.props.baseUrl+this.props.url}
            />
          </div>
  }

}
export default Photo
