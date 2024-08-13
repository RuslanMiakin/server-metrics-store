import {NextFunction} from "express";
import { Request, Response } from 'express';
import {getAllStatistics} from "../services/statisticsService";
import CustomError from "../errors/CustomError";

export const getAllStatisticsController = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const statistics = await getAllStatistics()
        if (!statistics) {
            next(CustomError.notFound('Статистика не найдена'))
        }
        res.status(200).send({status: "200", data: statistics})
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при получении статистики', error));
    }
}
