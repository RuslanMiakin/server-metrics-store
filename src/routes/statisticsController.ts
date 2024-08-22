import express from "express";
import {getAllStatisticsController, getDailyStatisticsController} from "../controllers/statisticsController";

const router = express.Router();

router.get('/', getAllStatisticsController)
router.get('/daily', getDailyStatisticsController)

export const statisticsController = router;
