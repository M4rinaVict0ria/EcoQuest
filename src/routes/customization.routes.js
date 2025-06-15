import express from 'express';
import CustomizationController from '../controllers/customization.controller.js';

const router = express.Router();

router.get('/', CustomizationController.getAll);
router.get('/:id', CustomizationController.getById);
router.post('/', CustomizationController.create);
router.put('/:id', CustomizationController.update);
router.delete('/:id', CustomizationController.delete);

export default router;
