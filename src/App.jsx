import { useState } from 'react'
import './App.css'
import CRUD from './components/ExtraContent/CRUD'
import Login from './components/LoginPage/login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
      {/* <CRUD/> */}
      {/* <Extracomp /> */}
    </>
  )
}

export default App
