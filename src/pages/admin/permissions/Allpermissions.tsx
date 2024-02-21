import UsePermissions from '../../../hooks/permissions/UsePermissions';
import { Table } from 'flowbite-react';
import { Pagination } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';


import { GrSearch } from "react-icons/gr";
import { LiaUserEditSolid } from "react-icons/lia";
import { LiaUserMinusSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

// api 
import { deleteRoleById } from "../../../services/api/permissions/PermissionsApi";

interface User {
  _id: string;
  role: string;
}

const Allpermissions = () => {
  const { roles, loadRoles, currentPage, setCurrentPage, pagination } = UsePermissions();

  const onPageChange = (page: number) => {    
    setCurrentPage(page)
    loadRoles(page)
  };

  const handleDelete = (id: string) => {    
    deleteRoleById(id)
    loadRoles(currentPage)
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='text-[#20374b] font-normal text-5xl'>Role List</p>
        <div className='flex items-center justify-end'>
          <div className='flex items-center bg-[#20374b] py-2 px-6 rounded-full w-96'>
            <CiSearch className='mr-5 ' color='white' size={25}/>
            <input className='bg-transparent border-0 focus:outline-none text-white'
              type="text"  
              placeholder='Search here ....'
            />
          </div>
          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <GrSearch color='#fdc127' size={25}/>
          </button>
          <button className='ml-5 bg-[#20374b] py-4 px-6 rounded-full'>
            <Link to='/admin/permission/add'>
              <FaPlus color='#fdc127' size={25}/>
            </Link>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-12">
        <Table hoverable>
          <Table.Head >
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Role Name</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">          
            { roles.map((role : User) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={role._id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {role.role}
                </Table.Cell>
                <Table.Cell className='flex '>
                  <Link to={`/admin/permission/edit/${role._id}`} className="font-medium mr-3 text-cyan-600 hover:underline dark:text-cyan-500">
                    <LiaUserEditSolid  size={20}  color='#20374b' />
                  </Link>
                  <button onClick={() => handleDelete(role._id)}>
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

export default Allpermissions;
