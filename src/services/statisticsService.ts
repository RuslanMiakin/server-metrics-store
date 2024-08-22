import {CampaignStatistics} from "../db/models/CampaignStatistics";
import CustomError from "../errors/CustomError";

export const getAllStatistics = async () => {
    try {
        const statistics = await CampaignStatistics.findAll();
        return statistics;
    } catch (error) {
       throw CustomError.internal('Непредвиденная ошибка', error)
    }
};
export const getDailyStatistics = async () => {
    try {
        const statistics = await CampaignStatistics.findAll();
        let idCounter = 1;
        // группируем данные по датам
        const groupedStatistics = statistics.reduce((acc: any, stat: any) => {
            // получаем только дату без времени
            const dateKey = new Date(stat.date).toISOString().split('T')[0]
            if (!acc[dateKey]) {
                acc[dateKey] = {
                    id: idCounter++,
                    date: dateKey,
                    dayOfWeek: new Date(dateKey).toLocaleString('ru-RU', { weekday: 'long' }), // получаем день недели на русском
                    clicks: 0,
                    impressions: 0,
                    avgCpc: 0,
                    cost: 0,
                    conversions: 0,
                    costPerConversion: 0
                };
            }

            acc[dateKey].clicks += stat.clicks;
            acc[dateKey].impressions += stat.impressions;
            acc[dateKey].cost += stat.cost;
            acc[dateKey].conversions += stat.conversions;

            return acc;
        }, {});

        // рассчитываем CTR и costPerConversion
        for (const date in groupedStatistics) {
            const data = groupedStatistics[date];
            data.ctr = data.clicks && data.impressions ? (data.clicks / data.impressions) * 100 : 0;
            data.avgCpc = data.clicks ? data.cost / data.clicks : 0;
            data.costPerConversion = data.conversions ? data.cost / data.conversions : 0;

            data.ctr = parseFloat(data.ctr.toFixed(2));
            data.avgCpc = parseFloat(data.avgCpc.toFixed(2));
            data.cost = parseFloat(data.cost.toFixed(2));
            data.costPerConversion = parseFloat(data.costPerConversion.toFixed(2));

        }

        const result = Object.values(groupedStatistics); // преобразуем объект в массив

        return result;
    } catch (error) {
        throw CustomError.internal('Непредвиденная ошибка', error);
    }
};
