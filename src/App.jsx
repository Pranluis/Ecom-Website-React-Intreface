import { useState } from 'react'
import './App.css'
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
