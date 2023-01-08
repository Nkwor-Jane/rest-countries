import React, {useState} from 'react'
import { Header, Radio, Segment } from 'semantic-ui-react'
import { ThemeContext, themes } from './context/COUNTRYCONTEXT';
import ToggleBtn from './ToggleBtn';
import './App.css';

function Heading() {
  const [darkMode, setDarkMode] = useState(true);

  return(
        <Segment clearing>
        <Header as='h2' floated='left'>
          Where in the world?
        </Header>
      <ThemeContext.Consumer>
      {({changeTheme}) => (
        <ToggleBtn
        toggleDark={() =>{
          setDarkMode(!darkMode);
          changeTheme(darkMode ? themes.dark : themes.light)
        }}
        />
    )}
      </ThemeContext.Consumer>
      </Segment>
      )
}


export default Heading