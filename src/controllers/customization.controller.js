import { z } from "zod";

const CustomizationSchema = z.object({
  id: z.number().int(),
  type: z.enum(['banner', 'moldura', 'foto']),
  name: z.string(),
  imageUrl: z.string().url(),
});

let customizations = [
  { id: 1, type: 'banner', name: 'Banner Verde', imageUrl: 'https://example.com/banner-verde.png' },
  { id: 2, type: 'moldura', name: 'Moldura Ouro', imageUrl: 'https://example.com/moldura-ouro.png' },
  { id: 3, type: 'foto', name: 'Foto de Perfil 1', imageUrl: 'https://example.com/foto1.png' },
];

let nextId = 4;

const CustomizationController = {
  getAll(req, res) {
    res.json(customizations);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    const item = customizations.find(c => c.id === id);
    if (!item) return res.status(404).json({ message: 'Customização não encontrada' });
    res.json(item);
  },

  create(req, res) {
    try {
      const data = req.body;
      const newCustomization = {
        id: nextId++,
        type: data.type,
        name: data.name,
        imageUrl: data.imageUrl,
      };

      CustomizationSchema.parse(newCustomization);
      customizations.push(newCustomization);

      res.status(201).json(newCustomization);
    } catch (error) {
      res.status(400).json({ message: 'Erro na validação', errors: error.errors || error.message });
    }
  },

  update(req, res) {
    const id = Number(req.params.id);
    const index = customizations.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ message: 'Customização não encontrada' });

    try {
      const data = req.body;
      const updated = { ...customizations[index], ...data };
      CustomizationSchema.parse(updated);
      customizations[index] = updated;
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: 'Erro na validação', errors: error.errors || error.message });
    }
  },

  delete(req, res) {
    const id = Number(req.params.id);
    const index = customizations.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ message: 'Customização não encontrada' });
    customizations.splice(index, 1);
    res.json({ message: 'Customização removida' });
  },
};

export default CustomizationController;
