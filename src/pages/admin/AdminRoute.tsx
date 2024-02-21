import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
// users
import ProfilUser from './users/ProfilUser'
import AllUser from './users/AllUser'
import EditUser from './users/EditUser'
import AddUser from './users/AddUser'

// Permissions
import Onepermission from './permissions/Onepermission'
import Allpermissions from './permissions/Allpermissions'
import Updatepermission from './permissions/Updatepermission'
import Addpermission from './permissions/Addpermission'


const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path='Dashboard' element={<Dashboard />}/>
                
                <Route path='user'>
                  <Route path=':userID' element={<ProfilUser />}/>
                  <Route path='allusers' element={<AllUser />}/>
                  <Route path='edit/:userID' element={<EditUser />}/>
                  <Route path='add' element={<AddUser />}/>
                </Route>

                <Route path='permission'>
                  <Route path=':permissionID' element={<Onepermission />}/>
                  <Route path='all' element={<Allpermissions />}/>
                  <Route path='edit/:permissionID' element={<Updatepermission />}/>
                  <Route path='add' element={<Addpermission />}/>
                </Route>

            </Route>
        </Routes>
    </div>
  )
}

export default AdminRoute