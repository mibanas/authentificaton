import express from 'express';
import { login } from "../controllers/users/authController";


const router = express.Router();

router.post('/login', login);
router.post('/register', );

export default router;
