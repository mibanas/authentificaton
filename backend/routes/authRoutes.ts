import express from 'express';
import { login } from "../controllers/users/authController";


const router = express.Router();

router.post('/login', login);

export default router;
