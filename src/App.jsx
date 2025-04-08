import { useState } from 'react'
import './App.css'
import CRUD from './components/ExtraContent/CRUD'
import Login from './components/LoginPage/login'
import RegisterPage from './components/RegisterPage/RegisterPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login/> */}
      <RegisterPage/>
      {/* <CRUD/> */}
      {/* <Extracomp /> */}
    </>
  )
}

export default App
