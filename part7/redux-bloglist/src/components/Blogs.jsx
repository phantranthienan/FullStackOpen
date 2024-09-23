import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, Tab } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
  )
}

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog blog={blog} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Blogs
