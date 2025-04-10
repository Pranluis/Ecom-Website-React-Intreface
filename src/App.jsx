import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/LoginPage/Login';
import RegisterPage from './components/RegisterPage/RegisterPage'
import CRUD from './components/ProductDash/CRUD';
import Dashboard from './components/Dashboard/Dashboard';
import CartPage from './components/CartPage/CartPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<GetUser/>}/>
          
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product-management" element={<CRUD/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/carts" element={<CartPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
