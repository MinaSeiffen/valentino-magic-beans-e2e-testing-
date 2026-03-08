import { expect, type Locator, type Page } from '@playwright/test';

export const SignupValues = {
    firstName: 'Valentino',
    lastName: 'Magic',
    password: 'Password123'
}

export async function assertSignupInformation (page: Page, email: string) {
    await page.locator('[data-test-id="signup-firstname-input"]').fill(SignupValues.firstName);
    await page.locator('[data-test-id="signup-lastname-input"]').fill(SignupValues.lastName);
    await page.locator('[data-test-id="signup-email-input"]').fill(email);
    await page.locator('[data-test-id="signup-password-input"]').fill(SignupValues.password);
    await page.locator('[data-test-id="signup-submit-button"]').click();
}

export async function assertSignupConfirmation (page: Page, code: string) {
    const codeLocator = page.locator('input[inputmode="numeric"]');
    await codeLocator.fill(code);
    await page.locator('[data-test-id="confirm-signup-submit-button"]').click();
}