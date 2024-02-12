import React from 'react'

// Icons 
import { CiSearch } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import { RiUserAddFill } from "react-icons/ri";
import { Link } from 'react-router-dom';


const AllUser = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='text-[#20374b] font-normal text-5xl'>User List</p>
        <div className='flex items-center justify-end'>

          <div className='flex items-center bg-[#20374b] py-4 px-6 rounded-full w-96'>
            <CiSearch  className='mr-5 ' color='white' size={25}/>
            <input className='bg-transparent border-none focus:outline-none text-white'
              type="text"  
              placeholder='Search here ....'
            />
            
          </div>
          
          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <GrSearch color='#F9F871' size={25}/>
          </button>

          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <Link to='/admin/user/add'>
              <RiUserAddFill color='#F9F871' size={25}/>
            </Link>
          </button>
        </div>
      </div>
      
      <div>
        talbeau
      </div>

    </div>
  )
}

export default AllUser