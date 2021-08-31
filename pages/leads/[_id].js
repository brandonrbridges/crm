// React
import { useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Layout
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Badge from '@/components/Badge'
import ChangeStatusForm from '@/components/ChangeStatusForm'
import CustomerWidget from '@/components/CustomerProfile'
import Widget from '@/components/Widget'

// Helpers
import isToday from '@/helpers/isToday'

// Modules
import { FiCircle, FiEdit } from 'react-icons/fi'
import moment from 'moment'
import toast from 'react-hot-toast'

const Page = ({ customer, lead }) => {
  // Router
  const router = useRouter()

  // States
  const [editQuote, setEditQuote] = useState(false)
  const [editSale, setEditSale] = useState(false)

  // Handle deletion
  const handleArchive = async () => {
    let _id = (router.query._id ? router.query._id : lead._id)

    await fetch(`/api/leads/${_id}`, {
      body: JSON.stringify({
        archive: true
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname)) // Soft Refresh
    .then(() => toast.success('Status has been updated successfully.')) // Toast
  }

  // Handle deletion
  const handleDelete = async () => {
    await fetch(`/api/leads?_id=${router.query._id}`, { method: 'DELETE' })
    .then(() => router.push('/leads'))
    .then(() => toast.success('Lead has been deleted successfully.'))
  }

  return (
    <DashboardLayout>
      <div className='gap-4 grid grid-cols-4 h-auto'>
        <div>
          <Widget>
            {isToday(lead.creation_date) && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' status='new' text='New Lead' /></div>}
            {lead.archive && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' text='Archive' /></div>}

            <h1 className='flex font-bold items-center justify-center mb-4 text-3xl text-center'>Lead</h1>

            <p className='text-center text-gray-500 text-sm'>Added {moment(lead.creation_date).format('DD/MM/YYYY HH:mm')}</p>
            <p className='text-center text-gray-400 text-xs'>({moment(lead.creation_date).fromNow()})</p>

            <p className='font-bold mt-4 mb-4 text-gray-400 uppercase text-xs'>Lead Information</p>
            <div className='border my-4 p-4 rounded'>
              <table className='w-full'>
                <tbody>
                  <tr>
                    <td className='text-gray-500'>Via</td>
                    <td>{lead.source}</td>
                  </tr>
                  <tr>
                    <td className='py-2'>
                      <hr className='border-gray-200 w-full' />
                    </td>
                    <td>
                      <hr className='border-gray-200 w-full' />
                    </td>
                  </tr>
                  <tr>
                    <td className='text-gray-500'>Type</td>
                    <td className='capitalize'>{lead.type}</td>
                  </tr>
                  <tr>
                    <td className='text-gray-500'>City</td>
                    <td className='capitalize'>{lead.city}</td>
                  </tr>
                  <tr>
                    <td className='text-gray-500'>KVM</td>
                    <td>{lead.kvm} kvm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className='font-bold mt-4 mb-4 text-gray-400 uppercase text-xs'>Message</p>
            <div className='border my-4 p-4 rounded'>
              <p className='text-gray-400 text-sm'>{lead.customer.name} says:</p>
              <p>{lead.message}</p>
            </div>

            <p className='font-bold mt-4 mb-4 text-gray-400 uppercase text-xs'>Status</p>
            <div className='border my-4 p-4 rounded'>
              <Badge className='w-full' status={lead.status} text={lead.status} />
              {/* <p className='mt-2 text-gray-400 text-right text-sm'>Sent in via {lead.source}</p>  */}
            </div>
          </Widget>
        </div>
        <div>
          <CustomerWidget customer={customer} />
          <Widget margin='mt-4'>
            <p className='meta-title mb-4'>Quick Actions</p>
            <div className='gap-y-4 grid grid-cols-1'>
              {/*  
              <button onClick={() => handleArchive()} className='border py-1 rounded w-full'>
                Archive
              </button>
              */}
              <button onClick={() => handleDelete()} className='bg-red-100 hover:bg-red-500 py-1 rounded text-red-500 hover:text-white transition-all w-full'>
                Delete Lead
              </button>
              <ChangeStatusForm lead={lead} />
            </div>
          </Widget>
        </div>
        <div>
          <Widget title='Quote' margin='mb-4 relative'>
            {lead.quote && (
              <>
                <p className='font-bold text-3xl'>{lead.quote.service + lead.quote.extra} kr</p>
                <p>Service Cost: {lead.quote.service} kr</p>
                <p>Extra Cost: {lead.quote.extra} kr</p>

                {editQuote && <AddQuoteForm lead={lead} />}

                <button type='button' onClick={() => setEditQuote(!editQuote)} className='absolute text-gray-400 hover:text-black top-12 right-12'>
                  <FiEdit />
                </button>
              </>
            )}

            {!lead.quote && <AddQuoteForm />}
          </Widget>
          <Widget title='Sale' margin='mb-4 relative'>
            {lead.sale && (
              <>
                <p className='font-bold text-3xl'>{lead.sale.service + lead.sale.extra} kr</p>
                <p>Service Cost: {lead.sale.service} kr (incl. RUT)</p>
                <p>Extra Cost: {lead.sale.extra} kr</p>

                {editSale && <AddSaleForm lead={lead} />}

                <button type='button' onClick={() => setEditSale(!editSale)} className='absolute text-gray-400 hover:text-black top-12 right-12'>
                  <FiEdit />
                </button>
              </>
            )}

            {!lead.sale && <AddSaleForm lead={lead} />}
          </Widget>
        </div>
        <div>
          <Widget title='Activity Log'>
            <ul>
              <li className='flex items-center'><FiCircle className='h-4 mr-2 text-green-500 w-4' /> Lead created <span className='ml-4 text-gray-400 text-sm'>{moment(lead.creation_date).fromNow()}</span></li>
            </ul>
          </Widget>
        </div>
      </div>
    </DashboardLayout>
  )
}

const AddQuoteForm = () => {
  // Router
  const router = useRouter()
  
  // Handle quote input
  const handleQuoteValue = async (e) => {
    e.preventDefault() 

    await fetch(`/api/leads/${router.query._id}`, {
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
    <form onSubmit={handleQuoteValue}>
      <label className='text-gray-400 text-sm'>Service Cost</label>
      <input type='number' name='quote_service' className='mb-2 p-2 rounded w-full' />
      <label className='text-gray-400 text-sm'>Additional Cost</label>
      <input type='number' name='quote_extra' className='mb-4 p-2 rounded w-full' />
      <button type='submit' className='bg-gray-100 hover:bg-gray-200 p-2 rounded w-full'>Add Quote</button>
    </form>
  )
}

const AddSaleForm = ({ lead }) => {
  // Router
  const router = useRouter()
  
  // Handle sale input
  const handleSaleValue = async (e) => {
    e.preventDefault() 

    const res = await fetch(`/api/leads/${router.query._id}`, {
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
    <>
      <form onSubmit={handleSaleValue}>
        <label className='text-gray-400 text-sm'>Service Cost</label>
        <input type='number' name='sale_service' className='mb-2 p-2 rounded w-full' placeholder={(lead.quote ? lead.quote.service * 2 : '')} />
        <label className='text-gray-400 text-sm'>Additional Cost</label>
        <input type='number' name='sale_extra' className='mb-4 p-2 rounded w-full' placeholder={(lead.quote ? lead.quote.extra : '')} />
        <button type='submit' className='bg-gray-100 hover:bg-gray-200 p-2 rounded w-full'>Add Sale</button>
      </form>
      <p className='mt-4 text-gray-400 text-sm'>If no value is entered, the quote values will be used.</p>
    </>
  )
}

export async function getServerSideProps(context) {
  const options = { headers: { cookie: context.req.headers.cookie } }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/leads/${context.params._id}`, options)
  const json = await res.json()

  const customer_res = await fetch(`${process.env.NEXTAUTH_URL}/api/customers/${json.lead[0].customer._id}`)
  let customer_json = await customer_res.json()

  if(json.error) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {
      customer: customer_json.customer[0],
      lead: json.lead[0]
    }
  }
}

export default Page