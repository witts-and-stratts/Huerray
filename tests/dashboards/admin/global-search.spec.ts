import { expect, test } from '@playwright/test';

test.describe('Dashboards - Admin Global Search', () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await context.addCookies([
      {
        name: 'userData',
        value: JSON.stringify({
          id: 'admin-e2e',
          email: 'admin-e2e@test.huerray.de',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          emailVerified: true,
        }),
        domain: new URL(baseURL ?? 'http://localhost:3000').hostname,
        path: '/',
      },
    ]);

    await page.route('https://cdn.huerray.de/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'image/png',
        body: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
          'base64',
        ),
      });
    });

    await page.route('**/api/v1/**', async (route) => {
      const url = new URL(route.request().url());
      const path = url.pathname;

      if (path.endsWith('/brands/search')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'brand-1',
                company_name: 'Acme Brand Studio',
                category: 'Beauty',
                country: 'US',
                profile_photo: { asset: '/uploads/brands/acme-logo.png' },
              },
            ],
          },
        });
        return;
      }

      if (path.endsWith('/campaigns/search')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'campaign-1',
                campaign_name: 'Acme Launch Campaign',
                brand_name: 'Launch Client',
                campaign_status: 'running',
                category: 'Beauty',
                product_image: { asset: '/uploads/campaigns/acme-product.png' },
              },
            ],
          },
        });
        return;
      }

      if (path.endsWith('/cases')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'case-1',
                case_number: 'CASE-ACME-1',
                title: 'Escalated invoice support case',
                status: 'open',
                priority: 'high',
                related_entity_type: 'Payment',
              },
            ],
          },
        });
        return;
      }

      if (path.endsWith('/creators/search')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'creator-1',
                first_name: 'Avery',
                last_name: 'Creator',
                email: 'creator.acme@example.com',
                country: 'GB',
                profile_image: { asset: '/uploads/creators/avery.png' },
              },
            ],
          },
        });
        return;
      }

      if (path.endsWith('/gigs/search')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'gig-1',
                title: 'Acme Product Demo Gig',
                campaign_name: 'Demo Campaign',
                gig_status: 'running',
                campaign_id: 'campaign-1',
              },
            ],
          },
        });
        return;
      }

      if (path.endsWith('/invoices/search')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'invoice-1',
                invoice_number: 'INV-ACME-1',
                brand_name: 'Invoice Client',
                invoice_status: 'pending',
                total: { value: 2500 },
              },
            ],
          },
        });
        return;
      }

      if (path.endsWith('/payments/search')) {
        await route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: 'payment-1',
                creator_name: 'Acme Payment Batch',
                reference: 'PAY-ACME-1',
                payment_status: 'completed',
                total: { value: 700 },
              },
            ],
          },
        });
        return;
      }

      await route.fulfill({
        status: 200,
        json: { data: [] },
      });
    });
  });

  test('searches admin entities from the global search box and renders results', async ({ page }) => {
    await page.goto('/en/admin');

    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder(/Search campaigns, creators, gigs/i).fill('acme');

    await expect(page.getByRole('button', { name: /Avery Creator/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Acme Brand Studio/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Acme Launch Campaign/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Acme Product Demo Gig/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /INV-ACME-1/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Acme Payment Batch PAY-ACME-1/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /CASE-ACME-1/i })).toBeVisible();

    await expect(page.locator('[data-avatar-src*="acme-logo.png@webp"]')).toHaveAttribute('data-avatar-src', /cdn\.huerray\.de\/insecure\/.*\/plain\/.*acme-logo\.png@webp/);
    await expect(page.locator('[data-avatar-src*="acme-product.png@webp"]')).toHaveAttribute('data-avatar-src', /cdn\.huerray\.de\/insecure\/.*\/plain\/.*acme-product\.png@webp/);
    await expect(page.locator('[data-avatar-src*="avery.png@webp"]')).toHaveAttribute('data-avatar-src', /cdn\.huerray\.de\/insecure\/.*\/plain\/.*avery\.png@webp/);
  });
});
