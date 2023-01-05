import {useState, useEffect} from 'react';
import {ThemeContext, themes} from'../context/ThemeContext';

export default function ThemeContextWrapper(props){
    const [theme, setTheme] = useState(themes.light);
}

function changeTheme(theme){
    setTheme(theme);
}

useEffect(() =>{
    switch(theme) {
        case theme.dark:
            document.body.classList.add("dark-content");
            break;
        case themes.dark:
            default:
                document.body.classList.remove("dark-content");
                break;
    }
}, [theme]);

return (
    <ThemeContext.Provider value={{theme:theme, changeTheme:changeTheme}}>
        {props.children}
    </ThemeContext.Provider>
)