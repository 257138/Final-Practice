import { test, expect } from '@playwright/test';
import { getLimitCases } from '../../data/productData';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('Test API', () => {

    let testCount = 0;

    test.beforeEach(() => {
        testCount++;
    });

    test.afterAll(() => {
        console.log(`Tong so API tests da chay: ${testCount}`);
    });

    test('GET /products — tra ve array co du fields', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/products`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('title');
        expect(body[0]).toHaveProperty('price');
        expect(body[0]).toHaveProperty('image');
    });

    test('GET /products/1 — tra ve dung san pham', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/products/1`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(1);
        expect(body.price).toBeGreaterThan(0);
    });

    // test('GET /products/999 — tra ve 400', async ({ request }) => {
    //     const response = await request.get(`${BASE_URL}/products/999`);
    //     expect(response.status()).toBe(400);
    // });

    test('POST /products — tao san pham moi', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/products`, {
            data: {
                title: 'testing',
                price: 99.99,
                category: 'electronics',
                image: 'https://fakestoreapi.com/img/test.jpg',
            }
        });
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.title).toContain('testing');
    });

    getLimitCases.forEach(tc => {
        test(`GET /products?limit=${tc.limit} — tra ve ${tc.expectedLength} san pham`, async ({ request }) => {
            const response = await request.get(`${BASE_URL}/products?limit=${tc.limit}`); // ← sửa typo
            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body).toHaveLength(tc.expectedLength);
        });
    });


});