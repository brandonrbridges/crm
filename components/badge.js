import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'

const Badge = ({ className, text, size, status }) => {
  let color

  switch(status) {
    case 'complete':
      color = 'green'
      break
    case 'new':
      color = 'green'
      break
    case 'pending':
      color = 'pink'
      break
    case 'quoted':
      color = 'indigo'
      break
    case 'sold':
      color = 'green'
      break
    default:
      color = 'grey'
  }

  return (
    <div className={`${className} bg-${color}-100 capitalize font-bold inline-block px-4 py-1 rounded text-center text-${color}-400 text-${size}`}>
      {text}
    </div>
  )
}

export default Badge