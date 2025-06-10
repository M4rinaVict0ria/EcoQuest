import db from '../../db/connection.js';

const userInsignias = []; // lista de insígnias desbloqueadas
let nextId = 1;

const UserInsigniasController = {
  // GET /users/:user_id/insignias
  getUserInsignias(req, res) {
    const userId = Number(req.params.user_id);
    const list = userInsignias.filter(ui => ui.user_id === userId);
    res.json(list);
  },

  // POST /user-insignias/unlock
  unlock(req, res) {
    try {
      const { user_id, insignia_id } = req.body;

      const alreadyUnlocked = userInsignias.find(
        ui => ui.user_id === user_id && ui.insignia_id === insignia_id
      );
      if (alreadyUnlocked) {
        return res.status(400).json({ message: "Insígnia já desbloqueada" });
      }

      const newUnlock = {
        id: nextId++,
        user_id,
        insignia_id,
        equipped: false,
        unlocked_at: new Date().toISOString()
      };

      userInsignias.push(newUnlock);
      res.status(201).json({ message: "Insígnia desbloqueada", data: newUnlock });
    } catch (err) {
      res.status(400).json({ error: err.message || err });
    }
  },

  // POST /user-insignias/:insignia_id/equip
  equip(req, res) {
    const userId = Number(req.body.user_id);
    const insigniaId = Number(req.params.insignia_id);

    const target = userInsignias.find(
      ui => ui.user_id === userId && ui.insignia_id === insigniaId
    );
    if (!target) {
      return res.status(404).json({ message: "Insígnia não desbloqueada para este usuário" });
    }

    // Desequipa qualquer outra
    userInsignias.forEach(ui => {
      if (ui.user_id === userId) ui.equipped = false;
    });

    target.equipped = true;

    res.json({ message: "Insígnia equipada com sucesso", insignia: target });
  },

  // POST /user-insignias/:insignia_id/unequip
  unequip(req, res) {
    const userId = Number(req.body.user_id);
    const insigniaId = Number(req.params.insignia_id);

    const target = userInsignias.find(
      ui => ui.user_id === userId && ui.insignia_id === insigniaId
    );

    if (!target) {
      return res.status(404).json({ message: "Insígnia não desbloqueada para este usuário" });
    }

    target.equipped = false;
    res.json({ message: "Insígnia desequipada", insignia: target });
  }
};

export default UserInsigniasController;
