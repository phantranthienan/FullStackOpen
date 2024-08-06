const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('favouriteBlogs', () => {
  test('returns the blog with the highest number of likes', () => {
	const blogs = [
	  { title: 'Blog A', likes: 10 },
	  { title: 'Blog B', likes: 15 },
	  { title: 'Blog C', likes: 5 },
	];
	const expected = { title: 'Blog B', likes: 15 };
	const result = listHelper.favouriteBlog(blogs);
	assert.deepStrictEqual(result, expected);
  });

  test('returns empty object if the blog list is empty', () => {
	const blogs = [];
	const expected = {};
	const result = listHelper.favouriteBlog(blogs);
	assert.deepStrictEqual(result, expected);
  });
});

