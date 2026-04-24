import express from 'express';
import { showCreateForm, createCompany , listCompanies ,  showCompany } from '../controllers/adminController.js';

const router = express.Router();

// afficher formulaire
router.get('/companies/create', showCreateForm);

// traiter formulaire
router.post('/companies', createCompany);

// liste
router.get('/companies', listCompanies);

// detail
router.get('/companies/:id', showCompany);


export default router;