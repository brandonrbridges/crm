// Next
import { useRouter } from 'next/router'

// Modules
import { FiArrowLeftCircle } from 'react-icons/fi'

const GoBack = ({ text }) => {
  // Router
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='flex items-center text-gray-400 hover:text-black'>
      <FiArrowLeftCircle className='mr-2' /> {text}
    </button>
  )
}

export default GoBack