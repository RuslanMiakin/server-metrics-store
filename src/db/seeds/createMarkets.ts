import {createMarket} from "../../services/marketService";

export const createMarkets = async () => {
    const markets = [];

    const testMarket1 = await createMarket({
        userId: 1,
        marketName: 'Test Market 1',
        clientLogin: 'peterlermantov',
        token: 'y0_AgAAAAAuFc8fAAZAOQAAAAEQvauDAABQDjLWktZJ2LKw9Ei6e3IOwaKBJg'
    });
    markets.push(testMarket1);

    const testMarket2 = await createMarket({
        userId: 1,
        marketName: 'Test Market 2',
        clientLogin: 'e-16459034',
        token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
    });
    markets.push(testMarket2);

    const testMarket3 = await createMarket({
        userId: 2,
        marketName: 'Test Market 3',
        clientLogin: 'peterlermantov',
        token: 'y0_AgAAAAAuFc8fAAZAOQAAAAEQvauDAABQDjLWktZJ2LKw9Ei6e3IOwaKBJg'
    });
    markets.push(testMarket3);

    const testMarket4 = await createMarket({
        userId: 2,
        marketName: 'Test Market 4',
        clientLogin: 'e-16459034',
        token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
    });
    markets.push(testMarket4);

    const testMarket5 = await createMarket({
        userId: 3,
        marketName: 'Test Market 5',
        clientLogin: 'peterlermantov',
        token: 'y0_AgAAAAAuFc8fAAZAOQAAAAEQvauDAABQDjLWktZJ2LKw9Ei6e3IOwaKBJg'
    });
    markets.push(testMarket5);

    const testMarket6 = await createMarket({
        userId: 3,
        marketName: 'Test Market 6',
        clientLogin: 'e-16459034',
        token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
    });
    markets.push(testMarket6);

    const testMarket7 = await createMarket({
        userId: 4,
        marketName: 'Test Market 7',
        clientLogin: 'peterlermantov',
        token: 'y0_AgAAAAAuFc8fAAZAOQAAAAEQvauDAABQDjLWktZJ2LKw9Ei6e3IOwaKBJg'
    });
    markets.push(testMarket7);

    const testMarket8 = await createMarket({
        userId: 4,
        marketName: 'Test Market 8',
        clientLogin: 'e-16459034',
        token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
    });
    markets.push(testMarket8);

    const testMarket9 = await createMarket({
        userId: 5,
        marketName: 'Test Market 9',
        clientLogin: 'peterlermantov',
        token: 'y0_AgAAAAAuFc8fAAZAOQAAAAEQvauDAABQDjLWktZJ2LKw9Ei6e3IOwaKBJg'
    });
    markets.push(testMarket9);

    const testMarket10 = await createMarket({
        userId: 5,
        marketName: 'Test Market 10',
        clientLogin: 'e-16459034',
        token: 'y0_AgAAAAA0UpcqAAZAOQAAAAEPDcBQAABh-dCIoE5H_4Z0CdXtlMSV37uB2A'
    });
    markets.push(testMarket10);

    return markets;
}
