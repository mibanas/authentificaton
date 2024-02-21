import axios from "axios";

// Rôles

export const getAllRoles = async (page: number) => {
    try {
      const allRoles = await axios.post("http://localhost:3030/roles/pagination", { page });
      return allRoles.data;
    } catch (error : any) {
      console.error("Erreur lors de la récupération des rôles :", error.message);
      throw error;
    }
  };

// Récupérer un rôle par son ID
export const getRoleById = async (roleId: string) => {
  try {
    const response = await axios.get(`http://localhost:3030/roles/${roleId}`);
    return response.data;
  } catch (error : any) {
    console.error('Erreur lors de la récupération du rôle :', error.message);
    throw error;
  }
};

// Mettre à jour un rôle par son ID
export const updateRoleById = async (roleId: string, roleData: any) => {
  try {
    const response = await axios.put(`http://localhost:3030/roles/${roleId}`, roleData);
    return response.data;
  } catch (error : any) {
    console.error('Erreur lors de la mise à jour du rôle :', error.message);
    throw error;
  }
};

// Supprimer un rôle par son ID
export const deleteRoleById = async (roleId: string) => {
  try {
    const response = await axios.delete(`http://localhost:3030/roles/${roleId}`);
    return response.data;
  } catch (error : any) {
    console.error('Erreur lors de la suppression du rôle :', error.message);
    throw error;
  }
};

export const addRole = async (roleData: any) => {
    try {
        const response = await axios.post(`http://localhost:3030/roles`, roleData);
        return response.data;
    } catch (error : any) {
        console.error('Erreur lors de l\'ajout du rôle :', error.message);
        throw error;
    }
};