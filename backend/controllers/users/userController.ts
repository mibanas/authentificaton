import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel from '../../models/userModel'
import roleModel from '../../models/roleModel'


export const createUser = async (req: Request, res: Response) => {
    const { completeName, email, password } = req.body;

    try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ 
        success: false, 
        message: 'Email already exist.' 
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        completeName,
        email,
        password: hashedPassword,
    });

    return res.status(201).json({ 
        success: true, 
        data: newUser 
    })
    } catch (error : any) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la création de l\'utilisateur.',
            message : error.message
        })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find().populate({ path: 'role', populate: { path: 'permission' } });
        return res.status(200).json({ 
            success: true, 
            data: users 
        })
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la récupération des utilisateurs.' 
        })
    }
}


export const getAllUsersPagination = async (req: Request, res: Response) => {
    const page = req.body.page ? parseInt(req.body.page as string) : 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const totalUsers = await userModel.countDocuments();
        const users = await userModel.find()
            .populate({ path: 'role', populate: { path: 'permission' } })
            .skip(startIndex)
            .limit(limit);

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers
        };

        return res.status(200).json({
            success: true,
            data: users,
            pagination
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des utilisateurs.'
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found!' 
            })
        }               

        await userModel.findByIdAndDelete(userId);

        return res.status(200).json({ 
            success: true, 
            message: 'User deleted succesfuly' 
        })
            
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    try {
        const user = await userModel.findById(userId).populate('role').populate({
            path: 'role',
            populate: { path: 'permission' }
        });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found!' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: user 
        });
            
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la récupération de l\'utilisateur.' 
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {    
    const userId: string = req.params.id;
    const { completeName, password, email, token, roleName } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found!' 
            });
        }

        const updatedData: any = {}

        if (completeName !== undefined) updatedData.completeName = completeName;
        if (password !== undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }
        if (email !== undefined) updatedData.email = email;
        if (token !== undefined) updatedData.token = token;

        if (roleName) {            
            const role = await roleModel.findOne({ role: roleName });
            if (role) {
                updatedData.role = role._id;
                updatedData.isActive = true
            } else {
                return res.status(404).json({ 
                    success: false, 
                    message: `Role ${roleName} not found` 
                });
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found!' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: updatedUser,
            message: 'User updated successfully' 
        });
            
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la mise à jour de l\'utilisateur.' 
        });
    }
};

