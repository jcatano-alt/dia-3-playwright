import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { SettingsPage } from '../pages/settings.page'

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(
      process.env.QA_USER_EMAIL!,
      process.env.QA_USER_PASSWORD!,
    )
  })

  test('should load settings page', async ({ page }) => {
    const settings = new SettingsPage(page)
    await settings.goto()
    await settings.expectSaveSuccess()
  })

  test('should update user name', async ({ page }) => {
    const settings = new SettingsPage(page)
    await settings.goto()
    await settings.updateName('QA Tester')
    await settings.expectSaveSuccess()
  })

  test('should load users page', async ({ page }) => {
    const users = await import('../pages/users.page')
    const usersPage = new users.UsersPage(page)
    await usersPage.goto()
    await usersPage.expectUserVisible('admin')
  })
})
