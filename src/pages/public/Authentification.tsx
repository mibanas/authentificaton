import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Authentification = () => {
  return (
    <div className='bg-[#20374b]'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  )
}

export default Authentification