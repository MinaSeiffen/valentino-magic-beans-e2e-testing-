import { expect, type Locator, type Page } from '@playwright/test';

export const testValues = {
    firstName: 'Valentino',
    lastName: 'Magic',
    email: 'a5E5o@example.com',
    address: '123 Main St',
    city: 'New York',
    zipCode: '12345',
    country: 'United States',
    payment: {
        cardName: 'Valentino Magic',
        cardNumber: '4242 4242 4242 4242',
        cardExpiry: '12/24',
        cardCVC: '123',
    }
}

export async function assertContactInformation (page: Page) {
    await page.locator('[data-test-id="checkout-firstname-input"]').fill(testValues.firstName);
    await page.locator('[data-test-id="checkout-lastname-input"]').fill(testValues.lastName);
    await page.locator('[data-test-id="checkout-email-input"]').fill(testValues.email);
}

export async function assertShoppingAddress (page: Page) {
    await page.locator('[data-test-id="checkout-address-input"]').fill(testValues.address);
    await page.locator('[data-test-id="checkout-city-input"]').fill(testValues.city);
    await page.locator('[data-test-id="checkout-zipcode-input"]').fill(testValues.zipCode);
    await page.locator('[data-test-id="checkout-country-input"]').fill(testValues.country);
}

export async function assertPaymentInformation (page: Page) {
    await page.locator('[data-test-id="checkout-cardname-input"]').fill(testValues.payment.cardName);
    await page.locator('[data-test-id="checkout-cardnumber-input"]').fill(testValues.payment.cardNumber);
    await page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(testValues.payment.cardExpiry);
    await page.locator('[data-test-id="checkout-cardcvc-input"]').fill(testValues.payment.cardCVC);
}

export async function placeOrder (page: Page) {
    await page.locator('[data-test-id="place-order-button"]').click();
}