import React, {useState} from 'react'
import { Header, Radio, Segment } from 'semantic-ui-react'
import { ThemeContext, themes } from './context/COUNTRYCONTEXT';
import ToggleBtn from './ToggleBtn';
import './App.css';

function Heading() {
  const [darkMode, setDarkMode] = useState(true);

  return(
        <div className='header-wrapper'>
        <div >
          Where in the world?
        </div>
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
      </div>
      )
}


export default Heading