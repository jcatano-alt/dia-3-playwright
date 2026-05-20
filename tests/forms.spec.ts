import { test, expect } from '@playwright/test'

test.describe('Form Elements', () => {
 test('should select from a dropdown', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown')
  
  // Seleccionar por valor
  await page.locator('#dropdown').selectOption('1')
  await expect(page.locator('#dropdown')).toHaveValue('1')
  
  // Seleccionar por texto visible
  await page.locator('#dropdown').selectOption({ label: 'Option 2' })
  await expect(page.locator('#dropdown')).toHaveValue('2')
})

  test('should fill a date input', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/inputs')
    
    // Llenar un input de número (similar a date)
    await page.getByRole('spinbutton').fill('2026')
    await expect(page.getByRole('spinbutton')).toHaveValue('2026')
  })

  test('should upload a file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload')
  
  await page.locator('#file-upload').setInputFiles({
    name: 'test-file.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Contenido del archivo de prueba'),
  })
  
  await page.locator('#file-submit').click()
  await expect(page.getByText('test-file.txt')).toBeVisible()
})
})