import { useEffect, useState } from 'react';
import { Label, Select, ToggleSwitch } from 'flowbite-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUserById } from "../../../services/api/user/UserApi";
import toast, { Toaster } from 'react-hot-toast';

import UsePermissions from '../../../hooks/permissions/UsePermissions';

// Icons 
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";

// Images
import photo from "../../../assets/images/dashboard/photos.jpg";
import UseUsers from '../../../hooks/users/UseUsers';

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
    // Ajoutez d'autres champs de permission si nécessaire
  };
}

interface User {
  _id: string;
  completeName: string;
  email: string;
  isActive: boolean;
  role: {
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
  };
}

const EditUser = () => {
  const navigate = useNavigate();
  const { roles, loadRoles } = UsePermissions();
  const { loadUsers } = UseUsers();
  const [user, setUser] = useState<User>();
  const [updateRole, setUpdateRole] = useState({
    roleName: ''
  });  const { userID  } = useParams();
  const [selectedRole, setSelectedRole] = useState('');

  const [create, setSwitch1] = useState(false);
  const [read, setSwitch2] = useState(false);
  const [update, setSwitch3] = useState(false);
  const [deletee, setSwitch4] = useState(false);


  useEffect(() => {
    const getuster = async() => {
      try {
        const user = await getUserById(userID as string)
        setUser(user.data)
      } catch (error : any) {
        console.error('Erreur lors du chargement des utilisateurs :', error.message)
      }
    }
    getuster()
  }, [])


  const handleSubmit = async (e : any) => {
    e.preventDefault();

    const updatedRole = {
      ...updateRole,
      roleName: selectedRole || '' // Mettre à jour le roleName avec la valeur du rôle de l'utilisateur
    };
    
    try {
      setUpdateRole(updatedRole);
      await updateUserById(userID as string, updatedRole);
      toast.success('User Role Updated Successfully!')
      await loadUsers(1)
      navigate('/admin/user/allusers')
      
    } catch (error : any) {
      if (error.response.status === 403) {
        toast.error("Vous n'êtes pas autorisé à modifier cet utilisateur.")
      } else {
      }
    }
  };

return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

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

      <div className='bg-[#20374b] mt-8 w-5/12 h-full flex'>
        <div>
          <img src={photo} alt="Logo de l'application" className='w-52'/>
        </div>
        <div className='ml-6 flex flex-col justify-start items-start'>
          {user && (
            <>
              <h1 className='mt-6 text-3xl text-[#fdc127] font-thin'>
                User Name : {user.isActive ? 'Active' : 'Inactive'}
              </h1>              
              <h1 className='mt-6 text-3xl text-white'>{user.completeName}</h1>
            </>
          )}
        </div>
      </div>

      <div className='flex mt-24 ml-32 justify-start'>
        <form onSubmit={handleSubmit}>
          <div className="max-w-md mb-6">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Select User Role" />
            </div>
            <Select id="role" value={user?.role?.role || ''} onChange={(e) => setSelectedRole(e.target.value)} required>
            {roles.map((role : Role) => (
              <option key={role._id}>{role.role}</option>
            ))}

            </Select>
          </div>

          <div className="flex max-w-md flex-col gap-4">
          {user && 
            <div key={user._id}>
              <ToggleSwitch className='mb-2' checked={user?.role?.permission.create || false } label="Create" onChange={setSwitch1} />
              <ToggleSwitch className='mb-2' checked={user?.role?.permission.read || false } label="Read" onChange={setSwitch2} />
              <ToggleSwitch className='mb-2' checked={user?.role?.permission.update || false } label="Update" onChange={setSwitch3} />
              <ToggleSwitch className='mb-2' checked={user?.role?.permission.deletee || false } label="Delete" onChange={setSwitch4} />
            </div>
          }
          </div>

          <button type="submit" className="flex items-center justify-center bg-[#20374b] hover:bg-[#005F75] text-[#fdc127] font-normal py-2 px-4 rounded">
            <HiOutlinePencilSquare className="mr-2" size={20} /> Update Role
          </button>

        </form>
      </div>

    </div>
  )
}

export default EditUser