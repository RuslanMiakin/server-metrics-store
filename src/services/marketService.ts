import { MarketData } from "../db/models/MarketData";
import { MarketDto } from "../types/types";
import { User } from "../db/models/User";

export const createMarket = async (marketData: MarketDto) => {
    try {
        const userExists = await User.findByPk(marketData.userId);
        if (!userExists) {
            throw new Error(`Пользователь с ID ${marketData.userId} не найден`);
        }
        const market = await MarketData.create({
            ...marketData,
        });
        return market;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
export const getMarketsByUserId = async (userId: number) => {
    try {
        const markets = await MarketData.findAll({
            where: { userId },
            include: [User, 'campaignStatistics'],
        });
        if (markets.length === 0) {
            throw new Error(`Маркетов для пользователя с ID ${userId} не найдено`);
        }
        return markets;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
