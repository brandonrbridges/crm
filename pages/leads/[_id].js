import { useState } from 'react'

import Link from 'next/Link'
import { useRouter } from 'next/router'

import Badge from '@/components/badge'
import CustomerWidget from '@/components/customerWidget'
import DashboardLayout from '@/layouts/dashboard'
import Widget from '@/components/widget'

import isToday from '@/helpers/isToday'

import { FiArrowLeftCircle, FiEdit, FiLock } from 'react-icons/fi'

import moment from 'moment'

import toast from 'react-hot-toast'

const Page = ({ customer, lead }) => {
  const router = useRouter()

  const [editQuote, setEditQuote] = useState(false)
  const [editSale, setEditSale] = useState(false)
  

  const handleDelete = async () => {
    await fetch(`/api/leads?_id=${router.query._id}`, { method: 'DELETE' })
    .then(() => router.push('/leads'))
    .then(() => toast.success('Lead has been deleted successfully.'))
  }

  const handleQuoteValue = async (e) => {
    e.preventDefault() 

    const res = await fetch(`/api/leads/${router.query._id}`, {
      body: JSON.stringify({
        quote_value: e.target.quote_value.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname))
    .then(() => toast.success('Your quote has been saved.'))
  }

  const handleSaleValue = async (e) => {
    e.preventDefault() 

    const res = await fetch(`/api/leads/${router.query._id}`, {
      body: JSON.stringify({
        sale_value: e.target.sale_value.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname))
    .then(() => toast.success('Your final cost has been saved.'))
  }

  return (
    <DashboardLayout>
      <Link href='/leads'>
        <a className='flex items-center mb-4 text-gray-400 hover:text-black'>
          <FiArrowLeftCircle className='mr-2' /> Go back to Leads
        </a>
      </Link>

      {lead.status == 'sold' && (
        <div className='bg-white border border-green-400 mb-4 p-4 rounded w-full'>
          <p className='flex items-center'><FiLock className='mr-2' /> This lead has been sold and is now locked.</p>
        </div>
      )}

      <div className='gap-4 grid grid-cols-4 h-auto'>
        <div>
          <Widget>
            {isToday(lead.creation_date) && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' status='new' text='New Lead' /></div>}

            <h1 className='flex font-bold items-center justify-center mb-4 text-3xl text-center'>{lead.customer.name}</h1>

            <p className='text-center text-gray-500 text-sm'>Added {moment(lead.creation_date).format('DD/MM/YYYY HH:mm')}</p>
            <p className='text-center text-gray-400 text-xs'>({moment(lead.creation_date).fromNow()})</p>

            <p className='font-bold mt-4 mb-4 text-gray-400 uppercase text-xs'>Lead Information</p>
            <div className='border my-4 p-4 rounded'>
              <table className='w-full'>
                <tbody>
                  <tr>
                    <td className='text-gray-500'>Brand</td>
                    <td className='capitalize'>[brand]</td>
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
              <p className='mt-2 text-gray-400 text-right text-sm'>Sent in via {lead.contacted_via}</p> 
            </div>
          </Widget>
        </div>
        <div>
          <CustomerWidget customer={customer} />
        </div>
        <div>
          <Widget margin='mb-4'>
            <p className='meta-title mb-4'>Quick Actions</p>
            <div className='gap-y-4 grid grid-cols-1'>
              <button onClick={() => handleDelete()} className='border py-1 rounded w-full'>
                Delete
              </button>
            </div>
          </Widget>
          <Widget margin='mb-4 relative'>
            <p className='meta-title mb-4'>Quote Value</p>
            {lead.quote_value && (
              <>
                <p className='font-bold text-3xl'>{lead.quote_value} kr</p>
                {editQuote && (
                  <>
                    <form onSubmit={handleQuoteValue} className='flex mt-4 whitespace-nowrap'>
                      <input type='number' name='quote_value' className='p-2 rounded-r-none w-full' />
                      <button type='submit' className='bg-gray-300 px-2 rounded-l-none'>Update Quote</button>
                    </form>
                    <p className='mt-4 text-gray-400 text-sm'>This will change the value of your quote.</p>
                  </>
                )}

                <button type='button' onClick={() => setEditQuote(!editQuote)} className='absolute text-gray-400 hover:text-black top-12 right-12'>
                  <FiEdit />
                </button>
              </>
            )}

            {!lead.quote_value && (
              <>
                <form onSubmit={handleQuoteValue} className='flex whitespace-nowrap'>
                  <input type='number' name='quote_value' className='p-2 rounded-r-none w-full' />
                  <button type='submit' className='bg-gray-300 px-2 rounded-l-none'>Add Quote</button>
                </form>
              </>
            )}
          </Widget>
          <Widget margin='mb-4 relative'>
            <p className='meta-title mb-4'>Sale Value</p>
            {lead.sale_value && (
              <>
                <p className='font-bold text-3xl'>{lead.sale_value} kr</p>
                {lead.sale_value > lead.quote_value && (
                  <p className='mt-4 text-gray-500 text-sm'>Nice! Thats <b>{lead.sale_value - lead.quote_value} kr</b> more than you quoted!</p>
                  )}
                {lead.sale_value < lead.quote_value && (
                  <p className='mt-4 text-red-500 text-sm'>Thats <b>{lead.quote_value - lead.sale_value} kr</b> less than you quoted!</p>
                )}

                {editSale && (
                  <>
                    <form onSubmit={handleSaleValue} className='flex mt-4 whitespace-nowrap'>
                      <input type='number' name='sale_value' className='p-2 rounded-r-none w-full' />
                      <button type='submit' className='bg-gray-300 px-2 rounded-l-none'>Update Sale</button>
                    </form>
                    <p className='mt-4 text-gray-400 text-sm'>If no value is entered, the quote value will be used.</p>
                  </>
                )}

                <button type='button' onClick={() => setEditSale(!editSale)} className='absolute text-gray-400 hover:text-black top-12 right-12'>
                  <FiEdit />
                </button>
              </>
            )}

            {!lead.sale_value && (
              <>
                <form onSubmit={handleSaleValue} className='flex whitespace-nowrap'>
                  <input type='number' name='sale_value' className='p-2 rounded-r-none w-full' />
                  <button type='submit' className='bg-gray-300 px-2 rounded-l-none'>Add Sale</button>
                </form>
                <p className='mt-4 text-gray-400 text-sm'>If no value is entered, the quote value will be used.</p>
              </>
            )}
          </Widget>
        </div>
        <div>
          <Widget className='mb-4'>
            <p className='meta-title mb-4'>Notes</p>
          </Widget>
          <Widget>
            <p className='meta-title mb-4'>Activity Log</p>
          </Widget>
        </div>
      </div>
    </DashboardLayout>
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