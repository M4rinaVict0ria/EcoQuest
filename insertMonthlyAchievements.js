import knex from './db/connection.js'; // ajuste o caminho se precisar

async function insertMonthlyAchievements() {
  const monthlyAchievements = [
    { title: 'Ano Novo', description: 'Conquista de Janeiro', type: 'monthly', is_monthly: true },
    { title: 'Planeta Novo', description: 'Conquista de Fevereiro', type: 'monthly', is_monthly: true },
    { title: 'Março Sustentável', description: 'Conquista de Março', type: 'monthly', is_monthly: true },
    { title: 'Abril Ecológico', description: 'Conquista de Abril', type: 'monthly', is_monthly: true },
    { title: 'Maio Verde', description: 'Conquista de Maio', type: 'monthly', is_monthly: true },
    { title: 'Junho Sustentável', description: 'Conquista de Junho', type: 'monthly', is_monthly: true },
    { title: 'Julho Amigo da Natureza', description: 'Conquista de Julho', type: 'monthly', is_monthly: true },
    { title: 'Agosto Limpo', description: 'Conquista de Agosto', type: 'monthly', is_monthly: true },
    { title: 'Setembro Consciente', description: 'Conquista de Setembro', type: 'monthly', is_monthly: true },
    { title: 'Outubro Sustentável', description: 'Conquista de Outubro', type: 'monthly', is_monthly: true },
    { title: 'Novembro Ecológico', description: 'Conquista de Novembro', type: 'monthly', is_monthly: true },
    { title: 'Dezembro Sustentável', description: 'Conquista de Dezembro', type: 'monthly', is_monthly: true },
  ];

  for (const ach of monthlyAchievements) {
    const exists = await knex('achievements').where({ title: ach.title }).first();
    if (!exists) {
      await knex('achievements').insert({
        title: ach.title,
        description: ach.description,
        type: ach.type,
        is_monthly: ach.is_monthly,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(`Inserida conquista: ${ach.title}`);
    } else {
      console.log(`Conquista já existe: ${ach.title}`);
    }
  }

  console.log('Inserção de conquistas mensais finalizada.');
  process.exit(0);
}

insertMonthlyAchievements().catch((err) => {
  console.error('Erro ao inserir conquistas mensais:', err);
  process.exit(1);
});
