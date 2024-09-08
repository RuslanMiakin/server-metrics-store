import express, {NextFunction} from 'express';
import {fetchAndStoreYandexReport} from "../controllers/yandexController";
import CustomError from "../errors/CustomError";
import {usersRoutes} from "./userRoutes";
import {authRoutes} from "./authRoutes";
import {statisticsRoutes} from "./statisticsRoutes";
import {chartStatisticsRoutes} from "./chartStatisticsRoutes";
import {marketRoutes} from "./marketRoutes";
const router = express();

router.get('/test', (req, res) =>
    res.status(777).send({ test: 'test' }));

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/statistics', statisticsRoutes)
router.use('/chartStatistics', chartStatisticsRoutes)
router.use('/markets', marketRoutes)

router.post('/yandex-report', fetchAndStoreYandexReport);

router.use((req, res, next) => {
    next(CustomError.notFound('Маршрут не найден'));

});

export default router;

