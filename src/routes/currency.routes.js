// src/routes/currency.routes.js

import express from 'express';
import CurrencyController from '../controllers/currency.controller.js';

const router = express.Router();

router.get('/users/:user_id/currency', CurrencyController.getCurrency);
router.post('/users/:user_id/currency/add', CurrencyController.addCurrency);
router.post('/users/:user_id/currency/spend', CurrencyController.spendCurrency);

export default router;
