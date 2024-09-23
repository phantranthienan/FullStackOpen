import { useParams, Link as RouterLink } from "react-router-dom"
import usersService from "../services/users"
import { useEffect, useState } from "react"
import { Typography, Box, List, ListItem, Link } from '@mui/material'

const UserDetailPage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await usersService.getUser(id)
            setUser(user)
        }
        fetchUser()
    }, [id])

    if (!user) return null

    return (
        <Box mt={4}>
            <Typography variant="h4" gutterBottom>
                {user.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Added blogs
            </Typography>
            <List>
                {user.blogs.map(blog => (
                    <ListItem key={blog.id} divider>
                        <Link
                            component={RouterLink}
                            to={`/blogs/${blog.id}`}
                            underline="hover"
                            variant="body1"
                        >
                            {blog.title}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default UserDetailPage
