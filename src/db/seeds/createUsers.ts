import {createUser} from "../../services/userService";

export const createUsers = async () => {
    const users = [];
    const testUser1 = await createUser({
        email: 'test@test.com',
        password: 'password123',
        lastName: 'Test',
        firstName: 'Test'
    });
    users.push(testUser1);

    const testUser2 = await createUser({
        email: 'test@test2.com',
        password: 'password123',
        lastName: 'Test2',
        firstName: 'Test2'
    });
    users.push(testUser2);

    const testUser3 = await createUser({
        email: 'test@test3.com',
        password: 'password123',
        lastName: 'Test3',
        firstName: 'Test3'
    });
    users.push(testUser3);

    const testUser4 = await createUser({
        email: 'test@test4.com',
        password: 'password123',
        lastName: 'Test4',
        firstName: 'Test4'
    });
    users.push(testUser4);

    const testUser5 = await createUser({
        email: 'test@test5.com',
        password: 'password123',
        lastName: 'Test5',
        firstName: 'Test5'
    });
    users.push(testUser5);

    return users;
}
