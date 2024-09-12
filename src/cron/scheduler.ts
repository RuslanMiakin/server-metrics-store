import cron from 'node-cron';
import { sendYandexRequest } from '../utils/utils';
import {MarketData} from "../db/models/MarketData";

async function updateMarketData() {
    try {
        const markets = await MarketData.findAll();

        const requests = markets.map((market) => {
            const { userId, marketId, token } = market;
            const formattedDate = new Date().toLocaleDateString('ru-RU');
            const reportName = `Daily Yandex Direct Report for ${userId} user and ${marketId} market ${formattedDate}`;

            return sendYandexRequest(userId, marketId, token, reportName);
        });

        const results = await Promise.allSettled(requests);

        results.forEach((result, index) => {
            const marketId = markets[index].marketId;

            if (result.status === 'fulfilled' && result.value === 'success') {
                console.log(`Запрос для marketId ${marketId} выполнен успешно.`);
            } else if (result.status === 'fulfilled' && result.value === 'failed') {
                console.error(`Запрос для marketId ${marketId} завершился с ошибкой.`);
            } else if (result.status === 'rejected') {
                console.error(`Запрос для marketId ${marketId} завершился с ошибкой:`, result.reason);
            }
        });

    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
    }
}

cron.schedule('0 6 * * *', async () => {
    console.log('Запуск обновления данных из Яндекс Директ в 6 утра каждый день.');
    await updateMarketData();
});

// import cron from 'node-cron';
// import {sendYandexRequest} from "../utils/utils";
//
// cron.schedule('0 6 * * *', async () => {
//     // console.log('Запуск обновления данных из Яндекс Директ каждые 30 секунд');
//     const formattedDate = new Date().toLocaleDateString('ru-RU');
//
//     // const userId = 1;
//     // const marketId = 1;
//     // const token = 'token';
//     const reportName = `Daily Yandex Direct Report for ${userId} user and ${marketId} market ${formattedDate}`;
//
//     await sendYandexRequest(userId, marketId, token, reportName);
//
// });
