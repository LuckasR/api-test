import express from 'express';
import * as companyController from '../controllers/companyController.js';

const router = express.Router();

router.post('/', companyController.create);
router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.remove);

export default router;