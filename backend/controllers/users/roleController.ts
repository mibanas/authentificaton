import { Request, Response } from 'express'
import roleModel from '../../models/roleModel'
import permissionModel from '../../models/permessionModel'

export const createRole = async (req: Request, res: Response) => {
    try {
    const { role } = req.body
    const { create, read, update, deletee } = req.body

    
    const existingRole : any = await roleModel.findOne({ role })
    if (existingRole) {
        return res.status(400).json({ 
            success: false, 
            message: 'Role already exist.' 
        })
    }

    const newRole = await roleModel.create({
        role,
    })

    const addPermissions : any = await permissionModel.create({
        module : 'users',
        create, 
        read, 
        update, 
        deletee,
    })

    if (addPermissions) {
        try {
            await roleModel.findByIdAndUpdate(newRole._id, {
                permission : addPermissions._id
            })
            res.status(201).json({
                success: true,
                data: newRole,
                message: 'Le rôle et les permissions ont été créé avec succès.',
            })
            
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de la mise à jour de l\'utilisateur.' 
            });
        }
    }

    return res.status(203).json({ 
        success: false, 
        message: 'Role added successfuly.' 
    })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la création du rôle. Veuillez réessayer.',
        })
    }
}
    
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

    console.log(role, create, read, update, deletee);
    
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
        if (deletee !== undefined) newPermissions.delete = deletee;

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

