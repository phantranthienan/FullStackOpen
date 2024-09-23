import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog)
    dispatch(addBlog(blog))
  }
}

export const updateBlogAction = (id, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, updatedBlog)
    dispatch(updateBlog(blog))
  }
}

export const addCommentAction = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.addComment(id, comment)
    dispatch(updateBlog(blog))
  }
}

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}
