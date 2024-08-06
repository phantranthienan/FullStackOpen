const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('mostLikes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.mostLikes([]);
		assert.deepStrictEqual(result, {});
	});

	test('when list has only one blog, equals the likes of that blog', () => {
		const blogs = [
			{
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Considered_Harmful.html",
				likes: 5,
			}
		];
		const result = listHelper.mostLikes(blogs);
		assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 });
	});

	test('of a bigger list is calculated right', () => {
		const blogs = [
			{ author: "Edsger W. Dijkstra", likes: 5 },
			{ author: "Robert C. Martin", likes: 2 },
			{ author: "Edsger W. Dijkstra", likes: 17 },
			{ author: "Robert C. Martin", likes: 3 },
			{ author: "Robert C. Martin", likes: 8 }
		];
		const result = listHelper.mostLikes(blogs);
		assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 22 });
	});

	test('when multiple authors have the same highest likes, returns one of them', () => {
		const blogs = [
			{ author: "Edsger W. Dijkstra", likes: 12 },
			{ author: "Robert C. Martin", likes: 10 },
			{ author: "Edsger W. Dijkstra", likes: 10 },
			{ author: "Robert C. Martin", likes: 12 }
		];
		const result = listHelper.mostLikes(blogs);
		assert.strictEqual(result.likes, 22);
		assert.ok(["Edsger W. Dijkstra", "Robert C. Martin"].includes(result.author));
	});
});

