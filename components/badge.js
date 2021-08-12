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
    case 'complete':
      color = 'green'
      break
    case 'new':
      color = 'green'
      break
    case 'pending':
      color = 'pink'
      break
    case 'rejected':
      color = 'red'
      break
    case 'quoted':
      color = 'indigo'
      break
    case 'sold':
      color = 'green'
      break
    default:
      color = 'gray'
  }

  return (
    <div className={`${className} bg-${color}-100 capitalize font-bold inline-block px-4 py-1 rounded text-center text-${color}-400 text-${size}`}>
      {text}
    </div>
  )
}

export default Badge