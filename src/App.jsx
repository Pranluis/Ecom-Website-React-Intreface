import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'; 
import React from 'react';
import ReactDOM from 'react-dom/client'
// import CRUD from './components/ExtraContent/CRUD'
import Dasboard from './components/Dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <HomePage name="Pranluis" /> */}
      {/* <CRUD/> */}
      {/* <Extracomp /> */}
      <Dasboard/>
        </>
  )
}

export default App
