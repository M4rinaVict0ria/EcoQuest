import db from '../../db/connection.js';
import { z } from 'zod';

const PaymentSchema = z.object({
  data: z.string().datetime({ message: 'Data inválida' }),
  recibo: z.number({ message: 'Recibo inválido' }).min(0, { message: 'Recibo inválido' }),
  valor: z.number({ message: 'Valor inválido' }).min(0, { message: 'Valor inválido' }),
  observacao: z.string().optional(),
  user_id: z.number({ message: 'Usuário inválido' }),
});

const PaymentController = {
  async initiate(req, res) {
    try {
      const paymentData = PaymentSchema.parse(req.body);
      const [newPayment] = await db('payments').insert(paymentData).returning('*');
      return res.status(201).json({ message: 'Pagamento iniciado', payment: newPayment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  async webhook(req, res) {
    // Isso depende do provedor de pagamento — simulação:
    const { recibo, status } = req.body;
    try {
      await db('payments').where({ recibo }).update({ status });
      return res.status(200).json({ message: 'Webhook recebido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar webhook' });
    }
  },

  async getUserPayments(req, res) {
    const userId = Number(req.params.user_id);
    try {
      const payments = await db('payments').where({ user_id: userId });
      return res.status(200).json(payments);
    } catch (error) {
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
      return res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
  },

    async updatePayment(req, res) {
    const { id } = req.params;
    try {
      const data = PaymentSchema.partial().parse(req.body); // permite campos parciais
      const updated = await db('payments').where({ id }).update(data).returning('*');
      if (!updated.length) {
        return res.status(404).json({ message: 'Pagamento não encontrado' });
      }
      return res.status(200).json({ message: 'Pagamento atualizado', payment: updated[0] });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Erro de validação', details: error.errors });
      }
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  async deletePayment(req, res) {
    const { id } = req.params;
    try {
      await db('payments').where({ id }).del();
      return res.status(200).json({ message: 'Pagamento deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
  },
};

export default PaymentController;
