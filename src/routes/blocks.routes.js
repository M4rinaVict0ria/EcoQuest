// src/routes/blocks.routes.js

import express from 'express';
import BlocksController from '../controllers/blocks.controller.js';

const router = express.Router();

router.post('/blocks', BlocksController.blockUser);
router.delete('/blocks/:id', BlocksController.unblockUser);

export default router;
