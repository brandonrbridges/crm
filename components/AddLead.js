// React 
import { useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Modules
import toast from 'react-hot-toast'
import { FiPlusCircle, FiXCircle } from 'react-icons/fi'

const AddLead = () => {
  // States
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <>
      <button onClick={() => setOpenModal(!openModal)} className='hover:bg-green-400 border border-green-400 flex items-center ml-auto px-4 py-1 rounded text-sm text-green-400 hover:text-white'>
        <FiPlusCircle />
      </button>

      {openModal && (
        <div className='absolute bg-black bg-opacity-20 flex h-screen items-center justify-center p-12 left-0 top-0 w-full'>
          <div className='bg-white p-12 relative rounded shadow-xl w-1/2'>
            <button onClick={() => setOpenModal(!openModal)} className='absolute right-10 text-gray-400 hover:text-red-400 top-10'>
              <FiXCircle />
            </button>

            <p className='font-bold mb-8 text-xl'>Add Lead</p>

            <AddLeadForm />
          </div>
        </div>
      )}
    </>
  )
}

const AddLeadForm = () => {
  // Router
  const router = useRouter()

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Post to API
    await fetch('/api/leads', {
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        type: e.target.type.value,
        city: e.target.city.value,
        kvm: e.target.kvm.value,
        message: e.target.message.value,
        source: 'manual'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    // .then(() => setOpenModal(false)) // Close Modal
    .then(() => router.push(window.location.pathname)) // Soft Refresh
    .then(() => toast.success('Your lead has been added.')) // Toast
  }
  
  return (
    <form onSubmit={handleSubmit} className=''>
      <p className='meta-title mb-4'>Customer</p>
      <div className='gap-4 grid grid-cols-2'>
        <div className='col-span-2'>
          <label>Name</label>
          <input type='text' name='name' placeholder='Name' className='px-2 py-1 w-full' />
        </div>
        <div className=''>
          <label>Email</label>
          <input type='email' name='email' placeholder='john@example.com' className='w-full' />
        </div>
        <div className=''>
          <label>Phone</label>
          <input type='tel' name='phone' placeholder='073-8142506' className='w-full' />
        </div>
      </div>

      <hr className='my-8' />

      <p className='meta-title mb-4'>Information</p>

      <div className='gap-4 grid grid-cols-3'>
        <div className=''>
          <label>Type</label>
          <select name='type' className='border w-full'>
            <option disabled hidden defaultValue>Select Type</option>
            <option value='lagenhet'>Lägenhet</option>
            <option value='radhus'>Radhus</option>
            <option value='villa'>Villa</option>
          </select>
        </div>
        <div className=''>
          <label>City</label>
          <input type='text' name='city' placeholder='Lulea' className='w-full' />
        </div>
        <div className=''>
          <label>KVM</label>
          <input type='number' name='kvm' placeholder='100' className='w-full' />
        </div>
      </div>

      <hr className='my-4' />

      <p className='meta-title mb-4'>Message</p>

      <textarea name='message' placeholder='Enter your message here' className='w-full' />

      <button type='submit' className='block bg-green-100 hover:bg-green-200 font-bold mx-auto mt-8 px-2 py-1 rounded text-green-400 hover:text-green-500'>Add Lead</button>
    </form>
  )
}

export default AddLead