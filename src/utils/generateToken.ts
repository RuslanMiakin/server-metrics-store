import jwt from 'jsonwebtoken';
import {IUser} from "../types/types";

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (user: IUser) => {
  const payload = {
    userId: user.userId,
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};
