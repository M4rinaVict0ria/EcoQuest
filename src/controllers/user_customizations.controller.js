import { z } from "zod";

const UserCustomizationSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  customizationId: z.number().int(),
  type: z.enum(['banner', 'moldura', 'foto']),
  active: z.boolean(),
});

const userCustomizations = [
  { id: 1, userId: 123, customizationId: 5, type: 'banner', active: false },
  { id: 2, userId: 123, customizationId: 6, type: 'moldura', active: true },
  { id: 3, userId: 456, customizationId: 7, type: 'foto', active: false },
];

let nextId = 4;

const UserCustomizationsController = {
  // Pega todas customizações do usuário
  getUserCustomizations(req, res) {
    const userId = Number(req.params.user_id);
    const userItems = userCustomizations.filter(uc => uc.userId === userId);
    res.json(userItems);
  },

  // Seleciona uma customização ativa
  selectCustomization(req, res) {
    const userCustomizationId = Number(req.params.id);
    const customization = userCustomizations.find(uc => uc.id === userCustomizationId);

    if (!customization) {
      return res.status(404).json({ message: "Customização do usuário não encontrada" });
    }

    // Validação do objeto com Zod
    try {
      UserCustomizationSchema.parse(customization);
    } catch (e) {
      return res.status(400).json({ message: "Dados da customização inválidos", details: e.errors });
    }

    // Desativa customizações do mesmo tipo para esse usuário
    userCustomizations.forEach(uc => {
      if (uc.userId === customization.userId && uc.type === customization.type) {
        uc.active = false;
      }
    });

    // Ativa a customização selecionada
    customization.active = true;

    res.json({ message: "Customização ativada", customization });
  },

  // Criar nova customização para usuário
  create(req, res) {
    try {
      const data = req.body;

      // Criar objeto para validação
      const newCustomization = {
        id: nextId++,
        userId: Number(data.userId),
        customizationId: Number(data.customizationId),
        type: data.type,
        active: data.active || false,
      };

      UserCustomizationSchema.parse(newCustomization);

      userCustomizations.push(newCustomization);

      res.status(201).json({ message: "Customização criada", customization: newCustomization });
    } catch (error) {
      res.status(400).json({ error: error.errors || error.message });
    }
  },

  // Deletar customização do usuário
  delete(req, res) {
    const id = Number(req.params.id);
    const index = userCustomizations.findIndex(uc => uc.id === id);
    if (index !== -1) {
      userCustomizations.splice(index, 1);
      return res.json({ message: "Customização removida" });
    }
    res.status(404).json({ message: "Customização não encontrada" });
  }
};

export default UserCustomizationsController;
