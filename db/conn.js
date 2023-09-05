const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('insighter2', 'root', '', {
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

module.exports = sequelize;
