import axios from 'axios';
import {sequelize} from "@/db";
import {CampaignStatistics} from "@/db/models/CampaignStatistics";
import {parseTSV} from "@/utils/parseTSV";
import CustomError from "@/errors/CustomError";

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

        const records = reportData.map(record => ({
            CampaignName: record.CampaignName,
            Date: new Date(record.Date),
            Clicks: parseInt(record.Clicks as string, 10) || 0,
            Cost: parseFloat(record.Cost as string) || 0,
            Ctr: parseFloat(record.Ctr as string) || 0,
            AvgCpc: parseFloat(record.AvgCpc as string) || 0,
            Conversions: parseInt(record.Conversions as string, 10) || 0,
            CostPerConversion: parseFloat(record.CostPerConversion as string) || 0,
            Impressions: parseInt(record.Impressions as string, 10) || 0,
            user_id: 1,  // заполняем дефолтным значением
            account_id: 1  // заполняем дефолтным значением
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
