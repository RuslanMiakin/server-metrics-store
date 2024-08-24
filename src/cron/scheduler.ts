import cron from 'node-cron';
import {getYandexDirectReport} from "../services/yandexDirectService";
import {parseTSV} from "../utils/parseTSV";

cron.schedule('0 6 * * *', async () => {
    console.log('Запуск обновления данных из Яндекс Директ каждые 30 секунд');

    const formattedDate = new Date().toLocaleDateString('ru-RU');

    const includeVAT = true;
    const reportName = `Daily Yandex Direct Report ${formattedDate}`;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const sendRequest = async () => {
        try {
            const response = await getYandexDirectReport(includeVAT, reportName);
            if (response.status === 200) {
                console.log('Данные успешно обновлены');
                console.log(parseTSV(response.data)[4000])
                return;
            } else {
                console.log(`Не удалось обновить данные, код ответа: ${response.status}. Повторная попытка...`);
                await sleep(15000);
                return await sendRequest();
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            console.log('Повторная попытка через 15 секунд...');
            await sleep(15000);
            return await sendRequest(); // Повторная попытка в случае ошибки
        }
    };
    await sendRequest();
});
