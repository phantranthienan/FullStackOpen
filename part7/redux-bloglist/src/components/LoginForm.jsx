import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Togglable from './Togglable'
import { Button, Box, TextField, Typography } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(loginUser({ username, password }))

    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            type="text"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default LoginForm
