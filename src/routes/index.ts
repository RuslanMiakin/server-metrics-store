import express from 'express';
import {fetchAndStoreYandexReport} from "@/controllers/yandexController";

const router = express();

router.get('/test1', (req, res) => res.status(666).send({ test: 'test1' }));
router.get('/test2', (req, res) => res.status(777).send({ test: 'test2' }));
router.post('/yandex-report', fetchAndStoreYandexReport);
export default router;
