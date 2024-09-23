import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogAction, deleteBlogAction } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Typography, Button, Box, Link } from '@mui/material'
import CommentSection from '../components/CommentSection'

const BlogDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)

  const likeBlog = (blog) => {
    return async () => {
      const updatedBlog = { likes: blog.likes + 1 }
      dispatch(updateBlogAction(blog.id, updatedBlog))
      dispatch(setNotification({ message: `You liked ${blog.title}`, type: 'success' }))
    }
  }

  const removeBlog = (blog) => {
    return async () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlogAction(blog.id))
        dispatch(setNotification({ message: `You removed ${blog.title}`, type: 'success' }))
      }
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>{blog.title}</Typography>
      <Link href={blog.url} variant="body1" underline="hover" gutterBottom>{blog.url}</Link>
      <Box mt={2}>
        <Typography variant="body1" display="inline">{blog.likes} likes</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={likeBlog(blog)}
          sx={{ ml: 2 }}
        >
          Like
        </Button>
      </Box>
      <Typography variant="body2" mt={2}>Added by {blog.user.name}</Typography>
      {user.username === blog.user.username && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={removeBlog(blog)}
          sx={{ mt: 2 }}
        >
          Remove
        </Button>
      )}
      <CommentSection />
    </Box>
  )
}

export default BlogDetailPage
