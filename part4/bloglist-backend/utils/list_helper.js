const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes > item.likes ? max : item
    }
    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {};

    const authorCounts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1;
        return acc;
    }, {});

    let maxBlogs = 0;
    let authorWithMostBlogs = '';
    for (const author in authorCounts) {
        if (authorCounts[author] > maxBlogs) {
            maxBlogs = authorCounts[author];
            authorWithMostBlogs = author;
        }
    }

    return { author: authorWithMostBlogs, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {};

    const authorLikes = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});

    let maxLikes = 0;
    let authorWithMostLikes = '';
    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            maxLikes = authorLikes[author];
            authorWithMostLikes = author;
        }
    }

    return { author: authorWithMostLikes, likes: maxLikes };
};

module.exports = { dummy, totalLikes, mostBlogs, mostLikes, favouriteBlog }