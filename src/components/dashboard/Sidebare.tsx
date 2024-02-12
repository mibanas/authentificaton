import React from 'react'
import { Link } from 'react-router-dom'

// icon
import { FaUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

// Images and logo 
import logo from '../../assets/images/icons/logo.png'

const Sidebare = () => {

  return (
    <div className='bg-[#20374b] h-screen flex justify-center relative'>
      {/* Logo et titre */}
      <div className='flex items-center absolute top-5'>
        <img src={logo} alt="Logo MPI Todolist" className='w-10 h-auto cursor-pointer mr-3' />
        <h1 className='text-[#ffffff] font-bold text-4xl mt-1'>LISTES</h1>
      </div>
      
      {/* Liens de navigation */}
      <div className='mt-52 w-full ml-4'>
        <ul >
        <li className='mt-5'>
            <Link to="dashboard" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <MdDashboard  className='mr-3 ml-5' size={20}  color='#fdc127'/>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className='mt-5'>
            <Link to="user/allusers" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <FaUser className='mr-3 ml-5' color='#fdc127' />
              <span>Users</span>
            </Link>
          </li>

          <li className='mt-5'>
            <Link to="user/allusers" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <GrTasks className='mr-3 ml-5 ' color='#fdc127'/>
              <span>Tasks</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bouton de déconnexion */}
      <div className='flex items-center absolute bottom-5 right-4 text-white'>
        <IoLogOut size={25} color='#fdc127'/>
        <h1 className='text-white font-normal text-xl mt-1 ml-2'>Logout</h1> 
      </div>
    </div>
  )
}

export default Sidebare