import {NextFunction, Request, Response} from "express";
import CustomError from "../errors/CustomError";
import jwt from "jsonwebtoken";
import {generateToken} from "../utils/generateToken";
import {login, registration} from "../services/authService";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await login(req.body);
        return res.send({ status: 'success', data: { token } });
    } catch (e: any) {
        if (e.name === 'EmailNotFoundError') {
            next(CustomError.unauthorized('Неверный email', e));
        } else if (e.name === 'InvalidPasswordError') {
            next(CustomError.unauthorized('Неверный пароль', e));
        } else {
            next(CustomError.internal('Ошибка сервера', e));
        }
    }
}

export const registrationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await registration(req.body);
        if (!user) {
            next(CustomError.internal('Не удалось создать пользователя'));
        } else {
            const token = generateToken(user);
            return res.status(201).send({ status: 'success', data: { user, token } });
        }
    } catch (e) {
        next(CustomError.internal('Ошибка регистрации', e));
    }
}

export const validateTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;

        if (!token) {
            next(CustomError.unauthorized('Токен не предоставлен'));
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET не определен');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Ошибка валидации токена:', err);
                next(CustomError.unauthorized('Валидация токена не удалась', err));
            } else {
                return res.send({ status: 'success', data: decoded });
            }
        });
    } catch (e) {
        console.error('Исключение в процессе валидации токена:', e);
        next(CustomError.internal('Валидация токена не удалась', e));
    }
}
