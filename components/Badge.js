const Badge = ({ className, text, size, status }) => {
  let color, bgShade, borderShade, textShade

  // Colour Switcher based on Status
  switch(status) {
    case 'accepted': 
      color = 'green'
      bgShade = '50'
      textShade = '400'
      break
    case 'booked':
      bgShade = '200'
      textShade = '500'
      color = 'green'
      break
    case 'called':
      color = 'indigo'
      break
    case 'new':
      color = 'pink'
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

  if(bgShade == null) bgShade = 50
  if(textShade == null) textShade = 400

  return (
    <div className={`${className} bg-${color}-${bgShade} border border-${color}-${textShade} border-opacity-50 capitalize font-bold inline-block px-4 py-1 rounded-full text-center text-${color}-${textShade} text-${size}`}>
      {text}
    </div>
  )
}

export default Badge