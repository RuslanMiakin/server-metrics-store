import { NextFunction } from "express";
import { Request, Response } from 'express';
import { getAllStatistics, getDailyStatistics } from "../services/statisticsService";
import CustomError from "../errors/CustomError";

export const getAllStatisticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { intervalFrom, intervalTo } = req.query;

        const userId = Number(req.query.userId);
        console.log(userId);
        const marketId = Number(req.query.currentMarketId);
        console.log(marketId);
        // Проверяем, что userId и marketId корректно преобразованы в числа
        if (isNaN(userId) || isNaN(marketId)) {
            next(CustomError.badRequest('Некорректный userId или marketId'));
        }

        const statistics = await getAllStatistics(intervalFrom as string, intervalTo as string, userId, marketId);
        if (!statistics) {
            next(CustomError.notFound('Статистика не найдена'));
        }
        res.status(200).send({ status: "200", data: statistics });
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при получении статистики', error));
    }
}

export const getDailyStatisticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { intervalFrom, intervalTo } = req.query;

        const userId = Number(req.query.userId);
        console.log(userId);
        const marketId = Number(req.query.currentMarketId);
        console.log(marketId);
        // Проверяем, что userId и marketId корректно преобразованы в числа
        if (isNaN(userId) || isNaN(marketId)) {
            next(CustomError.badRequest('Некорректный userId или marketId'));
        }

        const statistics = await getDailyStatistics(intervalFrom as string, intervalTo as string, userId, marketId);
        if (!statistics) {
            next(CustomError.notFound('Статистика не найдена'));
        }
        res.status(200).send({ status: "200", data: statistics });
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при получении статистики', error));
    }
}

// export const getAllStatisticsController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { intervalFrom, intervalTo,
//             userId, marketId  } = req.query;
//
//         const statistics = await getAllStatistics(intervalFrom as string, intervalTo as string);
//         if (!statistics) {
//             next(CustomError.notFound('Статистика не найдена'));
//         }
//         res.status(200).send({ status: "200", data: statistics });
//     } catch (error) {
//         next(CustomError.internal('Произошла ошибка при получении статистики', error));
//     }
// }
//
// export const getDailyStatisticsController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { intervalFrom, intervalTo,
//             userId, marketId  } = req.query;
//         const statistics = await getDailyStatistics(intervalFrom as string, intervalTo as string);
//         if (!statistics) {
//             next(CustomError.notFound('Статистика не найдена'));
//         }
//         res.status(200).send({ status: "200", data: statistics });
//     } catch (error) {
//         next(CustomError.internal('Произошла ошибка при получении статистики', error));
//     }
// }

