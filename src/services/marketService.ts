import { MarketData } from "../db/models/MarketData";
import {IMarket, MarketDto} from "../types/types";
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
        });
        if (markets.length === 0) {
            return [];
        }
        const marketsWithoutToken = markets.map((market: any) => {
            const { token, ...marketDataWithoutToken } = market.toJSON();
            return {
                userId: marketDataWithoutToken.userId,
                marketId: marketDataWithoutToken.marketId,
                marketName: marketDataWithoutToken.marketName,
                createdAt: marketDataWithoutToken.createdAt,
                updatedAt: marketDataWithoutToken.updatedAt,
            };
        });
        return marketsWithoutToken as IMarket[];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

