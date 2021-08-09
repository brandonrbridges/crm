import Link from 'next/link'
import { useRouter } from 'next/router'

import DashboardLayout from '@/layouts/dashboard'

import moment from 'moment'

import { FiArrowLeftCircle, FiArrowRight } from 'react-icons/fi'

import Badge from '@/components/badge'
import CustomerWidget from '@/components/customerWidget'
import Widget from '@/components/widget'

import toast from 'react-hot-toast'

const Page = ({ data, leads }) => {
  const router = useRouter()
  
  const handleDelete = async () => {
    await fetch(`/api/customers?_id=${router.query._id}`, { method: 'DELETE' })
    .then(() => router.push('/customers'))
    .then(() => toast.success('Customer has been deleted successfully.'))
  }
  
  let value = 0;
  let predictedValue = 0;

  leads.map(lead => {
    if(lead.sale_value) {
      value += lead.sale_value 
    }

    if(lead.quote_value && !lead.sale_value) {
      predictedValue += lead.quote_value
    }
  })
  
  return (
    <DashboardLayout>
      <Link href='/customers'>
        <a className='flex items-center mb-4 text-gray-400 hover:text-black'>
          <FiArrowLeftCircle className='mr-2' /> Go back to Customers
        </a>
      </Link>


      <div className='gap-4 grid grid-cols-4 h-auto'>
        <div>
          <CustomerWidget customer={data} />
        </div>
        <div className=''>
          <Widget margin='mb-4'>
            <p className='meta-title mb-4'>Leads</p>
            <div className='gap-y-4 grid grid-cols-1'>
              {leads.length !== 0 && leads.map((lead, index) => (
                <Link href={`/leads/${lead._id}`} key={index}>
                  <a className='border flex items-center justify-between p-2 rounded w-full'>
                    {moment(lead.creation_date).format('DD/MM/YYYY')}
                    <Badge size='xs' status={lead.status} text={lead.status} />
                  </a>
                </Link>
              ))}

              {leads.length == 0 && <p className='text-gray-400 text-sm'>This customer has not submitted a lead yet</p>}
            </div>
          </Widget>
          {leads.length > 0 && (
            <Widget>
              <p className='meta-title mb-1'>Financial Overview</p>
              <p className='mb-4 text-gray-400 text-xs'>Only Sold leads increase this value.</p>
              <p className='flex items-end mb-8'>
                <span className='font-bold text-3xl'>
                  {value} kr
                </span>
                {predictedValue > 0 && (
                  <span className='flex font-bold items-center ml-2 text-gray-400'>
                    <FiArrowRight className='mr-1' /> {predictedValue + value} kr after sale
                  </span>
                )}
              </p>
              <p className='meta-title mb-4'>Previous Leads</p>
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
                      <td> 
                        
                        {
                          lead.sale_value ? (
                            <>{lead.sale_value} kr</>
                          ) : lead.quote_value ? (
                            <>{lead.quote_value} kr</>
                          ) : (
                            <>N/A</>
                          )
                        }
                      </td>
                      <td><Badge size='xs' status={lead.status} text={lead.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Widget>
          )}
        </div>
        <div>
          <Widget>
            <p className='meta-title mb-4'>Quick Actions</p>
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
      data: json.customer[0],
      leads: leads_json.leads
    }
  }
}

export default Page