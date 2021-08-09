import Link from 'next/Link'
import { useRouter } from 'next/router'

import moment from 'moment'

import { FiDelete, FiEye } from 'react-icons/fi'

import Badge from '@/components/badge'

import isToday from '@/helpers/isToday'

import toast from 'react-hot-toast'

const Leads = ({ data }) => {
  const router = useRouter()
  
  const handleDelete = async (_id) => {
    await fetch(`/api/leads?_id=${_id}`, { method: 'DELETE' })
    .then(() => router.push('/leads'))
    .then(() => toast.success('Lead has been deleted successfully.'))
  }
  
  return (
    <table className='bg-white rounded table-auto text-left w-full'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='px-2 py-4'>Customer</th>
          <th className='px-2 py-4'>Type</th>
          <th className='px-2 py-4'>KVM</th>
          <th className='px-2 py-4'>City</th>
          <th className='px-2 py-4'>Creation Date</th>
          <th className='px-2 py-4'>Status</th>
          <td className='px-2 py-4'>Quick Actions</td>
        </tr>
      </thead>
      <tbody className='w-full'>
          {!data.leads && (
            <tr>
              <td className='p-2 text-gray-400'>
                No Leads found
              </td>
            </tr>
          )}

          {data.leads && data.leads.map((item, index) => (
            <tr key={index}>
              <td className='p-2'>
                <Link href={`/leads/${item._id}`}>
                  <a className='flex items-center'>
                    {isToday(item.creation_date) && <Badge className='mr-2' size='xs' status='new' text='New' />}
                    {item.customer.name}
                  </a>
                </Link>
              </td>
              <td className='capitalize p-2'>{item.type}</td>
              <td className='p-2'>{item.kvm} kvm</td>
              <td className='capitalize p-2'>{item.city}</td>
              <td className='p-2'>{moment(item.creation_date).fromNow()}</td>
              <td className='p-2'>
                <Badge size='sm' status={item.status} text={item.status} />
              </td>
              <td className='flex p-2'>
                <Link href={`/leads/${item._id}`}>
                  <a className='inline-block bg-blue-100 hover:bg-blue-300 mr-2 p-2 rounded-full hover:text-white'>
                    <FiEye className='h-4 w-4' />
                  </a>
                </Link>
                <button onClick={() => handleDelete(item._id)} className='inline-block bg-red-100 hover:bg-red-300 p-2 rounded-full hover:text-white'>
                  <FiDelete className='h-4 w-4' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  )
}

export default Leads