import React from 'react'

class Comment extends React.Component{
  constructor(props){
    super(props)
    this.state = {content:this.props.content}
  }

  render(){
    return  <div><div>{this.props.content}</div><div>{this.props.user_DName}</div></div>
  }
}
export default Comment
