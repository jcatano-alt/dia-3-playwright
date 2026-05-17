import { type Page, type Locator, expect } from '@playwright/test'

export class DashboardPage {
  readonly page: Page
  readonly heading: Locator
  readonly userMenu: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Dashboard' })
    this.userMenu = page.getByTestId('user-menu')
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible()
  }
}