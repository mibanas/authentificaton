import axios from "axios";

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

export const getAllUsers = async (page: number) => {
  try {
    const allUsers = await axios.post("http://localhost:3030/users/pagination", { page });
    
    return allUsers.data;
  } catch (error : any) {
    console.error("Erreur lors de la récupération des utilisateurs :", error.message);
    throw error;
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3030/users/${userId}`);
    return response.data ;
  } catch (error : any) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
    throw error;
  }
};

// Mettre à jour un utilisateur par son ID
export const updateUserById = async (userId: string, userData: any) => {
  try {
    const response = await axios.put(`http://localhost:3030/users/${userId}`, userData);
    return response.data;
  } catch (error : any) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.message);
    throw error;
  }
};

// Supprimer un utilisateur par son ID
export const deleteUserById = async (userId: string) => {
  try {
    const response = await axios.delete(`http://localhost:3030/users/${userId}`);
    return response.data;
  } catch (error : any) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
    throw error;
  }
};
