import express from 'express';
import { createUser, getAllUsers, deleteUser, getUserById, updateUser, getAllUsersPagination } from "../controllers/users/userController";
const router = express.Router();

router.post('/pagination', getAllUsersPagination)
router.get('/', getAllUsers)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)



router.get('/:id', getUserById)
router.post('/', createUser)

export default router