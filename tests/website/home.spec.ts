import { test, expect } from '@playwright/test';

test.describe('Website - Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check that the page has loaded
    await expect(page).toHaveTitle(/huerray/i);
  });

  test('should display the header', async ({ page }) => {
    await page.goto('/');

    // Check for header navigation
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
  });

  test('should display the hero section', async ({ page }) => {
    await page.goto('/');

    // Check for body content
    const bodyContent = page.locator('.body-content, section');
    await expect(bodyContent.first()).toBeVisible();
  });

  test('should have a footer', async ({ page }) => {
    await page.goto('/');

    // Check for footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test('hero get started button navigates to signup', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Get started/i }).click();

    await expect(page).toHaveURL(/\/signup(?:$|\?)/);
  });

  test('creator CTA button navigates to creator signup', async ({ page }) => {
    await page.goto('/');

    const creatorCta = page.getByRole('link', { name: /Join for Free/i });
    await creatorCta.scrollIntoViewIfNeeded();
    await creatorCta.click();

    await expect(page).toHaveURL(/\/signup\?role=creator$/);
  });

  test('desktop header navigation links go to their website destinations', async ({ page }) => {
    await page.goto('/');

    const destinations = [
      { name: /For Creators/i, path: /\/en\/creators$/ },
      { name: /For Brands/i, path: /\/en\/brands$/ },
      { name: /Pricing/i, path: /\/en\/pricing$/ },
    ];

    for (const destination of destinations) {
      await page.goto('/');
      await page.locator('header').first().getByRole('link', { name: destination.name }).click();
      await expect(page).toHaveURL(destination.path);
    }
  });

  test('mobile menu opens and its navigation links go to their destinations', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('button', { name: /Toggle menu/i }).click();

    const mobileNav = page.locator('.header__mobile-nav');
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole('link', { name: /For Creators/i }).click();
    await expect(page).toHaveURL(/\/en\/creators$/);
  });

  test('user menu opens login and signup destinations', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /User menu/i }).click();
    await page.getByRole('link', { name: /^Login$/i }).click();
    await expect(page).toHaveURL(/\/en\/login$/);

    await page.goto('/');
    await page.getByRole('button', { name: /User menu/i }).click();
    await page.getByRole('link', { name: /^Signup$/i }).click();
    await expect(page).toHaveURL(/\/en\/signup$/);
  });
});
