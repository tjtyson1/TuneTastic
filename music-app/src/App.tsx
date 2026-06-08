import { useState } from 'react'
import './index.css'
import Signup from "./Signup.tsx"
import Login from "./Login.tsx"
import Home from "./Home.tsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return(
  <BrowserRouter>
  <Routes>
    <Route path='/register' element= {<Signup/>}></Route>
    <Route path='/login' element= {<Login/>}></Route>
     <Route path='/home' element= {<Home/>}></Route>
  
  </Routes>
  </BrowserRouter>
  )
}

export default App
