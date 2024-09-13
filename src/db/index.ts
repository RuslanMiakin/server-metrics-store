import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

const db_config = {
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'DB_USERNAME',
    password: process.env.DB_PASS || 'DB_PASS',
    database: process.env.DB_NAME || 'DB_NAME',
    models: [__dirname + '/models'],
    logging: false
};

export const sequelize = new Sequelize(db_config);
