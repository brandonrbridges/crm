// React
import { useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Layout
import DashboardLayout from '@/layouts/Dashboard'

// Components
import ArchiveLeadButton from '@/components/ArchiveLeadButton'
import Badge from '@/components/Badge'
import ChangeStatusForm from '@/components/ChangeStatusForm'
import CustomerWidget from '@/components/CustomerProfile'
import DeleteLeadButton from '@/components/DeleteLeadButton'
import LeadActivityLog from '@/components/LeadActivityLog'
import LeadBookingDates from '@/components/LeadBookingDates'
import LeadInfoTable from '@/components/LeadInfoTable'
import LeadNotes from '@/components/LeadNotes'
import LeadQuoteForm from '@/components/LeadQuoteForm'
import LeadSaleForm from '@/components/LeadSaleForm'
import UpdateAddressForm from '@/components/UpdateAddressForm'
import Widget from '@/components/Widget'

// Helpers
import isToday from '@/helpers/isToday'

// Modules
import { FiEdit, FiLoader } from 'react-icons/fi'
import moment from 'moment'
import toast from 'react-hot-toast'

const Page = ({ customer, lead }) => {
  // States
  const [editQuote, setEditQuote] = useState(false)
  const [editSale, setEditSale] = useState(false)

  return (
    <DashboardLayout>
      <div className='gap-4 grid grid-cols-4 h-auto'>
        <div>
          <Widget margin='mb-4'>
            {isToday(lead.creation_date) && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' status='new' text='New Lead' /></div>}
            {lead.archived && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' text='Archived' /></div>}

            <h1 className='flex font-bold items-center justify-center text-3xl text-center'>Lead</h1>

            <div className='my-2 text-center'>
              <Badge className='mx-auto' status={lead.status} text={lead.status} size={'xs'} />
            </div>

            <p className='text-center text-gray-500 text-sm'>Added {moment(lead.creation_date).format('DD/MM/YYYY HH:mm')}</p>
            <p className='text-center text-gray-400 text-xs'>({moment(lead.creation_date).fromNow()})</p>

            <p className='font-bold mt-4 mb-4 text-gray-400 uppercase text-xs'>Lead Information</p>
            <div className='border my-4 p-4 rounded'>
              <LeadInfoTable lead={lead} />
            </div>

            <p className='font-bold mt-4 mb-4 text-gray-400 uppercase text-xs'>Address</p>
            <div className='border mt-4 p-4 rounded'>
              <UpdateAddressForm lead={lead} />
            </div>
          </Widget>
        </div>
        <div>
          <CustomerWidget customer={customer} />
          <Widget margin='mt-4'>
            <p className='meta-title mb-4'>Quick Actions</p>
            <div className='gap-4 grid grid-cols-2'>
              <div className='col-span-2'>
                <ChangeStatusForm lead={lead} />
              </div>
              <ArchiveLeadButton lead={lead} />
              <DeleteLeadButton lead={lead} />
            </div>
          </Widget>
        </div>
        <div>
          {lead.message && (
            <Widget title={`${lead.customer.name} says:`} margin='mb-4'>
              <p>{lead.message}</p>
            </Widget>
          )}
          <Widget title='Quote' margin='mb-4 relative'>
            {lead.quote && (
              <>
                <p className='font-bold text-3xl'>{lead.quote.service + lead.quote.extra} kr</p>
                <p>Service Cost: {lead.quote.service} kr</p>
                <p>Extra Cost: {lead.quote.extra} kr</p>

                {editQuote && <LeadQuoteForm lead={lead} />}

                <button type='button' onClick={() => setEditQuote(!editQuote)} className='absolute text-gray-400 hover:text-black top-12 right-12'>
                  <FiEdit />
                </button>
              </>
            )}

            {!lead.quote && <LeadQuoteForm lead={lead} />}
          </Widget>
          <Widget title='Sale' margin='mb-4 relative'>
            {lead.sale && (
              <>
                <p className='font-bold text-3xl'>{lead.sale.service + lead.sale.extra} kr</p>
                <p>Service Cost: {lead.sale.service} kr (incl. RUT)</p>
                <p>Extra Cost: {lead.sale.extra} kr</p>

                {editSale && <LeadSaleForm lead={lead} />}

                <button type='button' onClick={() => setEditSale(!editSale)} className='absolute text-gray-400 hover:text-black top-12 right-12'>
                  <FiEdit />
                </button>
              </>
            )}

            {!lead.sale && <LeadSaleForm lead={lead} />}
          </Widget>
          <Widget title='Activity Log' margin='mb-4'>
            <LeadActivityLog lead={lead} />
          </Widget>
        </div>
        <div>
          <Widget title='Internal Notes' margin='mb-4'>
            <LeadNotes lead={lead} />
          </Widget>
          <Widget title='Booking Date' margin='mb-4'>
            <LeadBookingDates lead={lead} />
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