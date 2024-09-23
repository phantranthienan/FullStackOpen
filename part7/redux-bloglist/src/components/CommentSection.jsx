import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addCommentAction } from '../reducers/blogReducer'
import { Box, Typography, TextField, Button, List, ListItem } from '@mui/material'

const CommentSection = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))

  const addComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    dispatch(addCommentAction(blog.id, content))
    event.target.comment.value = ''
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Comments</Typography>
      <form onSubmit={addComment}>
        <Box display="flex" gap={2}>
          <TextField
            label="Add a comment"
            name="comment"
            variant="outlined"
            fullWidth
            size="small"
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </form>
      <List sx={{ mt: 2 }}>
        {blog.comments.map((comment) => (
          <ListItem key={comment.id} divider>
            {comment.content}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default CommentSection
