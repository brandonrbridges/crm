// React
import { useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Modules
import toast from 'react-hot-toast'

const ChangeStatusForm = ({ lead }) => {
  // Router
  const router = useRouter()

  const [value, setValue] = useState(lead.status)

  const options = ['new', 'called', 'quoted', 'accepted', 'rejected', 'booked']

  // Handle status change
  const handleStatusChange = async (newValue) => {
    console.log(newValue)

    setValue(newValue)

    let _id = (router.query._id ? router.query._id : lead._id)

    const res = await fetch(`/api/leads/${_id}`, {
      body: JSON.stringify({
        status: newValue
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname)) // Soft Refresh
    .then(() => toast.success('Status has been updated successfully.')) // Toast
  }
  
  return (
    <form>
      <label>Edit Status</label>
      <select name='status' value={value} onChange={e => handleStatusChange(e.currentTarget.value)} className='capitalize'>
        <option hidden>Select</option>
        {options.map((option, i) => <option key={i} value={option} defaultChecked={(value == option ? true : false)} className='capitalize'>{option}</option>)}
      </select>
    </form>
  )
}

export default ChangeStatusForm