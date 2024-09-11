import {NextFunction, Request, Response} from "express";
import CustomError from "../errors/CustomError";
import jwt from "jsonwebtoken";
import {generateToken} from "../utils/generateToken";
import {login, registration} from "../services/authService";
import {User} from "../db/models/User";

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
        const token = await registration(req.body);
        if (!token) {
            next(CustomError.internal('Не удалось создать пользователя'));
        } else {
            return res.status(201).send({ status: 'success', data: { token } });
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
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET не определен');
    }
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                next(CustomError.unauthorized('Токен не предоставлен'));
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            console.log(user)
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            (req as any).user = user; // добавляем объект пользователя в req.user
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
};
