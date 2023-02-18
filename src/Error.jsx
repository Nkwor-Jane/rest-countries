import React from 'react'
import { Message } from 'semantic-ui-react'

const Error = () => (
  <Message negative size='huge' style={{display:"flex", alignItems:"center", justifyContent: "center", width:"100%"}}>
    <Message.Header>ERROR!</Message.Header>
    <p>Reload the page</p>
  </Message>
)

export default Error;