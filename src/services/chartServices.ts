import dayjs from "dayjs";
import {Op} from "sequelize";
import {CampaignStatistics} from "../db/models/CampaignStatistics";
import CustomError from "../errors/CustomError";

export const getChartStatistics = async (intervalFrom?: string, intervalTo?: string, userId?: number, marketId?: number) => {
    try {
        let adjustedIntervalTo: string | undefined = intervalTo;

        if (intervalTo) {
            adjustedIntervalTo = dayjs(intervalTo).add(1, 'day').format('YYYY-MM-DD');// добавляем 1 день
        }
        const whereClause: any = {
            ...(intervalFrom && adjustedIntervalTo && { date: { [Op.between]: [intervalFrom, adjustedIntervalTo] } }),
            ...(userId && { userId }),
            ...(marketId && { marketId }),
        };

        const statistics = await CampaignStatistics.findAll({ where: whereClause });
        let idCounter = 1;
        let totalClicks = 0;
        let totalCost = 0;
        let totalConversions = 0;

        // группируем данные по датам
        const groupedStatistics = statistics.reduce((acc: any, stat: any) => {

            const dateKey = new Date(stat.date).toISOString().split('T')[0]
            if (!acc[dateKey]) {
                acc[dateKey] = {
                    id: idCounter++,
                    date: dateKey,
                    clicks: 0,
                    cost: 0,
                    conversions: 0,
                };
            }

            acc[dateKey].clicks += stat.clicks;
            acc[dateKey].cost += stat.cost;
            acc[dateKey].conversions += stat.conversions;

            totalClicks += stat.clicks;
            totalCost += stat.cost;
            totalConversions += stat.conversions;
            return acc;
        }, {});

        const dailyStatistics = Object.values(groupedStatistics);
        const result = {
            dailyStatistics,
            totalStatistics: {
                clicks: totalClicks,
                cost: parseFloat(totalCost.toFixed(2)),
                conversions: totalConversions
            }
        };
        return result;
    } catch (error) {
        throw CustomError.internal('Непредвиденная ошибка', error);
    }
};
