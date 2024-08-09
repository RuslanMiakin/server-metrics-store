import {CampaignStatistics} from "@/db/models/CampaignStatistics";
import CustomError from "@/errors/CustomError";

export const getAllStatistics = async () => {
    try {
        const statistics = await CampaignStatistics.findAll();
        return statistics;
    } catch (error) {
       throw CustomError.internal('Непредвиденная ошибка', error)
    }
};
