import React, {useContext} from 'react';
import ToggleBtn from './ToggleBtn';
import './App.css';
import {ThemeContextWrapper}  from './theme/ThemeWrapper';

function Heading() {
  const theme = useContext(ThemeContextWrapper);
    const darkMode = theme.state.darkMode;

  return(
        <nav className={`header-wrapper ${darkMode ? "header-dark" : "header-light"}`}>
        <div >
          Where in the world?
        </div>
        <ToggleBtn/>
      </nav>
      )
}


export default Heading