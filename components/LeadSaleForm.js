import { useRouter } from 'next/router'

const LeadSaleForm = ({ lead }) => {
  const router = useRouter()
  
  const sellLead = async (e) => {
    e.preventDefault() 

    await fetch(`/api/leads/${lead._id}`, {
      body: JSON.stringify({
        sale: {
          service: e.target.sale_service.value,
          extra: e.target.sale_extra.value
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname)) // Soft refresh
    .then(() => toast.success('Your final cost has been saved.')) // Toast
  }
  
  return (
    <form onSubmit={sellLead}>
      <label className='text-gray-400 text-sm'>Service Cost</label>
      <input type='number' name='sale_service' className='mb-2 p-2 rounded w-full' placeholder={(lead.quote ? lead.quote.service * 2 : '')} />
      <label className='text-gray-400 text-sm'>Additional Cost</label>
      <input type='number' name='sale_extra' className='mb-4 p-2 rounded w-full' placeholder={(lead.quote ? lead.quote.extra : '')} />
      <button type='submit' className='bg-gray-100 hover:bg-gray-200 p-2 rounded w-full'>Add Sale</button>
      <p className='mt-4 text-gray-400 text-sm'>If no value is entered, the quote values will be used.</p>
    </form>
  )
}

export default LeadSaleForm