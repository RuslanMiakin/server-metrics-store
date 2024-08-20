import { NextFunction, Request, Response } from 'express';
import CustomError from "../errors/CustomError";
import {getYandexDirectReport} from "../services/yandexDirectService";

export const fetchAndStoreYandexReport = async (req: Request, res: Response, next: NextFunction) => {
    const {includeVAT, reportName } = req.body;
    try {
        if (!reportName) {
            next(CustomError.badRequest('Отсутствуют необходимые параметры: dateFrom, dateTo или reportName'));
        }
        await getYandexDirectReport(includeVAT, reportName);
        res.status(200).send('Данные обновлены');
    } catch (error) {
        next(CustomError.internal('Произошла ошибка при обновлении данных.', error));
    }
};
