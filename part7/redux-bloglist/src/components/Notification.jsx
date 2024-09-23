import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <Alert variant="outlined" severity={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
