import {NextFunction, Request, Response} from "express";
import {createUser} from "../services/userService";
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
