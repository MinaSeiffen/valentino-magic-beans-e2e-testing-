import {test, expect} from '@playwright/test';
import * as products from '../pages/products';
import * as cart from '../pages/cart';

test('Item is added from shop page to Cart', async ({page}) => {
    await page.goto('/products');

    const addProductToCart = await products.addProductToCart(page, 1);
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cart.assertProduct(page, addProductToCart.name!);
    const subtotal = await cart.getSubtotal(page);
    expect(subtotal).toBe(addProductToCart.price);
});