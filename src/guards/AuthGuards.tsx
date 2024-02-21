import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from "../redux/app/AppStore";
import { isTokenValid } from '../utils/authUtils';

interface AuthGuardsProps {
  children: ReactNode;
}

const AuthGuards = ({ children }: AuthGuardsProps) => {
    const isLogged = useSelector((state: RootState) => state.auth.isLogged);
    const adminRole = useSelector((state: RootState) => state.auth.isAdmin);
    useEffect(() => {
      const isValid = isTokenValid();
      if (!isValid) {
        // Rediriger vers la page de connexion si le token est invalide ou absent
        window.location.href = '/auth/login';
      }
    }, []);
   
    if(!adminRole?.includes('ADMIN')) {
      return <Navigate to='/'/>
  }
    if(!isLogged) {
        return <Navigate to='/auth/login'/>
    }
  return <>{children}</>;
}

export default AuthGuards;