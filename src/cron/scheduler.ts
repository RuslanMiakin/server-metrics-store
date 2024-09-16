import cron from 'node-cron';
import { sendYandexRequest } from '../utils/utils';
import {MarketData} from "../db/models/MarketData";



export async function updateMarketDataMorning() {
    try {
        const markets = await MarketData.findAll();

        const requests = markets.map((market) => {
            const { userId, marketId,clientLogin, token } = market;
            const formattedDate = new Date().toLocaleDateString('ru-RU');
            const reportName = `Daily Yandex Direct Report for ${userId} user and ${marketId} market ${formattedDate}`;

            return sendYandexRequest(userId, marketId, clientLogin, token, reportName);
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

        const allSuccessful = results.every(result => result.status === 'fulfilled' && result.value === 'success');
        if (allSuccessful) {
            console.log('Все запросы завершились успешно.');
        } else {
            console.error('Некоторые запросы завершились с ошибками.');
        }

    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
    }
}


//?? Сделать простую проверку на день недели / время ()
export async function updateMarketDataEvery20Minutes() {
    try {
		
		let markets = await MarketData.findAll({
            where: { state: true }
        });
		
		const now = new Date();
		const hours = now.getHours()
		const minutes = now.getMinutes()
		
		if(housr === '6' && (minutes < 30)){
			markets = await MarketData.findAll();
		}
		
		
        if (markets.length === 0) {
            console.log('Нет новых маркетов для обновления.');
            return;
        }

        const requests = markets.map((market) => {
            const { userId, marketId, clientLogin, token } = market;
            const formattedDateTime = new Date().toLocaleString('ru-RU');
			
			//Продумать логику на основе данных выше
            const reportName = `Yandex Direct Report every 20 minutes for ${userId} user and ${marketId} market ${formattedDateTime}`;

            return sendYandexRequest(userId, marketId, clientLogin, token, reportName);
        });

        const results = await Promise.allSettled(requests);

        let allSuccessful = true;

        for (let index = 0; index < results.length; index++) {
            const result = results[index];
            const market = markets[index];
            const marketId = market.marketId;

            if (result.status === 'fulfilled' && result.value === 'success') {
                console.log(`Запрос для marketId ${marketId} выполнен успешно.`);

                // Обновляем state на false (если данные обновились, записи в любом случае ставим в false, не трогаем)
                await MarketData.update({ state: false }, { where: { marketId } });
            } else {
                allSuccessful = false;

                if (result.status === 'fulfilled' && result.value === 'failed') {
                    console.error(`Запрос для marketId ${marketId} завершился с ошибкой.`);
                } else if (result.status === 'rejected') {
                    console.error(`Запрос для marketId ${marketId} завершился с ошибкой:`, result.reason);
                }
            }
        }

        if (allSuccessful) {
            console.log('Все запросы каждые 20 минут завершились успешно.');
        } else {
            console.error('Некоторые запросы каждые 20 минут завершились с ошибками.');
        }

    } catch (error) {
        console.error('Ошибка при обновлении данных каждые 20 минут:', error);
    }
}

cron.schedule('0 6 * * *', async () => {
    console.log('Запуск утреннего обновления данных из Яндекс Директ в 6 утра.');
    await updateMarketDataMorning();
});
cron.schedule('*/20 * * * *', async () => {
    console.log('Запуск обновления данных из Яндекс Директ каждые 20 минут.');
    await updateMarketDataEvery20Minutes();
});
