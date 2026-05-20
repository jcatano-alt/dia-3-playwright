import { test, expect } from '@playwright/test'

test('should display newly created post in API', async ({ page, request }) => {
  // 1. ARRANGE: crear datos via API (rápido)
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: { title: 'Mi Post de QE', body: 'Creado desde el test', userId: 1 }
  })
  expect(response.status()).toBe(201)
  const post = await response.json()
  console.log('Post creado con ID:', post.id)

  // 2. ACT: navegar en la UI
  await page.goto(`https://jsonplaceholder.typicode.com`)

  // 3. ASSERT: verificar que la página cargó
  await expect(page).toHaveTitle(/JSONPlaceholder/)
  
  console.log(`Post "${post.title}" creado exitosamente via API`)
})