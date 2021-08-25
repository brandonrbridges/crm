// React
import { useState } from 'react'

// Components
import ChangeStatusForm from '@/components/ChangeStatusForm'

// Modules
import { FiPenTool, FiXCircle } from 'react-icons/fi'

const ChangeStatusButton = ({ lead }) => {
  // Statss
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <>
      <button onClick={() => setOpenModal(!openModal)} className='inline-block bg-green-100 hover:bg-green-300 mr-2 p-2 rounded-full hover:text-white'>
        <FiPenTool />
      </button>

      {openModal && (
        <div className='absolute bg-black bg-opacity-20 flex h-screen items-center justify-center p-12 left-0 top-0 w-full'>
          <div className='bg-white p-12 relative rounded shadow-xl w-1/2'>
            <button onClick={() => setOpenModal(!openModal)} className='absolute right-10 text-gray-400 hover:text-red-400 top-10'>
              <FiXCircle />
            </button>

            <p className='font-bold mb-8 text-xl'>Change Status</p>

            <ChangeStatusForm lead={lead} />
          </div>
        </div>
      )}
    </>
  )
}

export default ChangeStatusButton