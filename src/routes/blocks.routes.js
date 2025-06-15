// src/routes/blocks.routes.js

import express from 'express';
import BlocksController from '../controllers/blocks.controller.js';

const router = express.Router();

router.post('/', BlocksController.blockUser);
router.delete('/:id', BlocksController.unblockUser);

export default router;
