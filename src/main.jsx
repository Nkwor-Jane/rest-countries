import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import ThemeContextWrapper from './theme/ThemeWrapper'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeContextWrapper>
        <App />
    </ThemeContextWrapper>
)
