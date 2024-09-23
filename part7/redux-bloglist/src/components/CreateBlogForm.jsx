import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { TextField, Button, Box, Typography } from '@mui/material'

const CreateBlogForm = () => {
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    dispatch(createBlog(newBlog))
    createBlogFormRef.current.toggleVisibility()

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <Togglable buttonLabel="create new blog" ref={createBlogFormRef}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create new
      </Typography>
      <form onSubmit={addNewBlog}>
        <Box mb={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            size="small"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            name="author"
            size="small"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="URL"
            variant="outlined"
            fullWidth
            name="url"
            size="small"
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{mb: 1}}>
          Create
        </Button>
      </form>
    </Togglable>
  )
}

export default CreateBlogForm
