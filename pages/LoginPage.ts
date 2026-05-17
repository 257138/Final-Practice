import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly errorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.errorMsg = page.locator('[data-test="error"]');
    }

    // Dùng trong beforeEach — login nhanh không cần tham số
    async login() {
        await this.usernameInput.fill(process.env.TEST_USERNAME as string);
        await this.passwordInput.fill(process.env.TEST_PASSWORD as string);
        await this.loginBtn.click();
    }

    // Dùng trong data-driven — login với bất kỳ data nào
    async loginWith(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async getErrorMessage() {
        return this.errorMsg.textContent();
    }
}