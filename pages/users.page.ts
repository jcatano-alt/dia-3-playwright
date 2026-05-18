import { type Page, type Locator, expect } from '@playwright/test'

export class UsersPage {
  readonly page: Page
  readonly heading: Locator
  readonly userList: Locator
  readonly addUserButton: Locator
  readonly searchInput: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Users' })
    this.userList = page.getByTestId('user-list')
    this.addUserButton = page.getByRole('button', { name: 'Add User' })
    this.searchInput = page.getByPlaceholder('Search users...')
  }

  async goto() {
    await this.page.goto('/users')
  }

  async searchUser(query: string) {
    await this.searchInput.fill(query)
  }

  async expectUserVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible()
  }

  async expectUserCount(count: number) {
    await expect(this.userList.locator('[data-testid="user-row"]')).toHaveCount(count)
  }
}