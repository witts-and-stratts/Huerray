import { test, expect } from '@playwright/test';

test.describe('Campaign Creation Flow', () => {
  test('should navigate through the multi-step form', async ({ page }) => {
    // Navigate to the campaign creation page
    // We use /en/brand/campaigns/new
    await page.goto('http://localhost:3003/en/brand/campaigns/new');
    
    // Check if we are on Step 1
    await expect(page.getByText('Basics', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Campaign Name')).toBeVisible();

    // Fill Step 1
    await page.getByLabel('Campaign Name').fill('Test Campaign');
    await page.getByLabel('Description').fill('This is a test campaign description.');
    
    // Select a category
    await page.getByPlaceholder('Select category').click();
    await page.getByLabel('Fashion').click();

    await page.getByLabel('Product Link').fill('https://example.com/product');

    // Go to Step 2
    await page.getByRole('button', { name: /next/i }).click();

    // Check if we are on Step 2
    await expect(page.getByText('Requirements', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Creators Needed')).toBeVisible();

    // Fill Step 2
    await page.getByLabel('Creators Needed').fill('5');
    await page.getByLabel('Videos per Creator').fill('2');

    // Go to Step 3
    await page.getByRole('button', { name: /next/i }).click();

    // Check if we are on Step 3
    await expect(page.getByText('Review', { exact: true })).toBeVisible();
    await expect(page.getByText('Review Details')).toBeVisible();
    
    // Verify review details
    await expect(page.getByText('Test Campaign')).toBeVisible();
    await expect(page.getByText('Fashion')).toBeVisible();
    await expect(page.getByText('5')).toBeVisible();

    // Check launch button
    await expect(page.getByRole('button', { name: /launch campaign/i })).toBeVisible();
  });
});
