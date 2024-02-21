import express from 'express';
import { createUser, getAllUsers, deleteUser, getUserById, updateUser, getAllUsersPagination } from "../controllers/users/userController";
import checkPermissions from "../middlewares/users/userMiddleware";

const router = express.Router();

router.post('/pagination', checkPermissions, getAllUsersPagination)
router.get('/', checkPermissions, getAllUsers)
router.delete('/:id', checkPermissions, deleteUser)
router.put('/:id', checkPermissions,  updateUser)
router.get('/:id', checkPermissions,  checkPermissions, getUserById)
router.post('/', createUser)

export default router