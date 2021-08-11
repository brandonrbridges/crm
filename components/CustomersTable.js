// Next
import Link from 'next/link'

// Components
import Badge from '@/components/Badge'
import isToday from '@/helpers/isToday'

// Modules
import { FiEye } from 'react-icons/fi'
import moment from 'moment'

const Customers = ({ customers }) => {
  // Variables
  const headers = ['Name', 'Phone', 'Email', 'Date', 'Total Leads', 'Quick Actions']
  
  return (
    <table className='bg-white rounded table-auto text-left w-full'>
      <TableHead headers={headers} />
      <tbody className='w-full'>
        {!customers && (
          <tr>
            <td className='p-2 text-gray-400'>
              No Customers Found
            </td>
          </tr>
        )}
      
        {customers && customers.map((customer, index) => <TableRow customer={customer} key={index} />)}
      </tbody>
    </table>
  )
}

const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr className='bg-gray-100'>
        {headers.map((header, index) => <th key={index} className='px-2 py-4'>{header}</th>)}
      </tr>
    </thead>
  )
}

const TableRow = ({ customer, key }) => {
  return (
    <tr key={key}>
      <td className='p-2'>
        <Link href={`/customers/${customer._id}`}>
          <a className='flex items-center'>
            {isToday(customer.creation_date) && <Badge className='mr-1' size='xs' status='new' text='New' />}
            {(customer.email == 'brandon@visually.digital' ? <Badge className='mr-1' size='xs' text='Developer' /> : '')}
            {customer.name}
          </a>
        </Link>
      </td>
      <td className='p-2'>
        <a href={`mailto:${customer.phone}`}>
          {customer.phone}
        </a>
      </td>
      <td className='p-2'>
        <a href={`mailto:${customer.email}`}>
          {customer.email}
        </a>
      </td>
      <td className='p-2'>
        {moment(customer.creation_date).format('DD/MM/YYYY')} &nbsp;
        <span className='text-gray-400 text-xs'>({moment(customer.creation_date).fromNow()})</span>
      </td>
      <td className='p-2'>{customer.lead_ids.length}</td>
      <td className='p-2'>
        <Link href={`/customers/${customer._id}`}>
          <a className='inline-block bg-blue-100 hover:bg-blue-300 p-2 rounded-full hover:text-white'>
            <FiEye className='h-4 w-4' />
          </a>
        </Link>
      </td>
    </tr>
  )
}

export default Customers