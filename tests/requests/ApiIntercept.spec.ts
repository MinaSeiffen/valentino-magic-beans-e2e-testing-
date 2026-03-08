import { test, expect } from "@playwright/test"

test("Intercepting Api request of products page", async ({ page }) => {
    const someProducts = {
        success: true,
        source: "dynamodb",
        data: [
            {
                id: 'o',
                name: "Beans of Magic ",
                price: 100
            },
            {
                id: '1',
                name: "Magic Beans",
                price: 22.30
            }
        ]
    }

    await page.route('https://api.valentinos-magic-beans.click/products', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(someProducts)
        })
    })

    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-test-id="product-card-add-to-cart-button-o"]').click();
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    const firstProductName = await page.getByRole('heading', {
        name: someProducts.data[0].name
    });

    console.log(firstProductName);
    

    await expect(firstProductName).toBeVisible();
})  