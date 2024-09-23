import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearUser())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        
        <Box display="flex" alignItems="center">
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Typography variant="body1" component="span" sx={{ mx: 2 }}>
            {user.name} logged in
          </Typography>
          <Button variant="outlined" color="error" onClick={logout}>
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
