import { useState } from 'react'
import './index.css'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
import Search from "./Search.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App() {

  return(
  <BrowserRouter>
  <Routes>
    <Route path='/register' element= {<Signup/>}></Route>
    <Route path='/login' element= {<Login/>}></Route>
    <Route path='/library' element= {<Home/>}></Route>
    <Route path='/search' element= {<Search/>}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
