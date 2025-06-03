import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('insighter2', 'root', 'Password10', {
  host: 'localhost',
  dialect: 'mysql',
  port: 6400,
});

try {
  sequelize.authenticate();
  console.log('Conectados com sucesso');
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`);
}

export default sequelize;
