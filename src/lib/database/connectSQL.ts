import { Sequelize } from 'sequelize';
import config from '../../config';

const { database, user, password, server, port } = config.sql;

const sequelize = new Sequelize(database, user, password, {
  host: server,
  port,
  dialect: 'mssql',
  logging: false,
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    },
  },
  pool: {
    idle: 300000,
    acquire: 300000,
  },
});

sequelize
  .authenticate()
  // .sync({ force: true })
  .then(() => { 
    console.log(`Conecting to MSSQL SEQUALIZE ${database}:${server}`);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
