import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage/homePage'
import CRUD from './components/ExtraContent/CRUD'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <HomePage name="Pranluis" /> */}
      <CRUD/>
      {/* <Extracomp /> */}
    </>
  )
}

export default App
