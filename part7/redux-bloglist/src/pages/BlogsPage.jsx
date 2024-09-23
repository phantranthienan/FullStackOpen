import React from 'react'
import Blogs from '../components/Blogs'
import CreateBlogForm from '../components/CreateBlogForm'
import { Box } from '@mui/material'

const BlogsPage = () => {
  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      height="100vh" 
    >
        <Blogs />
        <CreateBlogForm />
    </Box>
  )
}

export default BlogsPage