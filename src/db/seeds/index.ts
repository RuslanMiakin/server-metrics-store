import {sequelize} from "../index";

import {createUsers} from "./createUsers";
import {createMarkets} from "./createMarkets";

async function seedDatabase() {
    await sequelize.sync({ force: true });

    const users = await createUsers();
    console.log(JSON.stringify(users, null, 2));

    const markets = await createMarkets();
    console.log(JSON.stringify(markets, null, 2));

    console.log('Database seeded!');
    await sequelize.close();
}

seedDatabase().catch((err) => {
    console.error('Seeding failed:', err);
    sequelize.close();
});
