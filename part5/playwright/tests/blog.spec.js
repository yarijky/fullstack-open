const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // await request.post('http:localhost:3003/api/testing/reset')
    // await request.post('http://localhost:3003/api/users', {
    //   data: {
    //     name: 'Matti Luukkainen',
    //     username: 'mluukkai',
    //     password: 'salainen'
    //   }
    // })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator(".login-form")).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator(".login-username").fill("yarijky")
      await page.locator(".login-password").fill("yarijky")
      await page.locator(".login-submit").click()
      await expect(page.getByText('yari logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator(".login-username").fill("yarijky")
      await page.locator(".login-password").fill("psw_errata")
      await page.locator(".login-submit").click()
      await expect(page.getByText('logged-in')).toBeHidden()
    })

    test('a new blog can be created', async ({ page }) => {
      
    })
  })
})