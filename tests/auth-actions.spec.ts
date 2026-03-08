import { test, expect } from 'playwright/test';

test ('Authentication actions', async({ page }) => {
    await page.goto('/');
    await page.getByRole('button').first().click();
    const welcomeMessage = await page.getByText('Welcome!');
    await expect(welcomeMessage).toBeVisible();
})