const { describe, test, after, beforeEach } = require('node:test')
const assert = require('assert')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
const User = require('../models/user')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    describe('Creation of a new user', () => {
        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()
    
            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            }
    
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
            const usernames = usersAtEnd.map(u => u.username)
            assert(usernames.includes(newUser.username))
        })

        test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()
    
            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }
    
            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            assert.strictEqual(result.body.error, 'expected `username` to be unique')
    
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })

        test('creation fails with proper statuscode and message if username is not valid', async () => {
            const usersAtStart = await helper.usersInDb()
    
            const newUser = {
                username: 'ro',
                name: 'Superuser',
                password: 'salainen',
            }
    
            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            assert.strictEqual(result.body.error, 'User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3).')
    
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })

        test('creation fails with proper statuscode and message if password is not valid', async () => {
            const usersAtStart = await helper.usersInDb()
    
            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'sa',
            }
    
            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            assert.strictEqual(result.body.error, 'password must be at least 3 characters long')
    
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })
    })
})

after(() => {
    mongoose.connection.close()
})