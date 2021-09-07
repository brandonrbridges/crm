// Next
import { useRouter } from 'next/router'

// Modules
import toast from 'react-hot-toast'

const UpdateAddressForm = ({ lead }) => {
  const router = useRouter()
  
  const updateAddress = async (e) => {
    e.preventDefault()

    await fetch(`/api/leads/${lead._id}`, {
      body: JSON.stringify({
        address: e.target.address.value,
        postcode: e.target.postcode.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname))
    .then(() => toast.success('Address has been updated.'))
  }
  
  return (
    <>
      <form onSubmit={updateAddress} className='gap-4 grid grid-cols-1'>
        <div>
          <label>Street</label>
          <input type='text' name='address' />
        </div>
        <div>
          <label>Postcode</label>
          <input type='text' name='postcode' />
        </div>
        <button type='submit'>Update Address</button>
      </form>
    </>
  )
}

export default UpdateAddressForm