const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')


describe('total likes', () => {
    const listWithOneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        }
    ]

    const blogs = [
        { title: 'React patterns', author: 'Michael Chan', likes: 7 },
        { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 },
        { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
        { title: 'First class tests', author: 'Robert C. Martin', likes: 10 },
        { title: 'TDD harms architecture', author: 'Robert C. Martin', likes: 0 },
        { title: 'Type wars', author: 'Robert C. Martin', likes: 2 }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})