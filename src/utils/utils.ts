import {User} from "../db/models/User";
import {createUser} from "../services/userService";
import {MarketData} from "../db/models/MarketData";
import {createMarket} from "../services/marketService";
import {getYandexDirectReport} from "../services/yandexDirectService";

export const sendYandexRequest = async (
    userId: number,
    marketId: number,
    token: string,
    reportName: string,
    maxRetries: number = 4
): Promise<void | string> => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    let counter = 0;
    const makeRequest = async (): Promise< void | string> => {
        try {
            const response = await getYandexDirectReport(userId, marketId, token, reportName);
            if (response.status === 200) {
                console.log('Данные успешно обновлены');
                return 'success';
            } else {
                console.log(`Не удалось обновить данные, код ответа: ${response.status}. Повторная попытка...`);
                if (counter < maxRetries) {
                    counter++;
                    await sleep(4000);
                    await makeRequest();
                } else {
                    console.log('Достигнуто максимальное количество попыток. Операция прервана.');
                    return 'failed';
                }
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            if (counter < maxRetries) {
                counter++;
                console.log('Повторная попытка через 10 секунд...');
                await sleep(10000);
                await makeRequest();
            } else {
                console.log('Достигнуто максимальное количество попыток. Операция прервана.');
                return 'failed';
            }
        }
    };
    await makeRequest();
};

export const createTestUser = async () => {
    const existingUser = await User.findOne({ where: { email: 'test@test.com' } });

    if (existingUser) {
        console.log(`User with email ${existingUser.email} already exists`);
        return existingUser.userId;
    }
    const testUser = await createUser({
        email: 'test@test.com',
        password: 'password123',
        lastName: 'Test',
        firstName: 'Test'
    });
    // console.log(testUser.userId)
    return testUser.userId;
};
export const createTestMarket = async () => {
    const existingMarket = await MarketData.findOne({ where: { marketName: 'Test Market' } });

    if (existingMarket) {
        console.log(`Market with name ${existingMarket.marketName} already exists`);
        return existingMarket.marketId;
    }

    const testMarket = await createMarket({
        userId: 1,
        marketName: 'Test Market',
        // token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
        token: 'y0_AgAAAAAuFc8fAAZAOQAAAAEQvauDAABQDjLWktZJ2LKw9Ei6e3IOwaKBJg'
    });
    // console.log(testMarket.userId)
    return testMarket.marketId;
};
