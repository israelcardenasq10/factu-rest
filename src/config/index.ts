import dotenv from 'dotenv-flow';
dotenv.config();

const config = {
  port: process.env.PORT as string,
  sql: {
    server: process.env.SQL_SERVER as string,
    database: process.env.SQL_DATABASE as string,
    user: process.env.SQL_USER as string,
    password: process.env.SQL_PASSWORD as string,
    port: parseInt(<string>process.env.SQL_PORT),
  },
};

export default config;
