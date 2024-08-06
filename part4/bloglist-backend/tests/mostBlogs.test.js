const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('mostBlogs', () => {
    test('of empty list is empty object', async () => {
        const result = listHelper.mostBlogs([]);
        assert.deepStrictEqual(result, {});
    });

    test('when list has only one blog, equals the author of that blog', async () => {
        const blogs = [
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Considered_Harmful.html",
                likes: 5,
            }
        ];
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
    });

    test('of a bigger list is calculated right', async () => {
        const blogs = [
            { author: "Edsger W. Dijkstra", likes: 5 },
            { author: "Robert C. Martin", likes: 2 },
            { author: "Edsger W. Dijkstra", likes: 17 },
            { author: "Robert C. Martin", likes: 3 },
            { author: "Robert C. Martin", likes: 8 }
        ];
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
    });
});