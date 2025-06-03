import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('insighter', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

try {
  sequelize.authenticate();
  console.log('Conectados com sucesso');
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`);
}

export default sequelize;
