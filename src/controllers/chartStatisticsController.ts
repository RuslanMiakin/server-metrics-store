import {NextFunction, Request, Response} from "express";
import CustomError from "../errors/CustomError";
import {getChartStatistics} from "../services/chartServices";

export const getChartStatisticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { intervalFrom, intervalTo } = req.query;
        const userId = Number(req.query.userId);
        const marketId = Number(req.query.currentMarketId);
        console.log(userId);
        console.log(marketId);

        if (isNaN(userId) || isNaN(marketId)) {
            next(CustomError.badRequest('Некорректный userId или marketId'));
        }
        const statistics = await getChartStatistics(intervalFrom as string, intervalTo as string, userId, marketId);
        if (!statistics) {
            next(CustomError.notFound('Статистика не найдена'));
        }
        res.status(200).send({ status: "200", data: statistics });
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при получении статистики', error));
    }
}
