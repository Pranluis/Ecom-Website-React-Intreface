import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Login from './components/LoginPage/login'
import RegisterPage from './components/RegisterPage/RegisterPage'
import CRUD from './components/ExtraContent/CRUD';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product-management" element={<CRUD/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
