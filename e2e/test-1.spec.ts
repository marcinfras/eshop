import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'X' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('pp');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('pp@wp.pl');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('12345678');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('pp@wp.pl');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign in' }).click();
});