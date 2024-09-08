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
