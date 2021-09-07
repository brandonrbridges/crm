import { useRouter } from 'next/router'

const ArchiveLeadButton = ({ lead }) => {
  const isArchived = lead.archived

  const archiveLead = async (_id) => {
    await fetch(`/api/leads/${_id}`, {
      body: JSON.stringify({
        archived: !isArchived
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname)) // Soft Refresh
    .then(() => toast.success('Lead has been archived successfully.')) // Toast
  }
  
  return (
    <button onClick={() => archiveLead(lead._id)} className='hover:bg-gray-200 border py-1 rounded text-sm transition-all w-full'>
      {(!isArchived ? 'Archive' : 'Unarchive')}
    </button>
  )
}

export default ArchiveLeadButton