const { describe, test, after, before } = require('node:test')
const assert = require('assert')

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

describe('Test with token', () => {
    let token1 = null, token2 = null

    before(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        for (let user of helper.initialUsers) {
            await api.post('/api/users').send(user)
        }
    })

    test('login with valid credentials', async () => {
        const user = {
            username: 'tphan01',
            password: '123456'
        };

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200);

        token1 = response.body.token;
        assert(token1 !== null);
    });

    test('login with another valid credentials', async () => {
        const user = {
            username: 'dquynh02',
            password: '123456'
        }
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
        token2 = response.body.token
        assert(token2 !== null)
    })

    test('login with invalid credentials', async () => {
        const user = {
            username: 'tphan01',
            password: '1234567'
        }
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(401)
        assert(response.body.error === 'invalid username or password')
    })

    test('addition of new blogs with token', async () => {
        const newBlog = {
            title: 'Hello World',
            author: 'Phan An',
            url: 'http://www.random.com',
        }
        
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token1}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        const titles = blogsAtEnd.map(blog => blog.title)
        assert(titles.includes('Hello World'))
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token1}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('id exists instead of _id', async () => {
        const response = await api
                                .get('/api/blogs')
                                .set('Authorization', `Bearer ${token1}`)
        assert(response.body[0].id !== undefined)
    })

    describe('viewing a specific blog', () => {
        test('succeeds with a valid id', async () => {
            const blogs = await helper.blogsInDb()
            const blogToView = blogs[0]
            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            blogToView.user = blogToView.user.toString()
            assert.deepStrictEqual(resultBlog.body, blogToView)
        })

        test('failed with status code 404 if blog does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId()
            await api
                .get(`/api/blogs/${validNonexistingId}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(404)
        })
    })

    describe('modification of a blog', () => {
        test('succeeds with status code 200 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToModify = blogsAtStart[0]
            await api
                .put(`/api/blogs/${blogToModify.id}`)
                .set('Authorization', `Bearer ${token1}`)
                .send({ likes: 100 })
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()
            const modifiedBlog = blogsAtEnd[0]
            assert.strictEqual(modifiedBlog.likes, 100)
        })
    })

    describe('deletion of a blog', () => {
        test("failed with status code 401 if the blog is not created by ourself", async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token2}`)
                .expect(401)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(titles.includes(blogToDelete.title))
        })
        test('succeed with the blog created by ourself', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(!titles.includes(blogToDelete.title))
        })
    })



})

after(async () => {
    await mongoose.connection.close()
})