import React, { useContext } from "react";
import { ThemeContextWrapper } from "./theme/ThemeWrapper";
import {Icon} from "semantic-ui-react";
import "./App.css";

export default function ToggleBtn() {
  const theme = useContext(ThemeContextWrapper);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };
  return (
    <div  onClick={onClick} style={{cursor: "pointer"}}>
      {darkMode ? (
            <p><Icon name="moon"/>Dark Mode</p>
        ):(
            <p><Icon name="moon outline"/>Dark Mode</p>
      )}
    </div>
    
  );
}
