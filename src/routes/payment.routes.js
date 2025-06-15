import { Router } from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = Router();

router.post('/initiate', PaymentController.initiate);
router.post('/webhook', PaymentController.webhook);
router.get('/users/:user_id/payments', PaymentController.getUserPayments);
router.get('/:id', PaymentController.getPaymentById);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export default router;
