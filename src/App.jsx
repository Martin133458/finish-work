import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </>
  )
}

export default App