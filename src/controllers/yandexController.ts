import {NextFunction, Request, Response} from 'express';
import {getYandexDirectReport} from "@/services/yandexDirectService";

export const fetchAndStoreYandexReport = async (req: Request, res: Response, next: NextFunction) => {
    const { dateFrom, dateTo, includeVAT, reportName } = req.body;
    try {
        await getYandexDirectReport(dateFrom, dateTo, includeVAT, reportName);
        res.status(200).send('Данные обновлены');
    } catch (error) {
        next(error);
    }
};
