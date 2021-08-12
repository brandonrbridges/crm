// React
import { useEffect, useState } from 'react'

// Next
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components
import AddLead from '@/components/AddLead'
import Badge from '@/components/Badge'

// Helpers
import isToday from '@/helpers/isToday'

// Modules
import { FiEye, FiMail, FiPhoneCall, FiRefreshCcw, FiToggleRight, FiTrash } from 'react-icons/fi'
import moment from 'moment'
import toast from 'react-hot-toast'

const Leads = ({ leads }) => {
  // State
  const [filteredLeads, setFilteredLeads] = useState(leads)

  // Router
  const router = useRouter()
  
  // Variables
  const headers = ['Customer', 'Phone', 'Email', 'Type', 'KVM', 'City', 'Date', 'Status', 'Source', 'Quick Actions', <AddLead />]

  const filter = value => {
    let array = []

    leads.map(lead => {
      if(lead.status == value) array.push(lead)
    })

    setFilteredLeads(array)
  }

  const resetFilter = () => {
    setFilteredLeads(leads)
  }

  return (
    <>
      <div className='bg-gray-200 flex mb-4 p-2 rounded w-full'>
        <button className='bg-gray-100 px-2 py-1 rounded text-gray-400 text-sm mr-4' onClick={() => resetFilter()}>
          Show All
        </button>
        <button className='bg-pink-100 px-2 py-1 rounded text-pink-400 text-sm mr-4' onClick={() => filter('pending')}>
          Show Pending
        </button>
        <button className='bg-indigo-100 px-2 py-1 rounded text-indigo-400 text-sm mr-4' onClick={() => filter('called')}>
          Show Called
        </button>
        <button className='bg-indigo-100 px-2 py-1 rounded text-indigo-400 text-sm mr-4' onClick={() => filter('quoted')}>
          Show Quoted
        </button>
        <button className='bg-green-100 px-2 py-1 rounded text-green-400 text-sm mr-4' onClick={() => filter('sold')}>
          Show Sold
        </button>
        <button className='bg-green-100 px-2 py-1 rounded text-green-400 text-sm mr-4' onClick={() => filter('booked')}>
          Show Booked
        </button>
        <button className='bg-green-100 px-2 py-1 rounded text-green-400 text-sm mr-4' onClick={() => filter('complete')}>
          Show Complete
        </button>
        <button className='bg-red-100 px-2 py-1 rounded text-red-400 text-sm mr-4' onClick={() => filter('rejected')}>
          Show Rejected
        </button>
        <button className='bg-gray-100 flex items-center px-2 py-1 ml-auto rounded text-gray-400 text-sm' onClick={() => resetFilter()}>
          <FiRefreshCcw className='h-3 mr-2 w-3' /> Reset Filter
        </button>
      </div>
      <table className='bg-white rounded table-auto text-left w-full'>
        <TableHead headers={headers} />
        <tbody className='w-full'>
            {!leads && (
              <tr>
                <td className='p-2 text-gray-400'>
                  No Leads found
                </td>
              </tr>
            )}

            {filteredLeads && filteredLeads.map((lead, index) => <TableRow lead={lead} key={index} />)}
          </tbody>
      </table>
    </>
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

const TableRow = ({ lead }) => {
  // Router
  const router = useRouter()

  // Handle deletion
  const handleDelete = async (_id) => {
    await fetch(`/api/leads?_id=${_id}`, { method: 'DELETE' })
    .then(() => router.push('/leads'))
    .then(() => toast.success('Lead has been deleted successfully.'))
  }

  return (
    <tr>
      <td className='p-2'>
        <Link href={`/leads/${lead._id}`}>
          <a className='flex leads-center'>
            {isToday(lead.creation_date) && <Badge className='mr-1' size='xs' status='new' text='New' />}
            {(lead.customer.email == 'brandon@visually.digital' ? <Badge className='mr-1' size='xs' text='Developer' /> : '')}
            {lead.customer.name}
          </a>
        </Link>
      </td>
      <td className='p-2'>
        <a href={`tel:${lead.customer.phone}`}>
          {lead.customer.phone}
        </a>
      </td>
      <td className='p-2'>
        <a href={`mailto:${lead.customer.email}`}>
          {lead.customer.email}
        </a>
      </td>
      <td className='capitalize p-2'>{lead.type}</td>
      <td className='p-2'>{lead.kvm} kvm</td>
      <td className='capitalize p-2'>{lead.city}</td>
      <td className='p-2'>
        {moment(lead.creation_date).format('DD/MM/YYYY')} &nbsp;
        <span className='text-gray-400 text-xs'>({moment(lead.creation_date).fromNow()})</span>
      </td>
      <td className='p-2'><Badge size='sm' status={lead.status} text={lead.status} /></td>
      <td className='p-2'>
        {lead.source}
      </td>
      <td className='flex p-2'>
        <Link href={`/leads/${lead._id}`}>
          <a className='inline-block bg-blue-100 hover:bg-blue-300 mr-2 p-2 rounded-full hover:text-white'>
            <FiEye className='h-4 w-4' />
          </a>
        </Link>
        {lead.customer.phone && (
          <a href={`tel:${lead.customer.phone}`} className='inline-block bg-purple-100 hover:bg-purple-300 mr-2 p-2 rounded-full hover:text-white'>
            <FiPhoneCall className='h-4 w-4' />
          </a>
        )}
        {lead.customer.email && (
          <a href={`mailto:${lead.customer.email}`} className='inline-block bg-purple-100 hover:bg-purple-300 mr-2 p-2 rounded-full hover:text-white'>
            <FiMail className='h-4 w-4' />
          </a>
        )}
        <button onClick={() => handleDelete(lead._id)} className='inline-block bg-red-100 hover:bg-red-300 p-2 rounded-full hover:text-white'>
          <FiTrash className='h-4 w-4' />
        </button>
      </td>
    </tr>
  )
}

export default Leads