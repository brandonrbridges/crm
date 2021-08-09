import Link from 'next/Link'

import { FiEye } from 'react-icons/fi'

import moment from 'moment'

import Badge from '@/components/badge'
import isToday from '@/helpers/isToday'

const Customers = ({ data }) => {
  return (
    <table className='bg-white rounded table-auto text-left w-full'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='px-2 py-4'>Name</th>
          <th className='px-2 py-4'>Email</th>
          <th className='px-2 py-4'>Creation Date</th>
          <th className='px-2 py-4'>Total Leads</th>
          <th className='px-2 py-4'>Quick Actions</th>
        </tr>
      </thead>
      <tbody className='w-full'>
          {!data.customers && (
            <tr>
              <td className='p-2 text-gray-400'>
                No Customers Found
              </td>
            </tr>
          )}
        
          {data.customers && data.customers.map((item, index) => (
            <tr key={index}>
              <td className='p-2'>
                <Link href={`/customers/${item._id}`}>
                  <a className='flex items-center'>
                    {isToday(item.creation_date) && <Badge className='mr-2' size='xs' status='new' text='New' />}
                    {item.name}
                  </a>
                </Link>
              </td>
              <td className='p-2'>{item.email}</td>
              <td className='p-2'>{moment(item.creation_date).fromNow()}</td>
              <td className='p-2'>{item.lead_ids.length}</td>
              <td className='p-2'>
                <Link href={`/customers/${item._id}`}>
                  <a className='inline-block bg-blue-100 hover:bg-blue-300 p-2 rounded-full hover:text-white'>
                    <FiEye className='h-4 w-4' />
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  )
}

export default Customers