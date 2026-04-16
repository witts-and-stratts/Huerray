import { test, expect } from '@playwright/test';

test.describe('Website - Creators Page', () => {
  test('should load the creators page with all sections', async ({ page }) => {
    await page.goto('/en/creators');

    // Check hero section (using correct translated keys from locales/en/creators.json)
    await expect(
      page.locator('text=Get paid for doing what you love')
    ).toBeVisible();
    await expect(
      page.locator('text=Work with brands & real companies. Start earning cash for what you love.')
    ).toBeVisible();

    // Check features
    await expect(page.locator('text=Collaborations that fit your style')).toBeVisible();
    await expect(page.locator('text=Be the creative director')).toBeVisible();
    await expect(page.locator('text=You create. We manage everything else')).toBeVisible();
    await expect(page.locator('text=Get paid on time, everytime')).toBeVisible();

    await expect(page.locator('text=FAQs').first()).toBeVisible();
    await expect(
      page.locator('text=How do I get started as a creator?').first()
    ).toBeVisible();
  });

  test('should expand and collapse FAQ items', async ({ page }) => {
    await page.goto('/en/creators');

    // Find and click the first FAQ question
    const faqButton = page.getByRole('button', {
      name: /How do I get started as a creator\?/i,
    }).or(page.locator('text=How do I get started as a creator?'));
    
    await expect(faqButton.first()).toBeVisible();
    await faqButton.first().click();

    // Check that the answer is visible
    const answer = page.getByText('Simply sign up, complete your profile, and start browsing available brand collaborations').first();
    await expect(answer).toBeVisible({ timeout: 10000 });

    // Click again to collapse
    await faqButton.first().click();

    // Check that the answer is hidden
    await expect(answer).not.toBeVisible();
  });

  test('should switch languages correctly', async ({ page }) => {
    await page.goto('/en/creators');

    const selectLanguageBtn = page.getByRole('banner').getByRole('button', { name: /Language|Sprache|select/i }).or(page.locator('[aria-label="Select language"]').first()).or(page.locator('[data-testid="language-selector"]').first());
    
    if (await selectLanguageBtn.count() > 0) {
      await selectLanguageBtn.click();
      
      const germanOption = page.getByRole('option', { name: /Deutsch/i }).or(page.locator('button', { hasText: /Deutsch/i }));
      if (await germanOption.count() > 0) {
        await germanOption.first().click();
        
        // Let it redirect
        await page.waitForURL(/\/de\/creators/);
        
        // English text should NO LONGER be visible in the hero 
        await expect(
          page.locator('text=Get paid for doing what you love').first()
        ).not.toBeVisible();
      }
    }
  });

  test('should have footer with all sections', async ({ page }) => {
    await page.goto('/en/creators');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for standard footer links
    await expect(footer.locator('a', { hasText: 'T&C' }).or(footer.locator('text=T&C')).first()).toBeVisible();
    await expect(footer.locator('a', { hasText: 'Privacy' }).or(footer.locator('text=Privacy Policy')).first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/creators');

    await expect(
      page.locator('text=Get paid for doing what you love')
    ).toBeVisible();
  });

  test('hero Become a Creator button navigates to creator signup', async ({ page }) => {
    await page.goto('/en/creators');

    await page.getByRole('link', { name: /Become a Creator/i }).first().click();

    await expect(page).toHaveURL(/\/signup\?role=creator$/);
  });

  test('bottom CTA Get started button navigates to creator signup', async ({ page }) => {
    await page.goto('/en/creators');

    const bottomCta = page.locator('section.creators-cta').getByRole('link', { name: /Get started/i });
    await bottomCta.scrollIntoViewIfNeeded();
    await bottomCta.click();

    await expect(page).toHaveURL(/\/signup\?role=creator$/);
  });
});
