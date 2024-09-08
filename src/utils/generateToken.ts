import jwt from 'jsonwebtoken';

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface IUser {
  userId: number;
  email: string;
  lastName: string;
  firstName: string;
  role: number;
}

export const generateToken = (user: IUser) => {
  const payload = {
    userId: user.userId,
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};
