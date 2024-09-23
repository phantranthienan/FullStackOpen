import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

import usersService from '../services/users'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await usersService.getAll()
            setUsers(users)
        } 
        fetchUsers()
    }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align='right'>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell align='right'>{user.blogs.length}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersPage