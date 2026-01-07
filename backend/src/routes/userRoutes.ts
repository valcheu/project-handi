// project-handi/backend/src/routes/user.routes.ts

import { Router } from 'express';
import { getUsersHandler, createUserController } from '../controllers/userController';

const router = Router();

// Route GET /users
router.get('/', getUsersHandler);

// Route POST /users
router.post('/', createUserController);

export default router;