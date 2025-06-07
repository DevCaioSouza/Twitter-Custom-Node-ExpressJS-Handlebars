import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

// LOCAL CONNECTION

// const sequelize = new Sequelize('insighter', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432,
// });

// REMOTE CONNECTION

const sequelize = new Sequelize(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`)

try {
  sequelize.authenticate();
  console.log('Conectados com sucesso');
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`);
}

export default sequelize;
