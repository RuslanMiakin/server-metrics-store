import express from "express";
import {getChartStatisticsController} from "../controllers/chartStatisticsController";

const router = express.Router();

router.get('/', getChartStatisticsController)

export const chartStatisticsRoutes = router;
