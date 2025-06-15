import db from '../../db/connection.js';
import { z } from 'zod';

// Schema para pagamento
const PaymentSchema = z.object({
  date: z.string().datetime({ message: 'Data inválida' }),
  receipt: z.string().min(1, { message: 'Recibo inválido' }),
  status: z.string().min(1, { message: 'Status inválido' }).optional(),
  amount: z.number({ message: 'Valor inválido' }).min(0, { message: 'Valor inválido' }),
  note: z.string().optional(),
  user_id: z.number({ message: 'Usuário inválido' }),
  status: z.string().optional(),
});

// Schema para webhook (status update)
const WebhookSchema = z.object({
  receipt: z.string().min(1, { message: 'Recibo inválido' }),
  status: z.string().min(1, { message: 'Status inválido' }),
});

const PaymentController = {
  async initiate(req, res) {
    try {
      const paymentData = PaymentSchema.parse(req.body);
      const [id] = await db('payments').insert(paymentData);
      const newPayment = await db('payments').where({ id }).first();
      return res.status(201).json({ message: 'Pagamento iniciado', payment: newPayment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      console.error('Erro ao iniciar pagamento:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  async webhook(req, res) {
    try {
      const { receipt, status } = WebhookSchema.parse(req.body);

      if (!status) {
        return res.status(400).json({ message: 'Status inválido ou não informado' });
      }

      const updatedRows = await db('payments').where({ receipt }).update({ status });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Pagamento não encontrado para atualizar status' });
      }

      return res.status(200).json({ message: 'Webhook recebido com sucesso' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      console.error('Erro no webhook:', error);
      return res.status(500).json({ error: 'Erro ao processar webhook' });
    }
  },

  async getUserPayments(req, res) {
    const userId = Number(req.params.user_id);
    try {
      const payments = await db('payments').where({ user_id: userId });
      return res.status(200).json(payments);
    } catch (error) {
      console.error('Erro ao buscar pagamentos do usuário:', error);
      return res.status(500).json({ error: 'Erro ao buscar pagamentos do usuário' });
    }
  },

  async getPaymentById(req, res) {
    const { id } = req.params;
    try {
      const payment = await db('payments').where({ id }).first();
      if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado' });
      return res.status(200).json(payment);
    } catch (error) {
      console.error('Erro ao buscar pagamento:', error);
      return res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
  },

  async updatePayment(req, res) {
    const { id } = req.params;
    try {
      const data = PaymentSchema.partial().parse(req.body);
      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido para atualizar' });
      }
      const count = await db('payments').where({ id }).update(data);
      if (!count) {
        return res.status(404).json({ message: 'Pagamento não encontrado' });
      }
      const updatedPayment = await db('payments').where({ id }).first();
      return res.status(200).json({ message: 'Pagamento atualizado', payment: updatedPayment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      console.error('Erro ao atualizar pagamento:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  async deletePayment(req, res) {
    const { id } = req.params;
    try {
      const count = await db('payments').where({ id }).del();
      if (!count) {
        return res.status(404).json({ message: 'Pagamento não encontrado' });
      }
      return res.status(200).json({ message: 'Pagamento deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar pagamento:', error);
      return res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
  },
};

export default PaymentController;
