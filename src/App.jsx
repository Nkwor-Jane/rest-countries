import Countries from './Countries';
import EachCountry from './EachCountry';
import Header from './Header';

import { CountryContextProvider } from './context/COUNTRYCONTEXT';
import {ThemeContext, themes} from './context/ThemeContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <CountryContextProvider>
      <Router>
        <Header/>
      <Routes>
        <Route exact path='/' element={<Countries/>}/>
        <Route path='/:name' element={<EachCountry/>}/>
      </Routes>
      </Router>
    </CountryContextProvider>
  )
}

export default App;
