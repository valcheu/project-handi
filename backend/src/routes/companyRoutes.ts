import { Router } from 'express';
import * as companyController from '../controllers/companyController';

const router = Router();

// Route publique pour lister les entreprises
router.get('/', companyController.getCompanies);

// Route pour créer une entreprise
router.post('/', companyController.createCompany);

export default router;