import axios from 'axios';
import {parseTSV} from "../utils/parseTSV";
import {sequelize} from "../db";
import {CampaignStatistics} from "../db/models/CampaignStatistics";
import CustomError from "../errors/CustomError";
import {registration} from "./authService";
import {User} from "../db/models/User";

const createTestUser = async () => {
    const existingUser = await User.findOne({ where: { email: 'test@test.com' } });

    if (existingUser) {
        console.log(`User with email ${existingUser.email} already exists`);
        return existingUser.id;
    }
    const testUser = await registration({
        email: 'test@test.com',
        password: 'password123'
    });
    console.log(testUser.id)
    return testUser.id;
};

export const getYandexDirectReport = async (includeVAT: boolean, reportName: string) => {
    const fieldsArray = [
        'CampaignName', 'Date', 'Clicks', 'Cost', 'Ctr', 'AvgCpc', 'Conversions', 'CostPerConversion', 'Impressions'
    ];

    const data = {
        "params": {
            "SelectionCriteria": {},
            "FieldNames": fieldsArray,
            "ReportType": "CUSTOM_REPORT",
            "DateRangeType": "ALL_TIME",
            "IncludeVAT": includeVAT ? 'YES' : 'NO',
            "ReportName":reportName,
            "Format": "TSV",
            "IncludeDiscount": "NO"
        }
    };

    const options = {
        headers: {
            'Authorization': 'Bearer y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A',
            'Content-Type': 'application/json; charset=utf-8',
            'Client-Login': 'e-16459034',
            'processingMode': 'offline',
            'returnMoneyInMicros': false,
            'skipReportHeader': true,
            'skipReportSummary': true
        }
    };

    try {
        const response = await axios.post('https://api.direct.yandex.com/json/v5/reports', data, options);
        console.log('Report request sent successfully:', response.data);
        const reportData = parseTSV(response.data);
        const userId = await createTestUser();
        const records = reportData.map(record => ({
            user_id: userId,  // заполняем дефолтным значением
            account_id: Math.floor(Math.random() * 10000),  // заполняем дефолтным значением
            campaignName: record.CampaignName,
            date: new Date(record.Date),
            clicks: parseInt(record.Clicks as string, 10) || 0,
            cost: parseFloat(record.Cost as string) / 1000000 || 0,
            ctr: parseFloat(record.Ctr as string) || 0,
            avgCpc: parseFloat(record.AvgCpc as string) / 1000000 || 0,
            conversions: parseInt(record.Conversions as string, 10) || 0,
            costPerConversion: parseFloat(record.CostPerConversion as string) / 1000000 || 0,
            impressions: parseInt(record.Impressions as string, 10) || 0
        }));

        await sequelize.transaction(async (t) => {
            await CampaignStatistics.destroy({ where: {}, transaction: t }); // удаляем все записи из таблицы
            await CampaignStatistics.bulkCreate(records, { transaction: t }); // создаем новые записи
        });

        console.log('Данные успешно обновлены в базе данных');
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMsg = error.response ? error.response.data : error.message;
            throw CustomError.internal('Ошибка запроса отчета из Яндекс Директ', errorMsg);
        } else {
            throw CustomError.internal('Произошла непредвиденная ошибка', error);
        }
    }
};
