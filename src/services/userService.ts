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
