import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: notification.type === 'error' ? '#ffebee' : '#e8f5e8',
    color: notification.type === 'error' ? '#c62828' : '#2e7d32',
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
