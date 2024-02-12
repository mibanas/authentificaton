import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Authentification from './Authentification'
import Homepage from './Homepage'
import PublicLayout from './PublicLayout'

const PublicRoute = () => {
  return (
    <div>
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/auth/*" element={<Authentification />} />
            </Route>
        </Routes>
    </div>
  )
}

export default PublicRoute