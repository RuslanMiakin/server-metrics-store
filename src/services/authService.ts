import {IUser, UserDto} from "../types/types";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/generateToken";
import {createUser, getUserByEmail} from "./userService";

export const login = async (loginData: UserDto): Promise<string> => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginData.email)) {
            throw new Error('Invalid email format');
        }

        const user = await getUserByEmail(loginData.email);
        if (!user) {
            const error = new Error('Email not found');
            error.name = 'EmailNotFoundError';
            throw error;
        }

        if (!loginData.password || typeof loginData.password !== 'string') {
            throw new Error('Login password is missing or invalid');
        }
        if (!user.password || typeof user.password !== 'string') {
            throw new Error(`User password is missing or invalid. ${JSON.stringify(user, null, 2)}`);
        }

        const isValid = await bcrypt.compare(loginData.password, user.password);
        if (!isValid) {
            const error = new Error('Invalid password');
            error.name = 'InvalidPasswordError';
            throw error;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user.toJSON();

        const userForToken: IUser = {
            userId: userWithoutPassword.userId,
            email: userWithoutPassword.email,
            firstName: userWithoutPassword.firstName,
            lastName: userWithoutPassword.lastName,
            status: userWithoutPassword.status,
            role: userWithoutPassword.role,
            createdAt: new Date(userWithoutPassword.createdAt),
            updatedAt: new Date(userWithoutPassword.updatedAt),
        };
        console.log('User for token:', userForToken);
        return generateToken(userForToken);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const registration = async (data: UserDto) => {
    try {
            const newUser = await createUser({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = newUser.toJSON();

        const userForToken: IUser = {
            userId: userWithoutPassword.userId,
            email: userWithoutPassword.email,
            firstName: userWithoutPassword.firstName,
            lastName: userWithoutPassword.lastName,
            status: userWithoutPassword.status,
            role: userWithoutPassword.role,
            createdAt: new Date(userWithoutPassword.createdAt),
            updatedAt: new Date(userWithoutPassword.updatedAt),
        };
        console.log('User for token:', userForToken);

        return generateToken(userForToken)
    } catch (e) {
        console.log(e);
        throw e;
    }
}
