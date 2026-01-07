// project-handi/backend/src/routes/offerRoutes.ts

import { Router } from 'express';

import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';
import { getOffers, getOfferById, createOffer } from '../controllers/offerController';

const router = Router();

/**
 * @route   GET /api/v1/offers
 * @desc    Récupère la liste de toutes les offres d'emploi
 * @access  Public (Tous les utilisateurs)
 * @return  {Array} Liste des offres avec les détails de l'entreprise et du recruteur
 */
router.get('/', getOffers);

/**
 * @route   GET /api/v1/offers/:id
 * @desc    Récupère une offre spécifique par son ID
 * @access  Public (Tous les utilisateurs)
 * @return  {Object} Détails complets de l'offre avec entreprise et recruteur
 */
router.get('/:id', getOfferById);

/**
 * @route   POST /api/v1/offers
 * @desc    Crée une nouvelle offre d'emploi
 * @access  Privé (Token requis + Rôle RECRUITER)
 * @body    { title, description, location, contract, experience, remote, disabilityCompatible, companyId }
 * @header  Authorization: Bearer <token_jwt>
 */
router.post('/', authenticateToken, authorizeRole(['RECRUITER', 'ADMIN']), createOffer);

export default router;