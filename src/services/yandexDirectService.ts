import axios from 'axios';
import {parseTSV} from "../utils/parseTSV";
import {sequelize} from "../db";
import {CampaignStatistics} from "../db/models/CampaignStatistics";
import CustomError from "../errors/CustomError";
import {registration} from "./authService";

const createTestUser = async () => {
    const testUser = await registration({
        email: 'test@test.com',
        password: 'password123'
    });
    return testUser.id;
};
// const userId = await createTestUser();

export const getYandexDirectReport = async (dateFrom: string, dateTo: string, includeVAT: boolean, reportName: string) => {
    const fieldsArray = [
        'CampaignName', 'Date', 'Clicks', 'Cost', 'Ctr', 'AvgCpc', 'Conversions', 'CostPerConversion', 'Impressions'
    ];

    const data = {
        "params": {
            "FieldNames": fieldsArray,
            "ReportType": "CUSTOM_REPORT",
            "DateRangeType": "CUSTOM_DATE",
            "SelectionCriteria": {
                "DateFrom": dateFrom,
                "DateTo": dateTo
            },
            "IncludeVAT": includeVAT ? 'YES' : 'NO',
            "ReportName": reportName,
            "Format": "TSV",
            "IncludeDiscount": "NO"
        }
    };

    const options = {
        headers: {
            'Authorization': 'Bearer y0_AgAAAAA0UpcqAAZAOQAAAAEGJn5gAADfUJXb9K9G5bU09jRVF0LEst_SeQ',
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
        // const userId = Math.floor(Math.random() * 1000); // Генерация случайного user_id
        // const accountId = Math.floor(Math.random() * 1000); // Генерация случайного account_id
        const userId = await createTestUser();
        const records = reportData.map(record => ({
            user_id: userId,  // заполняем дефолтным значением
            account_id: Math.floor(Math.random() * 10000),  // заполняем дефолтным значением
            campaignName: record.CampaignName,
            date: new Date(record.Date),
            clicks: parseInt(record.Clicks as string, 10) || 0,
            cost: parseFloat(record.Cost as string) || 0,
            ctr: parseFloat(record.Ctr as string) || 0,
            avgCpc: parseFloat(record.AvgCpc as string) || 0,
            conversions: parseInt(record.Conversions as string, 10) || 0,
            costPerConversion: parseFloat(record.CostPerConversion as string) || 0,
            impressions: parseInt(record.Impressions as string, 10) || 0
        }));

        await sequelize.transaction(async (t) => {
            await CampaignStatistics.bulkCreate(records, { transaction: t }); // создаем новые записи
            // await CampaignStatistics.destroy({ where: { account_id: 1 }, transaction: t }); // удаляем записи из таблицы где account_id = 1
        });

        console.log('Данные успешно обновлены в базе данных');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMsg = error.response ? error.response.data : error.message;
            throw CustomError.internal('Ошибка запроса отчета из Яндекс Директ', errorMsg);
        } else {
            throw CustomError.internal('Произошла непредвиденная ошибка', error);
        }
    }
};
