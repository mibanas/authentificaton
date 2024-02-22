import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../../models/userModel';

interface User {
    _id: string;
    completeName: string;
    email: string;
    password : string,
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

const checkPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const { method } = req;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Missing token' });
    }
    
    try {
        const secret: any = process.env.SECRET_KEY;
        const decodedToken = jwt.verify(token, secret) as JwtPayload;
        
        const user = await userModel.findById<User>(decodedToken.userId).populate({ path: 'role', populate: { path: 'permission' } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }    
        
        switch (method) {
            case 'POST':
                if(user.role.permission.create){
                    next();
                } else {
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à créer un utilisateur' });
                }
                break;
            case 'GET':
                if(user.role.permission.read){
                    next();
                } else {
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à lire les utilisateurs' });
                }
                break;
            case 'PUT':
                if(user.role.permission.update){
                    next();
                } else {
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à mettre à jour un utilisateur' });
                }
                break;
            case 'DELETE':
                if(user.role.permission.deletee){
                    next();
                } else {                    
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer un utilisateur' });
                }
                break;
            default:
                res.status(405).json({ message: 'Méthode non autorisée' });
                break;
        }

    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }
};

export default checkPermissions;
