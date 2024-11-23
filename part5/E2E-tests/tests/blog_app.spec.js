const { request, test, describe, expect, beforeEach } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        const requestContext = await request.newContext();

        await requestContext.post('http://localhost:3001/api/testing/reset');

        await requestContext.post('http://localhost:3001/api/users', {
            data: {
                username: 'test',
                name: 'Test User',
                password: 'password',
            },
        });

        await page.goto('http://localhost:5173');
    });

    test('login button is shown', async ({ page }) => {
        const loginButton = await page.getByRole('button', { name: 'login' });
        expect(loginButton).not.toBeNull();
    });

    test('login form is shown after clicking login button', async ({ page }) => {
        const loginButton = await page.getByRole('button', { name: 'login' });
        await loginButton.click();
        const loginForm = await page.getByRole('form', { name: 'login' });
        expect(loginForm).not.toBeNull();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            const loginButton = await page.getByRole('button', { name: 'login' });
            await loginButton.click();
            await page.fill('input[name="username"]', 'test');
            await page.fill('input[name="password"]', 'password');
            await page.click('button[type="submit"]');
            await page.waitForSelector('div', { text: 'Welcome Test User' });
        });

        test('fails with wrong credentials', async ({ page }) => {
            const loginButton = await page.getByRole('button', { name: 'login' });
            await loginButton.click();
            await page.fill('input[name="username"]', 'test');
            await page.fill('input[name="password"]', 'wrong');
            await page.click('button[type="submit"]');
            await page.waitForSelector('div', { text: 'Wrong username or password' });
        });
    })

    describe('Interaction with the app', () => {
        beforeEach(async ({ page }) => {
            const loginButton = await page.getByRole('button', { name: 'login' });
            await loginButton.click();
            await page.fill('input[name="username"]', 'test');
            await page.fill('input[name="password"]', 'password');
            await page.click('button[type="submit"]');
            await page.waitForSelector('div', { text: 'Welcome Test User' });
        });

        test('a blog can be created', async ({ page }) => {
            const createBlogButton = await page.getByRole('button', { name: 'create new blog' });
            await createBlogButton.click();
            await page.fill('input[name="title"]', 'Test Title');
            await page.fill('input[name="author"]', 'Test Author');
            await page.fill('input[name="url"]', 'http://example.com');
            await page.click('button[type="submit"]');
            await page.waitForSelector('div', { text: 'A new blog Test Title by Test Author added' });
        });

        test('a blog can be liked', async ({ page }) => {
            const createBlogButton = await page.getByRole('button', { name: 'create new blog' });
            await createBlogButton.click();
            await page.fill('input[name="title"]', 'Test Title');
            await page.fill('input[name="author"]', 'Test Author');
            await page.fill('input[name="url"]', 'http://example.com');
            await page.click('button[type="submit"]');
            await page.click('button', { text: 'view' });
            await page.click('button', { text: 'like' });
            await page.waitForSelector('div', { text: 'likes 1' });
        });

        test('a blog can be deleted', async ({ page }) => {
            const createBlogButton = await page.getByRole('button', { name: 'create new blog' });
            await createBlogButton.click();
            await page.fill('input[name="title"]', 'Test Title');
            await page.fill('input[name="author"]', 'Test Author');
            await page.fill('input[name="url"]', 'http://example.com');
            await page.click('button[type="submit"]');
            await page.click('button', { text: 'view' });

            page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm');
                expect(dialog.message()).toBe('Remove blog Test Title by Test Author');
                await dialog.accept();
            });

            const deletedBlog = page.locator('text=Test Blog Test Author');
            await expect(deletedBlog).toHaveCount(0);
        });
    });
});
