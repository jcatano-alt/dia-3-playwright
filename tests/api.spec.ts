import { test, expect } from '@playwright/test'

test.describe('API Testing', () => {
  test('GET /users should return users list', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users')
    
    expect(response.status()).toBe(200)
    
    const users = await response.json()
    expect(users.length).toBeGreaterThan(0)
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('email')
  })

  test('GET /users/1 should return a single user', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1')
    
    expect(response.status()).toBe(200)
    
    const user = await response.json()
    expect(user.name).toBe('Leanne Graham')
    expect(user.email).toBeDefined()
  })

  test('POST /posts should create a post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: { title: 'Test Post', body: 'Test Body', userId: 1 }
    })
    
    expect(response.status()).toBe(201)
    
    const post = await response.json()
    expect(post.title).toBe('Test Post')
    expect(post.id).toBeDefined()
  })
})