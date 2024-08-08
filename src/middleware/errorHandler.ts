import { Request, Response, NextFunction } from 'express';
import CustomError from "@/utils/CustomError";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            details: err.details,
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Внутренняя ошибка сервера',
        });
    }
}

export default errorHandler;
