import { test, expect } from '@playwright/test';
import * as products from '../pages/products';
import * as cart from '../pages/cart';
import * as checkout from '../pages/check-out';
import * as contact from '../pages/contact';

test('Item is added from shop page to Cart', async ({page}) => {
    await page.goto('/products');

    const addProductToCart = await products.addProductToCart(page, 1);
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cart.assertProduct(page, addProductToCart.name!);
    const subtotal = await cart.getSubtotal(page);
    expect(subtotal).toBe(addProductToCart.price);
});

test('Complete the workflow', async ({page}) => {
    await page.goto('/products');

    const addProductToCart = await products.addProductToCart(page, 1);
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cart.assertProduct(page, addProductToCart.name!);
    const subtotal = await cart.getSubtotal(page);
    expect(subtotal).toBe(addProductToCart.price);

    await page.getByRole('button', {name: 'Proceed to Checkout'}).click();
    await checkout.assertContactInformation(page);
    await checkout.assertShoppingAddress(page);
    await checkout.assertPaymentInformation(page);
    await checkout.placeOrder(page);

    // getting order id
    const orderIdWrapper = await page.getByText('Your Order Id is:').locator('..');
    const orderId = await orderIdWrapper.getByRole('paragraph').nth(1).textContent();

    await page.getByRole('button', {name: 'Track Your Order'}).click();
    
    await contact.fillOrderIdAndEmail(page, orderId!, checkout.testValues.email);
    await contact.submitContactForm(page);

    // getting the product name in tracking order page 
    const firstName = page.getByText(addProductToCart.name!);
    await expect(firstName).toBeVisible();
});

test('Complete the workflow - with steps', async ({page}) => {
    await page.goto('/products');
    
    let orderId : string | null;
    let addProductToCart: Awaited<ReturnType<typeof products.addProductToCart>> = {} as any;

    await test.step('add product to cart', async () => {
        addProductToCart = await products.addProductToCart(page, 1);
    })

    await test.step('go to checkout page', async () => {
        await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        await page.getByRole('button', {name: 'Proceed to Checkout'}).click();
    })

    await test.step('Complete Checkout information', async () => {
        await checkout.assertContactInformation(page);
        await checkout.assertShoppingAddress(page);
        await checkout.assertPaymentInformation(page);
        await checkout.placeOrder(page);
    })


    await test.step('get order id', async () => {
        const orderIdWrapper = await page.getByText('Your Order Id is:').locator('..');
        orderId = await orderIdWrapper.getByRole('paragraph').nth(1).textContent();
    })

    await test.step('go to contact page', async () => {
        await page.getByRole('button', {name: 'Track Your Order'}).click();
    })

    await test.step('fill order id and email', async () => {
        await contact.fillOrderIdAndEmail(page, orderId!, checkout.testValues.email);
        await contact.submitContactForm(page);
    })

    await test.step('get the product name in tracking order page ', async () => {
        const firstName = page.getByText(addProductToCart.name!);
        await expect(firstName).toBeVisible();
    })
});