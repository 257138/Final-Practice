import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory @regression', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const login = new LoginPage(page);
        await login.login();
    });

    test('Trang san pham co dung 6 san pham @smoke', async ({ page }) => {
        const inventory = new InventoryPage(page);
        expect(await inventory.getProductCount()).toBe(6);
    });

    test('Them 2 san pham vao gio, cart badge se hien 2 @regression', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.addProductToCart('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    });

    test('Mo gio hang, List co 2 san pham @regression', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.addProductToCart('Sauce Labs Bike Light');
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.locator('[data-test="cart-item"]')).toHaveCount(2);
    });

    // Bug #67 — sort gia cao den thap bi sai thu tu, dang cho dev fix
    test.fixme('San pham duoc sort dung thu tu gia cao den thap @regression', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
        const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
        const nums = prices.map(p => parseFloat(p.replace('$', '')));
        expect(nums).toEqual([...nums].sort((a, b) => b - a));
    });

});