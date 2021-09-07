import { useRouter } from 'next/router'

const LeadQuoteForm = ({ lead }) => {
  const router = useRouter()

  const quoteLead = async (e) => {
    e.preventDefault() 

    await fetch(`/api/leads/${lead._id}`, {
      body: JSON.stringify({
        quote: {
          service: e.target.quote_service.value,
          extra: e.target.quote_extra.value
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname)) // Soft refresh
    .then(() => toast.success('Your quote has been saved.')) // Toast
  }
  
  return (
    <form onSubmit={quoteLead}>
      <label className='text-gray-400 text-sm'>Service Cost</label>
      <input type='number' name='quote_service' className='mb-2 p-2 rounded w-full' />
      <label className='text-gray-400 text-sm'>Additional Cost</label>
      <input type='number' name='quote_extra' className='mb-4 p-2 rounded w-full' />
      <button type='submit' className='bg-gray-100 hover:bg-gray-200 p-2 rounded w-full'>Add Quote</button>
    </form>
  )
}

export default LeadQuoteForm