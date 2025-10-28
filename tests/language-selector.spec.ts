import { test, expect } from '@playwright/test';

test.describe('Language Selector', () => {
  test('should display the language selector button', async ({ page }) => {
    await page.goto('/');

    // Find the language selector button in header
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await expect(languageButton).toBeVisible();
  });

  test('should show current language flag and label', async ({ page }) => {
    await page.goto('/');

    // Check that the language selector shows a flag image
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    const flag = languageButton.locator('img');
    await expect(flag).toBeVisible();
  });

  test('should open language dropdown when clicked', async ({ page }) => {
    await page.goto('/');

    // Click the language selector button in header
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await languageButton.click();

    // Wait for dropdown to appear
    await page.waitForTimeout(300);

    // Check if dropdown is visible (look for language options)
    const dropdown = page.locator('.language-selector__dropdown');
    await expect(dropdown).toBeVisible();
  });

  test('should display all available languages in dropdown', async ({ page }) => {
    await page.goto('/');

    // Open language selector
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await languageButton.click();

    // Wait for dropdown
    await page.waitForTimeout(300);

    // Check for language options in the dropdown
    const dropdown = page.locator('.language-selector__dropdown');
    const languages = ['English', 'Deutsch', 'Français', 'Español'];

    for (const language of languages) {
      const option = dropdown.getByText(language, { exact: true });
      await expect(option).toBeVisible();
    }
  });

  test('should switch language when option is selected', async ({ page }) => {
    await page.goto('/en');

    // Get current URL to verify change
    const initialUrl = page.url();

    // Open language selector
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await languageButton.click();

    // Wait for dropdown to be visible
    const dropdown = page.locator('.language-selector__dropdown');
    await expect(dropdown).toBeVisible();

    // Click on Spanish option in dropdown
    const spanishOption = dropdown.getByText('Español', { exact: true });
    await spanishOption.click();

    // Wait for URL to change by checking it differs from initial
    await page.waitForFunction(
      (oldUrl) => window.location.href !== oldUrl && window.location.href.includes('/es'),
      initialUrl,
      { timeout: 10000 }
    );

    // Verify URL changed to Spanish
    expect(page.url()).toContain('/es');
  });

  test('should close dropdown after selecting a language', async ({ page }) => {
    await page.goto('/');

    // Open language selector
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await languageButton.click();

    // Wait for dropdown
    await page.waitForTimeout(300);

    // Select first available language option
    const firstOption = page.locator('.language-selector__dropdown-item').first();
    await firstOption.click();

    // Wait a bit for the transition
    await page.waitForTimeout(500);

    // Dropdown should be hidden after selection
    const dropdown = page.locator('.language-selector__dropdown');
    await expect(dropdown).not.toBeVisible();
  });

  test('should show flag icons for each language option', async ({ page }) => {
    await page.goto('/');

    // Open language selector
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await languageButton.click();

    // Wait for dropdown
    await page.waitForTimeout(300);

    // Check that each language option has a flag image
    const languageOptions = page.locator('.language-selector__dropdown-item');
    const count = await languageOptions.count();

    expect(count).toBe(4); // English, Deutsch, Français, Español

    for (let i = 0; i < count; i++) {
      const option = languageOptions.nth(i);
      const flag = option.locator('img');
      await expect(flag).toBeVisible();
    }
  });

  test('should maintain page context when switching languages', async ({ page }) => {
    await page.goto('/en');

    // Open language selector
    const languageButton = page.locator('header').getByRole('button', { name: 'Select language' });
    await languageButton.scrollIntoViewIfNeeded();
    await languageButton.click();

    // Wait for dropdown
    await page.waitForTimeout(300);

    // Switch to French
    const dropdown = page.locator('.language-selector__dropdown');
    const frenchOption = dropdown.getByText('Français', { exact: true });
    await frenchOption.click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Should be on French version of the same page
    expect(page.url()).toContain('/fr');

    // Page should still be loaded with content
    const bodyContent = page.locator('.body-content, section');
    await expect(bodyContent.first()).toBeVisible();
  });
});
