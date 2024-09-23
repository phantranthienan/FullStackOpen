const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')  
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
                            .populate('user', { username: 1, name: 1 })
                            .populate('comments', { content: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'Unauthorized' })
    }
    
    user.blogs = user.blogs.filter(blog => blog.id.toString() !== request.params.id.toString())
    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const user = request.user
    const blogToUpdate = await Blog.findById(request.params.id)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    if (blogToUpdate.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'Unauthorized' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
                                  .populate('user', { username: 1, name: 1 })
                                  .populate('comments', { content: 1 })
    response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const { content } = request.body
    const blog = await Blog.findById(request.params.id)

    const comment = new Comment({
        content,
        blog: blog.id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment.id)
    const savedBlog = await blog.save()
    const populatedBlog = await Blog.findById(savedBlog.id).populate('comments', { content: 1 })

    response.status(201).json(populatedBlog)
})

module.exports = blogsRouter