import { test, expect } from '@playwright/test';

test.describe('Keycloak Authentication Flow', () => {
    test('should redirect to Keycloak login and back', async ({ page }) => {
        // 1. Go to Angular App (it will auto-redirect toward Keycloak)
        await page.goto('/');

        // 2. Authenticate in Keycloak
        await page.waitForURL(/.*protocol\/openid-connect\/auth.*/, { timeout: 15000 });

        await page.fill('#username', 'testuser');
        await page.fill('#password', 'test');
        await page.click('#kc-login');

        // 3. Verify Redirect back to App (flexible trailing slash)
        await page.waitForURL(/\/localhost:4200\/?/);
        await expect(page.getByText('Hallo, testuser!')).toBeVisible({ timeout: 15000 });

        // 4. Test Backend Call
        await page.click('text=Geschützten Endpoint aufrufen');
        await expect(page.getByText('Backend Antwort:')).toBeVisible();
        await expect(page.locator('pre')).toContainText('"message": "Hallo testuser!"');

        // 5. Test Logout (should redirect toward Keycloak or back to base URL)
        await page.click('text=Logout');
        await page.waitForURL(/.*(localhost:4200|protocol\/openid-connect\/auth).*/);
    });
});
