import {UserDto} from "../types/types";
import {User} from "../db/models/User";
import bcrypt from 'bcrypt';

export const createUser = async (userData: UserDto) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await User.create({
            ...userData,
            password: hashedPassword
        });
        return user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
