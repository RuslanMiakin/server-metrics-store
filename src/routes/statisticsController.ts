import express from "express";
import {getAllStatisticsController, getDailyStatisticsController} from "../controllers/statisticsController";

const router = express.Router();

router.post('/', getAllStatisticsController)
router.post('/daily', getDailyStatisticsController)

export const statisticsController = router;
