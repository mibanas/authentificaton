import React, { useState } from 'react';
import { ToggleSwitch } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

import { GoPasskeyFill } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { addRole } from '../../../services/api/permissions/PermissionsApi';

const Addpermission = () => {
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState({
    role: '',
    create: false,
    read: false,
    update: false,
    deletee: false,
  });

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    await addRole(permissions)
    navigate('/admin/permission/all');
  };

  return (
    <div className='flex flex-col items-start mt-28 ml-36'>
      <h1 className='mb-6'>Add Role with Permissions</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center bg-[#20374b] mb-16 py-2 px-6 rounded-full w-96'>
          <GoPasskeyFill className='mr-5' color='white' size={25}/>
          <input
            className='bg-transparent border-0 focus:outline-none text-white'
            type="text"
            value={permissions.role}
            required
            onChange={(e) => setPermissions({ ...permissions, role: e.target.value })}
            placeholder='Add role name ....'
          />
        </div>
        <div>
          <ToggleSwitch className='mb-3' checked={permissions.create} label="Create" onChange={(value) => setPermissions({ ...permissions, create: value })} />
          <ToggleSwitch className='mb-3' checked={permissions.read} label="Read" onChange={(value) => setPermissions({ ...permissions, read: value })} />
          <ToggleSwitch className='mb-3' checked={permissions.update} label="Update" onChange={(value) => setPermissions({ ...permissions, update: value })} />
          <ToggleSwitch className='mb-10' checked={permissions.deletee} label="Delete" onChange={(value) => setPermissions({ ...permissions, deletee: value })} />
        </div>
        <button type="submit" className="flex items-center justify-center bg-[#20374b] hover:bg-[#000000] text-[#ffffff] font-normal py-2 px-4 rounded">
            <HiOutlinePencilSquare className="mr-2" size={20} /> Add Role
          </button>
      </form>
    </div>
  );
}

export default Addpermission;
