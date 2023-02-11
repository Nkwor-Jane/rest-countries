import React, {useState} from 'react';
import { ThemeContext, themes } from './context/COUNTRYCONTEXT';
import {Icon, Header} from 'semantic-ui-react'

export default function ToggleBtn(props) {
    
    return (
        <div>
        <div 
        onClick={() => {
            props.toggleDark();
        }}
        style={{cursor:'pointer'}}
    >
        <Icon name="moon outline"/>
        Dark Mode</div> 
        </div>
    )
}
