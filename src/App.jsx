import Countries from './Countries';
import EachCountry from './EachCountry';
import Heading from './Heading';
import { CountryContextProvider } from './context/COUNTRYCONTEXT';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <CountryContextProvider>
      <Router>
        <Heading/>
      <Routes>
        <Route exact path='/' element={<Countries/>}/>
        <Route path='/:name' element={<EachCountry/>}/>
      </Routes>
      </Router>
    </CountryContextProvider>
  )
}

export default App;
