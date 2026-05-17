export const loginCases = [
    {
        moTa: 'login thanh cong voi valid credentials',
        username: process.env.TEST_USERNAME as string,
        password: process.env.TEST_PASSWORD as string,
        expectedURL: /inventory/,
        expectedError: null,
    },
    {
        moTa: 'login that bai voi sai password',
        username: process.env.TEST_USERNAME as string,
        password: 'wrong_password',
        expectedURL: null,
        expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        moTa: 'login that bai voi sai username',
        username: 'wrong_user',
        password: process.env.TEST_PASSWORD as string,
        expectedURL: null,
        expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        moTa: 'login that bai khi de trong ca 2 o',
        username: '',
        password: '',
        expectedURL: null,
        expectedError: 'Epic sadface: Username is required',
    },
    {
        moTa: 'login that bai khi de trong password',
        username: process.env.TEST_USERNAME as string,
        password: '',
        expectedURL: null,
        expectedError: 'Epic sadface: Password is required',
    },
];