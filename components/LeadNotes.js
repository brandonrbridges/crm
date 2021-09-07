import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { FiLoader } from 'react-icons/fi'

const LeadNotes = ({ lead }) => {
  const router = useRouter()

  const [notes, setNotes] = useState(lead.notes)
  const [saving, setSaving] = useState(false)

  useEffect(async () => {
    setSaving(true)
    
    await fetch(`/api/leads/${router.query._id}`, {
      body: JSON.stringify({ notes: notes }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname))
    .then(() => setSaving(false))
  }, [notes])
  
  return (
    <>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} className='border p-2 rounded w-full' />

      {saving && <SavingSpinner />}
    </>
  )
}

const SavingSpinner = () => {
  return (
    <div className='flex items-center mt-2 text-gray-400 text-sm'>
      <FiLoader className='animate-spin mr-2' /> Saving..
    </div>
  )
}

export default LeadNotes