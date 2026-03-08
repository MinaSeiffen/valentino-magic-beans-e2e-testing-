import { test } from '@playwright/test';

test("printing all requesets of products page", async ({ page }) => {
    page.on('request', request => console.log(request.method(), request.url()));
    
    await page.goto('/products');
})

test("printing all requesets of products page -- complete", async ({ page }) => {
    page.on('request', request => console.log(request.method(), request.url()));
    
    await page.goto('/products');

    await page.waitForLoadState('networkidle');
})