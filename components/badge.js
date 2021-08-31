const Badge = ({ className, text, size, status }) => {
  let color

  // Colour Switcher based on Status
  switch(status) {
    case 'accepted': 
      color = 'green'
      break
    case 'booked':
      color = 'green'
      break
    case 'called':
      color = 'indigo'
      break
    case 'new':
      color = 'green'
      break
    case 'rejected':
      color = 'red'
      break
    case 'quoted':
      color = 'yellow'
      break
    default:
      color = 'gray'
  }

  return (
    <div className={`${className} bg-${color}-100 capitalize font-bold inline-block px-4 py-1 rounded-full text-center text-${color}-400 text-${size}`}>
      {text}
    </div>
  )
}

export default Badge