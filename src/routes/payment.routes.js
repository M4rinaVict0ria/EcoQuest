import { Router } from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = Router();

// Iniciar pagamento
router.post('/initiate', PaymentController.initiate);

// Webhook do provedor de pagamento
router.post('/webhook', PaymentController.webhook);

// Histórico de pagamentos do usuário
router.get('/users/:user_id/payments', PaymentController.getUserPayments);

// Detalhes de um pagamento específico
router.get('/:id', PaymentController.getPaymentById);

// Atualizar pagamento (admin ou interno)
router.put('/:id', PaymentController.updatePayment);

// Deletar pagamento (opcional)
router.delete('/:id', PaymentController.deletePayment);

export default router;
