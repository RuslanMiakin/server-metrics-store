import express, {NextFunction} from 'express';
import {fetchAndStoreYandexReport} from "../controllers/yandexController";
import {getAllStatisticsController} from "../controllers/statisticsController";
import CustomError from "../errors/CustomError";
import {usersRoutes} from "./UserRoutes";
const router = express();

router.get('/test', (req, res) =>
    res.status(777).send({ test: 'test' }));

router.use('/users', usersRoutes);

router.post('/yandex-report', fetchAndStoreYandexReport);
router.get('/statistics', getAllStatisticsController)

router.use((req, res, next) => {
    next(CustomError.notFound('Маршрут не найден'));

});

export default router;
