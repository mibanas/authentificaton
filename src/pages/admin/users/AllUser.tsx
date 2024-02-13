import { Table } from 'flowbite-react';
import { Pagination } from 'flowbite-react';
import { useState } from 'react';

// Icons 
import { CiSearch } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import { RiUserAddFill } from "react-icons/ri";
import { Link } from 'react-router-dom';


const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);

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
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Product name</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Color</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Category</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>Price</Table.HeadCell>
            <Table.HeadCell className='bg-[#20374b] text-[#fdc127]'>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a href="/edit/apple-macbook-pro" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>
      </div>

      <div className="flex overflow-x-auto justify-end mt-5 ">
        <Pagination 
          layout="pagination"
          currentPage={currentPage}
          totalPages={1000}
          onPageChange={onPageChange}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons
        />
      </div>


    </div>
  )
}

export default AllUser