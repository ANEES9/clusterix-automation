import { Locator } from '@playwright/test';

export class AssertionHelper {
  static async assertElementState(locator: Locator): Promise<void> {
    const elementName = await AssertionHelper.getElementName(locator);
    const isVisible = await locator.isVisible();
    const isEnabled = await locator.isEnabled();

    let assertionMessages:string[] = [];

    if (isVisible) {
      assertionMessages.push(`${elementName} is visible: Pass ✅`);
    } else {
      assertionMessages.push(`${elementName} is visible: Fail ❌`);
    }

    if (isEnabled) {
      assertionMessages.push(`${elementName} is enabled: Pass ✅` );
    } else {
      assertionMessages.push(`${elementName} is enabled: Fail ❌`);
    }

    console.log(assertionMessages.join(' | '));
  }

  static async clickWithAssertion(locator: Locator): Promise<void> {
    await AssertionHelper.performActionWithAssertion(locator, async () => {
      await locator.click();
      console.log(`Action: Click - Pass ✅`);
    });
  }

  static async typeWithAssertion(locator: Locator, text: string): Promise<void> {
    await AssertionHelper.performActionWithAssertion(locator, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.click();

      for (const char of text) {
        await locator.page().keyboard.press(char);
      }
      await locator.page().keyboard.press('Enter');
      await locator.page().locator('body').click();
      console.log(`Typed "${text}" successfully - Action complete ✅`);
    });
  }

  static async checkWithAssertion(locator: Locator): Promise<void> {
    await AssertionHelper.performActionWithAssertion(locator, async () => {
      await locator.check();
      console.log('Action: Check - Pass ✅');
    });
  }

  static async uncheckWithAssertion(locator: Locator): Promise<void> {
    await AssertionHelper.performActionWithAssertion(locator, async () => {
      await locator.uncheck();
      console.log('Action: Uncheck - Pass ✅');
    });
  }

  static async selectWithAssertion(locator: Locator, value: string | number): Promise<void> {
    await AssertionHelper.performActionWithAssertion(locator, async () => {
      await locator.click();

      // Enforce selector format explicitly
      const selector = `text="${value.toString()}"` as const;
      const option: Locator = locator.locator(selector);
      await option.click();

      console.log(`Action: Select "${value}" - Pass ✅`);
    });
  }

  static async hoverWithAssertion(locator: Locator): Promise<void> {
    await AssertionHelper.performActionWithAssertion(locator, async () => {
      await locator.hover();
      console.log('Action: Hover - Pass ✅');

      try {
        const tooltip = await locator.locator('[role="tooltip"], .tooltip, [data-tooltip]').first();
        if (await tooltip.isVisible()) {
          const tooltipText = await tooltip.textContent();
          console.log(`Tooltip Found: ${tooltipText?.trim()}`);
        } else {
          console.log('No tooltip found');
        }
      } catch (error) {
        console.log('No tooltip found');
      }
    });
  }

  private static async performActionWithAssertion(
    locator: Locator,
    action: () => Promise<void>
  ): Promise<void> {
    const elementName = await AssertionHelper.getElementName(locator);
    const isVisible = await locator.isVisible();
    const isEnabled = await locator.isEnabled();

    let assertionMessages:string[] = [];

    if (isVisible) {
      assertionMessages.push(`${elementName} is visible: Pass ✅`);
    } else {
      assertionMessages.push(`${elementName} is visible: Fail ❌`);
    }

    if (isEnabled) {
      assertionMessages.push(`${elementName} is enabled: Pass ✅`);
    } else {
      assertionMessages.push(`${elementName} is enabled: Fail ❌`);
    }

    if (isVisible && isEnabled) {
      try {
        await action();
      } catch (error) {
        console.error(`Error performing action on ${elementName}:`, error);
      }
    } else {
      console.log(`${elementName} action failed: Not visible or enabled`);
    }

    const uniqueMessages = Array.from(new Set(assertionMessages));
    console.log(uniqueMessages.join(' | '));
  }

  private static async getElementName(locator: Locator): Promise<string> {
    try {
      const placeholder = await locator.getAttribute('placeholder');
      if (placeholder) {
        return placeholder.trim();
      }

      const ariaLabel = await locator.getAttribute('aria-label');
      if (ariaLabel) {
        return ariaLabel.trim();
      }

      const title = await locator.getAttribute('title');
      if (title) {
        return title.trim();
      }

      const textContent = await locator.textContent();
      if (textContent?.trim()) {
        return textContent.trim();
      }

      const name = await locator.getAttribute('name');
      if (name) {
        return name.trim();
      }

      return 'Unnamed Element';
    } catch (error) {
      console.error('Error fetching element name:', error);
      return 'Unnamed Element';
    }
  }
}