import { test, expect } from '@playwright/test';

test.describe('Creators Page', () => {
  test('should load the creators page with all sections', async ({ page }) => {
    await page.goto('/en/creators');

    // Check hero section
    await expect(
      page.getByRole('heading', { name: 'Start earning doing what you love' })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Join Huerray's creator community and turn your passion into profit"
      )
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Get started' })).toBeVisible();

    // Check that creator avatars are visible
    const avatars = page.getByAlt(/Creator \d+/);
    await expect(avatars.first()).toBeVisible();

    // Check benefits section
    await expect(
      page.getByRole('heading', { name: 'Why creators love Huerray' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Stay authentic' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Collaborate with top brands' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Monetize your influence' })
    ).toBeVisible();

    // Check FAQ section
    await expect(page.getByRole('heading', { name: 'FAQs' })).toBeVisible();
    await expect(
      page.getByRole('button', {
        name: 'How do I get started as a creator?',
      })
    ).toBeVisible();
  });

  test('should expand and collapse FAQ items', async ({ page }) => {
    await page.goto('/en/creators');

    // Find and click the first FAQ question
    const faqButton = page.getByRole('button', {
      name: /How do I get started as a creator?/,
    });
    await faqButton.click();

    // Check that the answer is visible
    await expect(
      page.getByText(
        'Simply sign up, complete your profile, and start browsing available brand collaborations'
      )
    ).toBeVisible();

    // Check that the icon changed to minus
    await expect(faqButton.getByText('−')).toBeVisible();

    // Click again to collapse
    await faqButton.click();

    // Check that the answer is hidden
    await expect(
      page.getByText(
        'Simply sign up, complete your profile, and start browsing available brand collaborations'
      )
    ).not.toBeVisible();

    // Check that the icon changed back to plus
    await expect(faqButton.getByText('+')).toBeVisible();
  });

  test('should switch languages correctly', async ({ page }) => {
    await page.goto('/en/creators');

    // Open language selector
    await page
      .getByRole('banner')
      .getByRole('button', { name: 'Select language' })
      .click();

    // Switch to German
    await page.getByRole('option', { name: 'Deutsch' }).click();

    // Check that content is in German
    await expect(page).toHaveURL(/\/de\/creators/);
    await expect(
      page.getByRole('heading', {
        name: 'Beginnen Sie zu verdienen, indem Sie tun, was Sie lieben',
      })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Warum Creators Huerray lieben' })
    ).toBeVisible();

    // Open language selector again
    await page
      .getByRole('banner')
      .getByRole('button', { name: 'Select language' })
      .click();

    // Switch to French
    await page.getByRole('option', { name: 'Français' }).click();

    // Check that content is in French
    await expect(page).toHaveURL(/\/fr\/creators/);
    await expect(
      page.getByRole('heading', {
        name: 'Commencez à gagner en faisant ce que vous aimez',
      })
    ).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/en/creators');

    // Check that header navigation is visible
    await expect(
      page.getByRole('link', { name: 'For Creators' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'For Brands' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible();
  });

  test('should display platform logos', async ({ page }) => {
    await page.goto('/en/creators');

    // Check that platform logos section is visible
    await expect(
      page.getByRole('heading', { name: 'Available to be used on' })
    ).toBeVisible();

    // Check for some platform logos
    await expect(page.getByAlt('Instagram')).toBeVisible();
    await expect(page.getByAlt('TikTok')).toBeVisible();
    await expect(page.getByAlt('YouTube')).toBeVisible();
  });

  test('should have footer with all sections', async ({ page }) => {
    await page.goto('/en/creators');

    // Check footer heading
    await expect(
      page.getByRole('heading', { name: 'Ready for your first UGC video?' })
    ).toBeVisible();

    // Check footer links sections
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'FAQ' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Platform' })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/creators');

    // Check that hero content is visible on mobile
    await expect(
      page.getByRole('heading', { name: 'Start earning doing what you love' })
    ).toBeVisible();

    // Check that benefits are stacked on mobile
    const benefitsGrid = page.locator('.creators-benefits__grid');
    await expect(benefitsGrid).toBeVisible();
  });
});
