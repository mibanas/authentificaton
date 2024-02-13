import express from 'express';

import { createRole, getAllRoles, getRoleById, deleteRole, updateRole } from "../controllers/users/roleController";

const router = express.Router();

router.post('/', createRole);
router.get('/', getAllRoles);
router.get('/:id', getRoleById);
router.delete('/:id', deleteRole);
router.put('/:id', updateRole);

export default router;
