// Next
import { useRouter } from 'next/router'

// Layouts
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Badge from '@/components/Badge'
import CustomerProfile from '@/components/CustomerProfile'
import Widget from '@/components/Widget'

// Modules
import { FiArrowRight } from 'react-icons/fi'
import moment from 'moment'
import toast from 'react-hot-toast'

const Page = ({ customer, leads }) => {
  // Router
  const router = useRouter()
  
  // Handle deletion of Customer
  const handleDelete = async () => {
    await fetch(`/api/customers?_id=${router.query._id}`, { method: 'DELETE' })
    .then(() => router.push('/customers'))
    .then(() => toast.success('Customer has been deleted successfully.'))
  }
  
  // Variables
  let value = 0, predictedValue = 0

  // Leads loop
  leads.map(lead => {
    // Add to Quote Value
    if(lead.quote_value && !lead.sale_value) predictedValue += lead.quote_value

    // Add to Sale Value
    if(lead.sale_value) value += lead.sale_value 
  })
  
  return (
    <DashboardLayout>
      <div className='gap-4 grid grid-cols-4 h-auto'>
        <div>
          <CustomerProfile customer={customer} />
        </div>
        <div className=''>
          <Widget margin='mb-4' title='Previous Leads'>
            <PreviousLeadsTable leads={leads} />
          </Widget>
          {leads.length > 0 && (
            <Widget title='Financial Overview' tip='Only sold leads increase this value.'>
              <p className='flex items-end'>
                <span className='font-bold text-3xl'>
                  {value} kr
                </span>
                {predictedValue > 0 && (
                  <span className='flex font-bold items-center ml-2 text-gray-400'>
                    <FiArrowRight className='mr-1' /> {predictedValue + value} kr after sale
                  </span>
                )}
              </p>
            </Widget>
          )}
        </div>
        <div>
          <Widget title='Quick Actions'>
            <div className='gap-y-4 grid grid-cols-1'>
              <button onClick={() => handleDelete()} className='border py-1 rounded w-full'>
                Delete
              </button>
            </div>
          </Widget>
        </div>
      </div>
    </DashboardLayout>
  )
}

const PreviousLeadsTable = ({ leads }) => {
  return (
    <table className='w-full'>
      <thead>
        <tr className='text-left'>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead, index) => (
          <tr className='text-sm' key={index}>
            <td>{moment(lead.creation_date).format('DD/MM/YY @ h:mm a')}</td>
            <td>{lead.sale_value ? `${lead.sale_value} kr` : lead.quote_value ? `${lead.quote_value} kr` : 'N/A'}</td>
            <td><Badge size='xs' status={lead.status} text={lead.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export async function getServerSideProps(context) {
  const options = { headers: { cookie: context.req.headers.cookie } }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customers/${context.params._id}`, options)
  const json = await res.json()

  const leads_res = await fetch(`${process.env.NEXTAUTH_URL}/api/leads?customer_id=${context.params._id}`, options)
  const leads_json = await leads_res.json()

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
      customer: json.customer[0],
      leads: leads_json.leads
    }
  }
}

export default Page