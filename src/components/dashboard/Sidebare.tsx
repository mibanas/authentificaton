import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from "../../redux/app/AppStore";
import { logoutUser } from '../../redux/features/AuthSlice';

// icon
import { FaUserFriends } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaUnlockKeyhole } from "react-icons/fa6";


// Images and logo 
import logo from '../../assets/images/icons/logo.png'

const Sidebare = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const  handleLegout = async () => {
    
    try {
        await dispatch(logoutUser());

        navigate('/');
    } catch (error) {
        console.error('Login error:', error);
    }
};

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
            <Link to="/" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <FaHome  className='mr-3 ml-5' size={20}  color='#fdc127'/>
              <span>Home</span>
            </Link>
          </li>

        <li className='mt-5'>
            <Link to="dashboard" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <MdDashboard  className='mr-3 ml-5' size={20}  color='#fdc127'/>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className='mt-5'>
            <Link to="permission/all" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <FaUnlockKeyhole  className='mr-3 ml-5' size={17}  color='#fdc127'/>
              <span>Role And Permissions</span>
            </Link>
          </li>

          <li className='mt-5'>
            <Link to="user/allusers" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <FaUserFriends className='mr-3 ml-5' color='#fdc127' />
              <span>Users</span>
            </Link>
          </li>

          <li className='mt-5'>
            <Link to="user/allusers" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <GrTasks className='mr-3 ml-5 ' color='#fdc127'/>
              <span>Tasks</span>
            </Link>
          </li>

          <li className='mt-5'>
            <Link to="user/allusers" className='flex items-center  text-[#ffffff] hover:bg-white py-5 hover:text-[#20374b] hover:rounded-l-xl'>
              <CgProfile className='mr-3 ml-5 ' color='#fdc127'/>
              <span>Profil</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className='flex items-center absolute bottom-5 right-4 text-white'>
        <IoLogOut size={25} color='#fdc127'/>
          <button onClick={handleLegout}>
            <h1 className='text-white font-normal text-xl mt-1 ml-2'>Logout</h1>
          </button>
        
      </div>
    </div>
  )
}

export default Sidebare