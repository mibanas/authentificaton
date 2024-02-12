import Sidebare from '../../components/dashboard/Sidebare'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex flex-row'>
         <div className=' w-3/12'>
            <Sidebare/>
        </div>
        <div className='w-9/12'>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default AdminLayout