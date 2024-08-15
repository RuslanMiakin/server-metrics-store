import {UserDto} from "../types/types";
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
        console.log('LOGIN DATA:', loginData.password);
        console.log('USER LOGIN:', user.dataValues.password);

        if (!loginData.password || typeof loginData.password !== 'string') {
            throw new Error('Login password is missing or invalid');
        }
        if (!user.password || typeof user.password !== 'string') {
            throw new Error(`User password is missing or invalid. ${JSON.stringify(user, null, 2)}`);
        }

        // const loginPass = await bcrypt.hash(loginData.password, 10);
        // console.log('USER PASSWORD:', user.password);
        // console.log('LOGIN PASSWORD:', loginPass);

        const isValid = await bcrypt.compare(loginData.password, user.password);
        if (!isValid) {
            const error = new Error('Invalid password');
            error.name = 'InvalidPasswordError';
            throw error;
        }
        const token = generateToken(user);
        return token;
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
            });
        return newUser;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
