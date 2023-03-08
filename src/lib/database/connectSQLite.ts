import { Sequelize } from 'sequelize';
import config from '../../config';

const { storage  } = config.sqlite;

const sqlite = new Sequelize({
  dialect: 'sqlite',
  storage ,
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

sqlite
  .authenticate()
  // .sync({ force: true })
  .then(() => { 
    console.log(`Conecting to SQLite SEQUALIZE `);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sqlite;
