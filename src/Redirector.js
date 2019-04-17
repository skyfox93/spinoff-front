import React from 'react'
import { withRouter } from 'react-router-dom'
const Redirector= props=>{
  props.history.push(props.to)
  return ''
}
export default withRouter(Redirector)
