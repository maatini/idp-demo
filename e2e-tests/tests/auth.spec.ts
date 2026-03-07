import { test, expect } from '@playwright/test';

test.describe('Keycloak Authentication Flow', () => {
    test('should redirect to Keycloak login and back', async ({ page }) => {
        // 1. Go to Angular App
        await page.goto('/');

        // 2. Click Login Button
        await expect(page.getByText('Login mit Keycloak')).toBeVisible();
        await page.click('text=Login mit Keycloak');

        // 3. Authenticate in Keycloak
        // Note: Keycloak login page selectors might vary, but usually they are "username" and "password" IDs
        await page.waitForURL(/.*8080\/realms\/demo-realm\/protocol\/openid-connect\/auth.*/);

        await page.fill('#username', 'testuser');
        await page.fill('#password', 'test');
        await page.click('#kc-login');

        // 4. Verify Redirect back to App (flexible trailing slash)
        await page.waitForURL(/\/localhost:4200\/?/);
        await expect(page.getByText('Hallo, testuser!')).toBeVisible({ timeout: 10000 });

        // 5. Test Backend Call
        await page.click('text=Geschützten Endpoint aufrufen');
        await expect(page.getByText('Backend Antwort:')).toBeVisible();
        await expect(page.getByText('"message": "Hallo testuser!"')).toBeVisible();

        // 6. Test Logout
        await page.click('text=Logout');
        await expect(page.getByText('Login mit Keycloak')).toBeVisible();
    });
});
