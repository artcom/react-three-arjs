import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Game from './pages/Game';
import SignRules from './pages/SignRules'
import Admin from './pages/Admin'
import Clues from './pages/Clues'
import Stats from './pages/Stats'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Game />}/>
        <Route exact path='/SignRules' element={<SignRules />}/>
        <Route exact path='/Clues' element={<Clues />}/>
        <Route exact path='/Stats' element={<Stats />}/>
        <Route exact path='/Admin' element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App