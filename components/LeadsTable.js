// React
import { useEffect, useState } from 'react'

// Next
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components
import AddLead from '@/components/AddLead'
import Badge from '@/components/Badge'

// Modules
import { FiCheckCircle, FiFileText, FiEye, FiPhoneCall, FiRefreshCcw, FiXCircle } from 'react-icons/fi'
import moment from 'moment'
import toast from 'react-hot-toast'

const Leads = ({ leads, prefilter, hideFilters }) => {
  // State
  const [filteredLeads, setFilteredLeads] = useState(leads)
  const [filterText, setFilterText] = useState(null)

  // Variables
  const headers = ['Status', 'Customer', 'Phone', 'Email', 'Source', 'Type', 'KVM', 'City', 'Date', 'Quick Actions', <AddLead />]

  // Filter
  const filter = value => {
    let array = []

    leads.map(lead => {
      if(lead.status == value) array.push(lead)
    })

    setFilterText(value)
    setFilteredLeads(array)
  }

  // Reset filter
  const resetFilter = () => {
    setFilterText(null)
    setFilteredLeads(leads)
  }

  // Apply prefilter on load
  useEffect(() => {
    if(prefilter) {
      filter(prefilter)
    }
  }, [])

  return (
    <>
      {!hideFilters && (
        <div className='bg-white flex mb-4 p-2 rounded w-full'>
          <button className='bg-gray-100 hover:bg-red-400 flex items-center px-4 py-1 rounded-full text-gray-500 hover:text-white transition-all text-sm mr-4' onClick={() => resetFilter()}>
            <FiRefreshCcw className='h-3 mr-2 w-3' /> Reset Filter
          </button>
          <button className={`${filterText == 'new' || filterText == null ? 'bg-pink-100 text-pink-400' : filterText !== null ? 'bg-transparent border-pink-300 text-pink-400' : ''} border hover:bg-pink-300 border-transparent px-4 py-1 rounded-full hover:text-white text-sm transition-all mr-4`} onClick={() => filter('new')}>
            New
          </button>
          <button className={`${filterText == 'called' || filterText == null ? 'bg-indigo-100 text-indigo-400' : filterText !== null ? 'bg-transparent border-indigo-300 text-indigo-400' : ''} border hover:bg-indigo-300 border-transparent px-4 py-1 rounded-full hover:text-white text-sm transition-all mr-4`} onClick={() => filter('called')}>
            Called
          </button>
          <button className={`${filterText == 'quoted' || filterText == null ? 'bg-yellow-100 text-yellow-400' : filterText !== null ? 'bg-transparent border-yellow-300 text-yellow-400' : ''} border hover:bg-yellow-300 border-transparent px-4 py-1 rounded-full hover:text-white text-sm transition-all mr-4`} onClick={() => filter('quoted')}>
            Quoted
          </button>
          
        </div>
      )}
      <table className='table-auto'>
        <TableHead headers={headers} />
        <tbody className='w-full'>
            {!leads && (
              <tr>
                <td className=' text-gray-400'>
                  No Leads found
                </td>
              </tr>
            )}

            {filteredLeads && filteredLeads.map((lead, i) => <TableRow lead={lead} key={i} />)}
          </tbody>
      </table>
    </>
  )
}

const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, i) => <th key={i} className='px-2 py-4'>{header}</th>)}
      </tr>
    </thead>
  )
}

const TableRow = ({ lead }) => {
  // Router
  const router = useRouter()

  // Handle status change
  const handleStatusChange = async (newValue) => {
    let _id = (router.query._id ? router.query._id : lead._id)

    const res = await fetch(`/api/leads/${_id}`, {
      body: JSON.stringify({
        status: newValue
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => toast.success('Status has been updated successfully.')) // Toast
    .then(() => router.push(window.location.pathname, { shallow: false })) // Soft Refresh
  }

  return (
    <tr>
      <td>
        <Badge size='sm' status={lead.status} text={lead.status} className='w-full' />
        </td>
      <td>
        <Link href={`/leads/${lead._id}`}><a className='flex leads-center' target='_blank'>{lead.customer.name}</a></Link>
      </td>
      <td>
        <a href={lead.customer.phone ? `tel:${lead.customer.phone}` : ''}>
          {lead.customer.phone ? lead.customer.phone : <FiXCircle className='mr-2 text-gray-400' />}
        </a>
      </td>
      <td>
        <a href={lead.customer.email ? `mailto:${lead.customer.email}?subject=RE: Offert | ${lead.customer.name} | ${lead.city} ` : ''}>
          {lead.customer.email ? lead.customer.email : <FiXCircle className='mr-2 text-gray-400' />}
        </a>
      </td>
      <td>
        {lead.source}
      </td>
      <td className='capitalize '>{lead.type}</td>
      <td>{lead.kvm} kvm</td>
      <td className='capitalize '>{lead.city}</td>
      <td>
        {moment(lead.creation_date).format('DD/MM/YYYY')} &nbsp;
        <span className='text-gray-400 text-xs'>({moment(lead.creation_date).fromNow()})</span>
      </td>
      <td className='flex'>
        <Link href={`/leads/${lead._id}`}>
          <a className=' bg-pink-100 button hover:bg-pink-300 hover:text-white' target='_blank'>
            <FiEye className='h-4 w-4' />
          </a>
        </Link>
        <button onClick={() => handleStatusChange('called')} className='bg-blue-100 hover:bg-blue-300 hover:text-white'>
          <FiPhoneCall className='h-4 w-4' />
        </button>
        <button onClick={() => handleStatusChange('quoted')} className='bg-yellow-100 hover:bg-blue-300 hover:text-white'>
          <FiFileText className='h-4 w-4' />
        </button>
        <button onClick={() => handleStatusChange('accepted')} className='bg-green-100 hover:bg-green-300 hover:text-white'>
          <FiCheckCircle className='h-4 w-4' />
        </button>
        <button onClick={() => handleStatusChange('rejected')} className='bg-red-100 hover:bg-red-300 hover:text-white'>
          <FiXCircle className='h-4 w-4' />
        </button>
      </td>
    </tr>
  )
}

export default Leads