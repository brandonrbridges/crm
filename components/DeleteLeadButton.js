import { useRouter } from 'next/router'

const DeleteLeadButton = ({ lead }) => {
  const router = useRouter()

  const deleteLead = async (_id) => {
    await fetch(`/api/leads?_id=${_id}`, { method: 'DELETE' })
    .then(() => router.push('/leads'))
    .then(() => toast.success('Lead has been deleted successfully.'))
  }
  
  return (
    <button onClick={() => deleteLead(lead._id)} className='border border-red-100 hover:border-red-500 hover:bg-red-500 py-1 rounded text-red-500 hover:text-white transition-all w-full'>
      Delete Lead
    </button>
  )
}

export default DeleteLeadButton