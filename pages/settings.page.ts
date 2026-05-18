import { type Page, type Locator, expect } from '@playwright/test'

export class SettingsPage {
  readonly page: Page
  readonly heading: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly saveButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Settings' })
    this.nameInput = page.getByLabel('Name')
    this.emailInput = page.getByLabel('Email')
    this.saveButton = page.getByRole('button', { name: 'Save' })
    this.successMessage = page.getByText('Settings saved successfully')
  }

  async goto() {
    await this.page.goto('/settings')
  }

  async updateName(name: string) {
    await this.nameInput.clear()
    await this.nameInput.fill(name)
    await this.saveButton.click()
  }

  async expectSaveSuccess() {
    await expect(this.successMessage).toBeVisible()
  }
}