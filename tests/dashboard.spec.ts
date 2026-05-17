import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dashboard.page'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('qa@test.com', 'password123')
  })

  test('should display dashboard heading', async ({ page }) => {
    const dashboard = new DashboardPage(page)
    await dashboard.expectLoaded()
  })

  test('should show navigation menu', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible()
  })
})