import UseUsers from '../../../hooks/users/UseUsers';
import { Table } from 'flowbite-react';
import { Pagination } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';

// api 
import { deleteUserById } from "../../../services/api/user/UserApi";

// Icons 
import { CiSearch } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import { RiUserAddFill } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { LiaUserMinusSolid } from "react-icons/lia";

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


const AllUser = () => {
  const { users, loadUsers, currentPage, setCurrentPage } = UseUsers();
  const {  pagination } = UseUsers();
  
  console.log(users);
  
  const onPageChange = (page: number) => {    
    setCurrentPage(page)
    loadUsers(page)
  };

  const handleDelete = async (id: string) => {    
    try {
      await deleteUserById(id)
      loadUsers(currentPage)
    } catch (error) {
      
    }
  };
  
  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='text-[#20374b] font-normal text-5xl'>Users List</p>
        <div className='flex items-center justify-end'>

          <div className='flex items-center bg-[#20374b] py-2 px-6 rounded-full w-96'>
            <CiSearch  className='mr-5 ' color='white' size={25}/>
            <input className='bg-transparent border-0 focus:outline-none text-white'
              type="text"  
              placeholder='Search here ....'
            />
            
          </div>
          
          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <GrSearch color='#fdc127' size={25}/>
          </button>

          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <Link to='/admin/user/add'>
              <RiUserAddFill color='#fdc127' size={25}/>
            </Link>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-12">
        <Table hoverable>
          <Table.Head >
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>User name</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Email</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Status</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Role</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">          
            { users.map((user : User) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.completeName}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-2">
                    {user.isActive ? <Badge color="success">Active</Badge> : <Badge color="failure">Inactive</Badge>}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-2">
                    {user.role ? user.role.role : <Badge color="failure">Role not assigned</Badge>}
                  </div>  
                </Table.Cell>
                <Table.Cell className='flex '>
                  <Link to={`/admin/user/edit/${user._id}`} className="font-medium mr-3 text-cyan-600 hover:underline dark:text-cyan-500">
                    <LiaUserEditSolid  size={20}  color='#20374b' />
                  </Link>
                  <button onClick={() => handleDelete(user._id)}>
                    <LiaUserMinusSolid  size={20}  color='#20374b' />
                  </button>
                </Table.Cell>
              </Table.Row>

            ))}

          </Table.Body>
        </Table>
      </div>

      <div className="flex overflow-x-auto justify-end mt-5 ">
      {pagination && (
        <Pagination 
          layout="pagination"
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons
        />
      )}
      </div>


    </div>
  )
}

export default AllUser