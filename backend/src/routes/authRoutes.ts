// project-handi/backend/src/routes/authRoutes.ts

import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Enregistre un nouvel utilisateur (Candidat ou Recruteur)
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authentifie l'utilisateur et renvoie un token JWT
 * @access  Public
 */
router.post('/login', authController.login);

export default router;