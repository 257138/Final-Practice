import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productList = page.locator('[data-test="inventory-item"]');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async getProductCount() {
        return this.productList.count();
    }

    async addProductToCart(name: string) {
        const nameProduct = this.productList.filter({ hasText: `${name}` });
        await nameProduct.getByRole('button', { name: 'Add to cart' }).click();
    }
}