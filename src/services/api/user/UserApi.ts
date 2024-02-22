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

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    const allUsers = await axios.post("http://localhost:3030/users/pagination", { page }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return allUsers.data;
};

// Récupérer un utilisateur par son ID
export const getUserById = async (userId: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }
    const response = await axios.get(`http://localhost:3030/users/${userId}`, {   headers: {
      Authorization: `Bearer ${token}`,
    }});
    return response.data ;
};

// Mettre à jour un utilisateur par son ID
export const updateUserById = async (userId: string, userData: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }
    const response = await axios.put(`http://localhost:3030/users/${userId}`, userData, { headers: {
      Authorization: `Bearer ${token}`,
    },});
    return response.data;
};

// Supprimer un utilisateur par son ID
export const deleteUserById = async (userId: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }
    const response = await axios.delete(`http://localhost:3030/users/${userId}`, {   headers: {
      Authorization: `Bearer ${token}`,
    }});
    return response.data;

};
