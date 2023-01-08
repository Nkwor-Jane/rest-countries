import React, {useState} from 'react';
import { ThemeContext, themes } from './context/COUNTRYCONTEXT';
import {Icon, Header} from 'semantic-ui-react'

export default function ToggleBtn(props) {
    
    return (
        <div>
        <Header as='h4' 
        floated='right' 
        icon='moon outline' 
        content='Dark Mode'
        onClick={() => {
            props.toggleDark();
        }}
        style={{cursor:'pointer'}}
    /> 
        </div>
    )
}
