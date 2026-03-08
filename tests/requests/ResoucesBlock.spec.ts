import { test } from '@playwright/test';

test('Resource blocking', async ({ page }) => {
    await page.route('**/*', (route) =>{
        if (route.request().resourceType() === 'image') {
            return route.abort();
        } 
        return route.continue()
    })
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
})