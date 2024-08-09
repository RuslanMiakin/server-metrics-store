import express, {NextFunction} from 'express';
import {fetchAndStoreYandexReport} from "@/controllers/yandexController";
import CustomError from "@/errors/CustomError";
import {getAllStatisticsController} from "@/controllers/statisticsController";

const router = express();

router.get('/test1', (req, res) =>
    res.status(666).send({ test: 'test1' }));
router.get('/test2', (req, res) =>
    res.status(777).send({ test: 'test2' }));
router.post('/yandex-report', fetchAndStoreYandexReport);

router.get('/statistics', getAllStatisticsController)

router.use((req, res, next) => {
    next(CustomError.notFound('Маршрут не найден'));

});

export default router;
