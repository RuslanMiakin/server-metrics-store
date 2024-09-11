import {User} from "../db/models/User";
import {createUser} from "../services/userService";
import {MarketData} from "../db/models/MarketData";
import {createMarket} from "../services/marketService";

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
    console.log(testUser.userId)
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
        token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
    });
    console.log(testMarket.userId)
    return testMarket.marketId;
};
