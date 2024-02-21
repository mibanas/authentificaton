import { useEffect, useState } from 'react'
import { getAllUsers, getUserById } from "../../services/api/user/UserApi"

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
  }

const UseUsers = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);
  
    const loadUsers = async (page: number) => {
      try {
        const usersData = await getAllUsers(page)
        
        setUsers(usersData.data);
        setPagination(usersData.pagination)
      } catch (error : any) {
        console.error('Erreur lors du chargement des utilisateurs :', error.message)
      }
    };

  
    return { users, loadUsers, currentPage, setCurrentPage , pagination }
}

export default UseUsers
