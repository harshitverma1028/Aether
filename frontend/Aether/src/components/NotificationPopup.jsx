function NotificationPopup({ message }) {

  if (!message) return null

  return (
    <div className='fixed top-5 right-5 bg-cyan-500 text-black px-6 py-4 rounded-2xl shadow-2xl z-50'>
      {message}
    </div>
  )
}

export default NotificationPopup