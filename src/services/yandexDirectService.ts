import axios from 'axios';
import {sequelize} from "@/db";
import {CampaignStatistics} from "@/db/models/CampaignStatistics";

interface ReportData {
    [key: string]: string | number;
}

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

    const parseTSV = (tsv: string): ReportData[] => {

        const lines = tsv.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split('\t');
        const data = lines.slice(1).map(line => {
            const values = line.split('\t');
            return headers.reduce((obj: ReportData, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {} as ReportData);
        });

        console.log(data);
        return data;
    };

    try {
        const response = await axios.post('https://api.direct.yandex.com/json/v5/reports', data, options);
        console.log('Report request sent successfully:', response.data);
        const reportData = parseTSV(response.data);

        await sequelize.transaction(async (t) => {

            await CampaignStatistics.destroy({ where: { account_id: 1 }, transaction: t }); // удаляем записи из таблицы где account_id = 1

            // Запись новых данных
            for (const record of reportData) {
                await CampaignStatistics.create({
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
                }, { transaction: t });
            }
        });

        console.log('Data successfully updated in the database');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error requesting report:', error.response ? error.response.data : error.message);
        } else {
            console.error('Error requesting report:', error);
        }
    }
};
