import { Request, Response } from 'express'
import roleModel from '../../models/roleModel'
import permissionModel from '../../models/permessionModel'

export const createRole = async (req: Request, res: Response) => {
    try {
        const { role, create, read, update, deletee } = req.body;

        const existingRole = await roleModel.findOne({ role });
        if (existingRole) {
            return res.status(400).json({ 
                success: false, 
                message: 'Role already exists.' 
            });
        }

        const newRole = await roleModel.create({ role });

        const addPermissions = await permissionModel.create({
            module: 'users',
            create,
            read,
            update,
            deletee,
        });

        await roleModel.findByIdAndUpdate(newRole._id, {
            permission: addPermissions._id,
        });

        return res.status(201).json({
            success: true,
            data: newRole,
            permissions : addPermissions,
            message: 'Role and permissions created successfully.',
        });

    } catch (error) {
        console.error('Error creating role:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Error creating role. Please try again.' 
        });
    }
};
    
export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await roleModel.find().populate('permission');
        return res.status(200).json({ 
            success: true, 
            data: roles 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la récupération des rôles.' 
        });
    }
}

export const getAllRolesPagination = async (req: Request, res: Response) => {
    const page = req.body.page ? parseInt(req.body.page as string) : 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const totalRoles = await roleModel.countDocuments();
        const roles = await roleModel.find().skip(startIndex).limit(limit).populate('permission');

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalRoles / limit),
            totalRoles
        };

        return res.status(200).json({
            success: true,
            data: roles,
            pagination
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des rôles.'
        });
    }
};


export const getRoleById = async (req: Request, res: Response) => {
    try {
        const roleId = req.params.id;
        const role = await roleModel.findById(roleId).populate('permission');
        if (!role) {
            return res.status(404).json({ 
                success: false, 
                error: 'Role not found.' 
            });
        }
        return res.status(200).json({ 
            success: true, 
            data: role 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la récupération du rôle.' 
        });
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const roleId = req.params.id;
        const role = await roleModel.findById(roleId);
        if (!role) {
            return res.status(404).json({ 
                success: false, 
                error: 'Rôle non trouvé.' 
            });
        }
        await permissionModel.deleteMany({ _id: { $in: role.permission } });

        await roleModel.findByIdAndDelete(roleId);

        return res.status(200).json({ 
            success: true, 
            message: 'Rôle et permissions supprimés avec succès.' 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de la suppression du rôle.' 
        });
    }
}


export const updateRole = async (req: Request, res: Response) => {
    const roleId = req.params.id;
    const { role, create, read, update, deletee } = req.body;

    
    try {
        const existingRole = await roleModel.findById(roleId);
        if (!existingRole) {
            return res.status(404).json({ 
                success: false, 
                message: 'Role not found' 
            });
        }

        const newPermissions : any = {};

        if (create !== undefined) newPermissions.create = create;
        if (read !== undefined) newPermissions.read = read;
        if (update !== undefined) newPermissions.update = update;
        if (deletee !== undefined) newPermissions.deletee = deletee;

        
        const updatedRole = await roleModel.findByIdAndUpdate(roleId, { 
            role : role
        }, 
        { new: true })

        if (!updatedRole) {
            return res.status(404).json({ 
                success: false, 
                message: 'Role not found' 
            });
        }

        const updatedPermission = await permissionModel.findByIdAndUpdate(updatedRole.permission, newPermissions, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Role updated successfully',
            Role: updatedRole,
            Permissions: updatedPermission
        })
    } catch (error) {
        console.error('Error updating role:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to update role' 
        })
    }
};

