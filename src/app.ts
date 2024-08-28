import "dotenv/config";
import express, {Application} from 'express';
// import './cron/scheduler'
import { sequelize } from './db';
import routes from './routes';
import cors from 'cors';
import errorHandler from "./middleware/errorHandler";
const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const start = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к бд установлено.');
        await sequelize.sync({ force: true })
            .then(() => console.log('Таблицы удалены и созданы заново.'));// Синхронизация всех моделей с базой данных с удалением существующих таблиц и созданием новых
        // await sequelize.sync()
        //     .then(() => console.log('Таблицы синхронизированы без удаления данных.'));// Синхронизация всех моделей с базой данных без удаления существующих таблиц

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Сервер запущен на http://localhost:${port}`);
        });
    } catch (e) {
        console.error('Ошибка подключения к базе данных или запуска сервера:', e);
        process.exit(1);
    }
};

start();
