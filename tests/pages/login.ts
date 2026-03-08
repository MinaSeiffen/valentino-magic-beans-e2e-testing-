import { expect, type Locator, type Page } from '@playwright/test';

export async function assertLoginInformation (page: Page, email: string, password: string) {
    await page.locator('[data-test-id="login-email-input"]').fill(email);
    await page.locator('[data-test-id="login-password-input"]').fill(password);
    await page.locator('[data-test-id="login-submit-button"]').click();
}

export async function verifyLogin(page: Page) {
    await expect(page).toHaveURL('/');
}