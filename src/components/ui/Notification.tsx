import React from 'react'

type NotificationProps = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1 right-1 text-white">&times;</button>
    </div>
  )
}

export default Notification