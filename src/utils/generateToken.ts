import jwt from 'jsonwebtoken';

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface IUser {
  id: number;
  email: string;
  role: number;
}

export const generateToken = (user: IUser) => {
  const payload = {
    id: user.id,
    email: user.email,
    roleId: user.role
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};
