import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import {createMarket, getMarketsByUserId} from "../services/marketService";

export const createMarketController = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
        const newMarket = await createMarket(req.body);
        if (!newMarket) {
            next(CustomError.internal(`Не удалось создать маркет: ${newMarket}`));
        } else {
            return res.status(201).send({ status: 'success', data: newMarket });
        }
    } catch (error) {
        next(CustomError.internal('Внутренняя ошибка сервера', error));
    }
};

export const getMarketsByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            next(CustomError.badRequest('ID пользователя должен быть предоставлен'));
        }
        const market = await getMarketsByUserId(Number(userId));
        if (!market) {
            next(CustomError.notFound(`Маркет для пользователя с ID ${userId} не найден`));
        } else {
            return res.status(200).json({ status: 'success', data: market });
        }
    } catch (e: any) {
        if (e.name === 'NotFoundError') {
            next(CustomError.notFound(e.message, e));
        } else {
            next(CustomError.internal('Ошибка при получении маркета', e));
        }
    }
};
