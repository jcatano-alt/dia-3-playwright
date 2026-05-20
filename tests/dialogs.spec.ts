import { test, expect } from '@playwright/test'

test.describe('Dialogs', () => {
  test('should accept a dialog', async ({ page }) => {
    // Preparar el handler ANTES de que aparezca el diálogo
    page.on('dialog', async (dialog) => {
      console.log('Mensaje del diálogo:', dialog.message())
      await dialog.accept()
    })

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    await page.getByRole('button', { name: 'Click for JS Alert' }).click()
    await expect(page.locator('#result')).toContainText('You successfully clicked an alert')
  })

  test('should dismiss a confirm dialog', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      await dialog.dismiss()
    })

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click()
    await expect(page.locator('#result')).toContainText('You clicked: Cancel')
  })
})