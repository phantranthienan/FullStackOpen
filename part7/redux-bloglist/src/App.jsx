import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material'

import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Notification from './components/Notification'
import UsersPage from './pages/UsersPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import UserDetailPage from './pages/UserDetailPage'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
    if (user) {
      fetchAllBlogs()
    }
  }, [user, dispatch])

  if (user === null) {
    return (
      <>
        <Box position="fixed" top={0} width="100%" zIndex={10}>
          <Notification />
        </Box>
        <Container maxWidth="sm" mt={0}>
          <LoginForm />
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </>
  )
}

export default App
