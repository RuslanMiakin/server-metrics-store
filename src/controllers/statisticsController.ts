import {NextFunction} from "express";
import { Request, Response } from 'express';
import {getAllStatistics, getDailyStatistics} from "../services/statisticsService";
import CustomError from "../errors/CustomError";

export const getAllStatisticsController = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const { intervalFrom, intervalTo } = req.body;
        const statistics = await getAllStatistics(intervalFrom, intervalTo);
        if (!statistics) {
            next(CustomError.notFound('Статистика не найдена'))
        }
        res.status(200).send({status: "200", data: statistics})
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при получении статистики', error));
    }
}

export const getDailyStatisticsController = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const { intervalFrom, intervalTo } = req.body;
        const statistics = await getDailyStatistics(intervalFrom, intervalTo);
        if (!statistics) {
            next(CustomError.notFound('Статистика не найдена'))
        }
        res.status(200).send({status: "200", data: statistics})
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при получении статистики', error));
    }
}
