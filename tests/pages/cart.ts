import { expect, type Locator, type Page } from '@playwright/test';

export async function assertProduct(page: Page, header: string){
    const productHeader = page.getByRole('heading', {name: header});
    await expect(productHeader).toBeVisible();
}

export async function getSubtotal(page: Page){
    const subtoatlWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subtotal = await subtoatlWrapper.textContent();
    return Number(subtotal?.substring(1));
}