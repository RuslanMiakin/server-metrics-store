import {NextFunction, Request, Response} from "express";
import {changePassword, createUser} from "../services/userService";
import CustomError from "../errors/CustomError";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await createUser(req.body);
        if (!newUser ) {
            next(CustomError.internal(`Не удалось создать пользователя: ${newUser}`));
        } else {
            return res.status(201).send({ status: 'success', data: newUser });
        }
    } catch (error) {
        next(CustomError.internal('Internal server error', error));
    }
}

export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw CustomError.badRequest('Старый и новый пароли должны быть предоставлены');
        }
        await changePassword(userId, oldPassword, newPassword);
        return res.status(200).json({ status: 'success', message: 'Пароль успешно изменен' });
    } catch (e: any) {
        if (e.name === 'UnauthorizedError') {
            return next(CustomError.unauthorized(e.message, e));
        } else if (e.name === 'NotFoundError') {
            return next(CustomError.notFound(e.message, e));
        } else {
            return next(CustomError.internal('Ошибка смены пароля', e));
        }
    }
};
