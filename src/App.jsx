import { useState } from 'react';
import Countries from './Countries';
import EachCountry from './EachCountry';
import Header from './Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Another from './Another';

function App() {

  return (
    <Router>
      <Header/>
    <Routes>
      <Route path='/' element={<Countries/>}/>
      <Route path='countries/:country' element={<EachCountry/>}/>
    </Routes>
      {/* <Another/> */}
    </Router>
  )
}

export default App
