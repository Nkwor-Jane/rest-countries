import React, {useContext} from 'react'
import { Message } from 'semantic-ui-react'
import {ThemeContextWrapper}  from './theme/ThemeWrapper';

const Error = () => {

  const theme = useContext(ThemeContextWrapper);
  const darkMode = theme.state.darkMode;

  <Message negative size='huge' className={`${darkMode ? "dark" : "light"}`}style={{marginTop: "3rem",display:"flex", alignItems:"center", justifyContent: "center", width:"100%"}}>
    <Message.Header>ERROR!</Message.Header>{"  "}
    <p>Reload the page</p>
  </Message>
}

export default Error;