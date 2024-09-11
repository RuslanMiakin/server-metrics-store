export interface UserDto {
    email: string;
    firstName: string;
    lastName?: string;
    password?: string;
    status?: number;
    role?: number;
}

export interface MarketDto {
    userId: number;
    marketName: string;
    token: string;
}

export interface IMarket {
    marketId: number;
    userId: number;
    marketName: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUser {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    status: number;
    role: number;
    createdAt: Date;
    updatedAt: Date;
}

