import { useEffect, useState } from 'react';
import { getAllRoles } from "../../services/api/permissions/PermissionsApi";

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalRoles: number;
}

const UseRoles = () => {
    const [roles, setRoles] = useState([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadRoles(currentPage);
    }, [currentPage]);
  
    const loadRoles = async (page: number) => {
      try {
        const rolesData = await getAllRoles(page)
        
        setRoles(rolesData.data);
        setPagination(rolesData.pagination)
      } catch (error : any) {
        console.error('Erreur lors du chargement des rôles :', error.message)
      }
    };
  
    return { roles, loadRoles, currentPage, setCurrentPage, pagination }
}

export default UseRoles;
