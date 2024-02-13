import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Select, ToggleSwitch } from 'flowbite-react';

// Icons 
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";

// Images
import photo from "../../../assets/images/dashboard/photos.jpg";

const AddUser = () => {
    const [switch1, setSwitch1] = useState(false);
    const [switch2, setSwitch2] = useState(false);
    const [switch3, setSwitch3] = useState(false);
    const [switch4, setSwitch4] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [createPermission, setCreatePermission] = useState(false);
    const [readPermission, setReadPermission] = useState(false);
    const [updatePermission, setUpdatePermission] = useState(false);
    const [deletePermission, setDeletePermission] = useState(false);

    const handleSubmit = (e : any) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Form submitted');
      // Reset form fields
      setEmail('');
      setPassword('');
      setRole('');
      setCreatePermission(false);
      setReadPermission(false);
      setUpdatePermission(false);
      setDeletePermission(false);
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

        <div className='bg-[#20374b] mt-8 w-5/12 h-full flex'>
          <div>
            <img src={photo} alt="Logo de l'application" className='w-52'/>
          </div>
          <div className='ml-6 flex flex-col justify-start items-start'>
            <h1 className='mt-6 text-3xl text-[#fdc127] font-thin'>User Name : Active </h1>
            <h1 className='mt-6 text-3xl text-white'>Mohamed SANABI</h1>
          </div>
        </div>

        <div className='flex mt-24 ml-32 justify-start'>
          <form >
            <div className="max-w-md mb-6">
              <div className="mb-2 block">
                <Label htmlFor="role" value="Select User Role" />
              </div>
              <Select id="role" required>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Resposible</option>
                <option>User</option>
              </Select>
            </div>

            <div className="flex max-w-md flex-col gap-4">
              <ToggleSwitch checked={switch1} label="Create" onChange={setSwitch1} />
              <ToggleSwitch checked={switch2} label="Read" onChange={setSwitch2} />
              <ToggleSwitch checked={switch3} label="Update" onChange={setSwitch3} />
              <ToggleSwitch checked={switch4} label="Delete" onChange={setSwitch4} />
            </div>

          </form>
        </div>

      </div>
  )
}

export default AddUser