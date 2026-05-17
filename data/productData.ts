// GET /products test cases
export const getProductCases = [
    {
        moTa: 'GET tat ca san pham',
        endpoint: '/products',
        expectedStatus: 200,
        expectedMinLength: 1,
    },
    {
        moTa: 'GET san pham theo id hop le',
        endpoint: '/products/1',
        expectedStatus: 200,
        expectedId: 1,
    },
    {
        moTa: 'GET san pham khong ton tai',
        endpoint: '/products/999',
        expectedStatus: 404,
        expectedId: undefined,
    },
];

// GET /products?limit=N test cases
export const getLimitCases = [
    { moTa: 'limit = 1', limit: 1, expectedLength: 1 },
    { moTa: 'limit = 5', limit: 5, expectedLength: 5 },
    { moTa: 'limit = 10', limit: 10, expectedLength: 10 },
];

// POST /products test cases
export const createProductCases = [
    {
        moTa: 'Tao san pham moi hop le',
        payload: {
            title: 'Test Product 1',
            price: 99.99,
            category: 'electronics',
            image: 'https://fakestoreapi.com/img/test.jpg',
        },
        expectedStatus: 200,
    },
    {
        moTa: 'Tao san pham voi price = 0',
        payload: {
            title: 'Free Product',
            price: 0,
            category: 'jewelery',
            image: 'https://fakestoreapi.com/img/test.jpg',
        },
        expectedStatus: 200,
    },
];