import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginCases } from '../../data/loginData';

test.describe('Login — Data Driven @regression', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    loginCases.forEach(tc => {
        test(tc.moTa + (tc.expectedURL ? ' @smoke' : ' @regression'), async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.loginWith(tc.username, tc.password);

            if (tc.expectedURL) {
                await expect(page).toHaveURL(tc.expectedURL);
            } else {
                const errorMsg = await loginPage.getErrorMessage();
                expect(errorMsg).toContain(tc.expectedError);
            }
        });
    });

    // Bug #45 — locked_out_user redirect sai trang, dev chua fix
    test.skip('login voi locked_out_user — bi khoa tai khoan @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginWith('locked_out_user', process.env.TEST_PASSWORD as string);
        await expect(page).toHaveURL(/inventory/);
    });

});