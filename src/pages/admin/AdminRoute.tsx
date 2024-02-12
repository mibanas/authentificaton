import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
import ProfilUser from './users/ProfilUser'
import AllUser from './users/AllUser'
import EditUser from './users/EditUser'
import AddUser from './users/AddUser'

const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path='Dashboard' element={<Dashboard />}/>
                <Route path='user'>
                  <Route path='' element={<ProfilUser />}/>
                  <Route path='allusers' element={<AllUser />}/>
                  <Route path='edit' element={<EditUser />}/>
                  <Route path='add' element={<AddUser />}/>
                </Route>
            </Route>
        </Routes>
    </div>
  )
}

export default AdminRoute