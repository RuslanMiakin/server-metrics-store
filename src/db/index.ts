import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
interface DBConfig {
    dialect: Dialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    storage?: string;
    models: string[];
    logging: (msg: string) => void;
}

const db_config: DBConfig = {
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'DB_USERNAME',
    password: process.env.DB_PASS || 'DB_PASS',
    database: process.env.DB_NAME || 'DB_NAME',
    models: [__dirname + '/models'],
    logging: console.log
};

export const sequelize = new Sequelize(db_config);
