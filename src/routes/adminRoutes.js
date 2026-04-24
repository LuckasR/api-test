import express from 'express';
import { showCreateForm, createCompany , listCompanies ,  showCompany , showCreateUserForm ,createUser , createCompanyAbonnement , showAddAbonnement } from '../controllers/adminController.js';
import {
  listAbonnements,
  showCreateAbonnement,
  createAbonnement,
  showEditAbonnement,
  updateAbonnement,
  deleteAbonnement
} from '../controllers/abonnementController.js';


const router = express.Router();

// afficher formulaire
router.get('/companies/create', showCreateForm);

// traiter formulaire
router.post('/companies', createCompany);

// liste
router.get('/companies', listCompanies);

// detail
router.get('/companies/:id', showCompany);

router.get('/companies/:id/users/create', showCreateUserForm);
router.post('/companies/:id/users', createUser);


router.get('/abonnements', listAbonnements);
router.get('/abonnements/create', showCreateAbonnement);
router.post('/abonnements', createAbonnement);

router.get('/abonnements/:id/edit', showEditAbonnement);
router.post('/abonnements/:id/update', updateAbonnement);

router.post('/abonnements/:id/delete', deleteAbonnement);

router.get('/companies/:id/abonnements/create', showAddAbonnement);
router.post('/companies/:id/abonnements', createCompanyAbonnement );


export default router;