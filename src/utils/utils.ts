import {User} from "../db/models/User";
import {createUser} from "../services/userService";
import {MarketData} from "../db/models/MarketData";
import {createMarket} from "../services/marketService";
import {getYandexDirectReport} from "../services/yandexDirectService";

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const sendYandexRequest = async (
    userId: number,
    marketId: number,
    clientLogin: string,
    token: string,
    reportName: string,
    maxRetries: number = 4
): Promise<string> => {
    let counter = 0;

    while (counter <= maxRetries) {
        try {
            const response = await getYandexDirectReport(userId, marketId, clientLogin, token, reportName);

            if (response.status === 200) {
                console.log('Данные успешно обновлены');
                return 'success';
            } else {
                console.log(`Не удалось обновить данные, код ответа: ${response.status}. Повторная попытка...`);
                counter++;
                if (counter <= maxRetries) {
                    await sleep(4000);
                }
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            counter++;
            if (counter <= maxRetries) {
                console.log('Повторная попытка через 10 секунд...');
                await sleep(10000);
            }
        }
    }

    console.log('Достигнуто максимальное количество попыток. Операция прервана.');
    return 'failed';
};

