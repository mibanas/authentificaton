import { useEffect, useState } from 'react';
import { Select, ToggleSwitch } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';


import UsePermissions from '../../../hooks/permissions/UsePermissions';

// Icons 
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { getRoleById, updateRoleById } from '../../../services/api/permissions/PermissionsApi';


interface Role {
  _id: string;
  role: string;
  permission: {
    _id: string;
    module: string;
    create: boolean;
    read: boolean;
    update: boolean;
    deletee: boolean;
  };
}

const Updatepermission = () => {
  const navigate = useNavigate()
  const { permissionID } = useParams<string>()
  const { roles, loadRoles } = UsePermissions();
  const [ role, setPermissions] = useState({
    role: '',
    create: false,
    read: false,
    update: false,
    deletee: false,
  });

  useEffect(() => {
    const getOneRole = async() => {
      const role = await getRoleById(permissionID as string)
      console.log(role.data);
      
      setPermissions(formatPermissions(role.data))
    }
    getOneRole()
  }, [])

  const formatPermissions = (role: Role) => {    
    return {
      role: role.role,
      create: role.permission.create,
      read: role.permission.read,
      update: role.permission.update,
      deletee: role.permission.deletee,
    };
  };
  


  const handleSubmit = async (e : any) => {
    e.preventDefault();
    await updateRoleById(permissionID as string, role)
    navigate('/admin/permission/all')
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='text-[#20374b] font-normal text-5xl'>Role And Permissions</p>
        <div className='flex items-center justify-end'>
          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <Link to='/admin/user/add'>
              <MdDashboard color='#fdc127' size={25}/>
            </Link>
          </button>
          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <Link to='/admin/user/add'>
              <FaHome color='#fdc127' size={25}/>
            </Link>
          </button>
        </div>
      </div>
  
      <div className='flex mt-24 ml-32 justify-start'>
        <form onSubmit={handleSubmit}>
          <div className="max-w-md mb-6">
            <Select id="role" value={role.role} required>
              {roles.map((role: Role) => (
                <option key={role._id}>{role.role}</option>
              ))}
            </Select>
          </div>
  
          <div className="flex max-w-md flex-col gap-4">
            {role && 
              <>
                <ToggleSwitch className='mb-2' checked={role.create} label="Create" onChange={(value) => setPermissions({ ...role, create: value })} />
                <ToggleSwitch className='mb-2' checked={role.read} label="Read" onChange={(value) => setPermissions({ ...role, read: value })} />
                <ToggleSwitch className='mb-2' checked={role.update} label="Update" onChange={(value) => setPermissions({ ...role, update: value })} />
                <ToggleSwitch className='mb-6' checked={role.deletee} label="Delete" onChange={(value) => setPermissions({ ...role, deletee: value })} />
              </>
            }
          </div>
  
          <button type="submit" className="flex items-center justify-center bg-[#20374b] hover:bg-[#000000] text-[#fdc127] font-normal py-2 px-4 rounded">
            <HiOutlinePencilSquare className="mr-2" size={20} /> Update Role
          </button>
        </form>
      </div>
    </div>
  );
}

export default Updatepermission