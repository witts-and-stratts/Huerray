import { expect, test, type Page } from '@playwright/test';

async function mockCalEmbed(page: Page) {
  await page.route(
    /https:\/\/(app\.cal\.com|www\.cal\.eu)\/embed\/embed\.js/,
    async (route) => {
      await route.fulfill({
        contentType: 'application/javascript',
        body: `
        (() => {
          function findCalTrigger(target) {
            for (let element = target; element; element = element.parentElement) {
              if (element.dataset && element.dataset.calLink) {
                return element;
              }
            }

            return null;
          }

          function openCalModal(trigger) {
            const calLink = trigger.dataset.calLink;
            const namespace = trigger.dataset.calNamespace || '';
            const origin = trigger.dataset.calOrigin || 'https://app.cal.com';
            const popup = document.createElement('cal-modal-box');
            const frame = document.createElement('iframe');

            popup.setAttribute('state', 'loaded');
            popup.setAttribute('uid', 'playwright-cal-popup');
            Object.assign(popup.style, {
              position: 'fixed',
              inset: '0',
              zIndex: '999999999999',
              display: 'block',
              visibility: 'visible'
            });

            frame.className = 'cal-embed';
            frame.name = 'cal-embed=' + namespace;
            frame.title = 'Book a call';
            frame.src = origin + '/' + calLink + '/embed?embed=' + encodeURIComponent(namespace);

            popup.appendChild(frame);
            document.body.appendChild(popup);
          }

          window.Cal = window.Cal || function () {};
          window.Cal.ns = window.Cal.ns || {};
          window.Cal.ns['enterprise-booking'] = window.Cal.ns['enterprise-booking'] || function () {};

          document.addEventListener('click', (event) => {
            const trigger = findCalTrigger(event.target);

            if (trigger) {
              openCalModal(trigger);
            }
          });
        })();
      `,
      });
    }
  );
}

test.describe('Website - Pricing Page', () => {
  test('pricing Create a brief buttons navigate to brand signup', async ({ page }) => {
    await page.goto('/en/pricing');

    const createBriefLinks = page.getByRole('link', { name: /Create a brief/i });
    await expect(createBriefLinks).toHaveCount(4);

    for (let index = 0; index < await createBriefLinks.count(); index++) {
      await page.goto('/en/pricing');
      await createBriefLinks.nth(index).scrollIntoViewIfNeeded();
      await createBriefLinks.nth(index).click();
      await expect(page).toHaveURL(/\/signup\?role=brand$/);
    }
  });

  test('enterprise Book A Call button opens the Cal booking popup', async ({ page }) => {
    await mockCalEmbed(page);
    await page.goto('/en/pricing');

    const bookCallButton = page.getByRole('button', { name: /Book A Call/i });
    await expect(bookCallButton).toBeVisible();
    await expect(bookCallButton).toHaveAttribute('data-cal-link', 'huerray/book-a-free-call');
    await expect(bookCallButton).toHaveAttribute('data-cal-namespace', 'enterprise-booking');
    await expect(bookCallButton).toHaveAttribute('data-cal-origin', 'https://www.cal.eu');

    await bookCallButton.scrollIntoViewIfNeeded();
    await bookCallButton.click();

    const calPopup = page.locator('cal-modal-box').last();
    await expect(calPopup).toBeVisible({ timeout: 15000 });
    await expect(calPopup).toHaveAttribute('uid', /.+/);

    const calFrame = calPopup.locator('iframe.cal-embed');
    await expect(calFrame).toBeAttached({ timeout: 15000 });
    await expect(calFrame).toHaveAttribute('title', /Book a call/i);
    await expect(calFrame).toHaveAttribute('name', 'cal-embed=enterprise-booking');
    await expect(calFrame).toHaveAttribute(
      'src',
      /https:\/\/www\.cal\.eu\/huerray\/book-a-free-call\/embed\?.*embed=enterprise-booking/
    );
  });
});
