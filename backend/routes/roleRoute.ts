import express from 'express';

import { createRole, getAllRoles, getRoleById, deleteRole, updateRole, getAllRolesPagination } from "../controllers/users/roleController";

const router = express.Router();

router.post('/pagination', getAllRolesPagination);
router.delete('/:id', deleteRole);
router.post('/', createRole);
router.put('/:id', updateRole);
router.get('/:id', getRoleById);
router.get('/', getAllRoles);

export default router;
