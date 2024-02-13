import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardsProps {
  children: ReactNode;
}

const AuthGuards = ({ children }: AuthGuardsProps) => {
    let logged = true 
    if(!logged) {
        return <Navigate to='/auth/login'/>
    }
  return <>{children}</>;
}

export default AuthGuards;