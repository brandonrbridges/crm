import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import moment from 'moment'

const LeadBookingDates = ({ lead }) => {
  const router = useRouter()
  
  const [bookingDate, setBookingDate] = useState(lead.date_booked)
  const [bookingDateEnd, setBookingDateEnd] = useState(lead.date_booked_end ? lead.date_booked_end : lead.date_booked)

  const updateBookingDate = async (date) => {
    setBookingDate(date)
    setBookingDateEnd(date)

    await fetch(`/api/leads/${lead._id}`, {
      body: JSON.stringify({ date_booked: date }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname))
    .then(() => toast.success('Your Booking Date has been saved.'))
  }

  const updateBookingDateEnd = async (date) => {
    setBookingDate(date)
    setBookingDateEnd(date)

    await fetch(`/api/leads/${lead._id}`, {
      body: JSON.stringify({ date_booked_end: date }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT'
    })
    .then(() => router.push(window.location.pathname))
    .then(() => toast.success('Your End Booking Date has been saved.'))
  }

  return (
    <>
      <label className='text-gray-400 text-sm'>Booking Date</label>
      <input type='date' name='date' value={FormatDate(bookingDate)} onChange={e => updateBookingDate(e.target.value)} />
      <label className='text-gray-400 text-sm'>Booking Date End</label>

      <input type='date' name='date' value={FormatDate(bookingDateEnd)} onChange={e => updateBookingDateEnd(e.target.value)} />
      <label className='text-gray-400 text-sm'>
        Leave this blank if it just a one-day job.
      </label>
    </>
  )
}

const FormatDate = (date) => moment(date).format('YYYY-MM-DD')

export default LeadBookingDates