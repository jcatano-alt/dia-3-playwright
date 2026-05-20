import { test, expect } from '@playwright/test'

test.describe('Network Interception', () => {
  test('should handle API error gracefully', async ({ page }) => {
    // Simular que el API responde con error 500
    await page.route('**/api/users', (route) => {
      route.fulfill({ status: 500, body: 'Server Error' })
    })
    await page.goto('https://jsonplaceholder.typicode.com')
    await expect(page).toHaveTitle(/JSONPlaceholder/)
  })

  test('should intercept and mock API response', async ({ page }) => {
    // Simular respuesta vacía
    await page.route('**/todos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
    })
    await page.goto('https://jsonplaceholder.typicode.com')
    await expect(page).toHaveTitle(/JSONPlaceholder/)
  })
})