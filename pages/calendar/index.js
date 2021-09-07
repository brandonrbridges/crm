// React
import { useState } from 'react'

// Layout
import DashboardLayout from '@/layouts/Dashboard'
import moment from 'moment'

// Modules
import { Calendar, momentLocalizer } from 'react-big-calendar'

// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { FiXCircle } from 'react-icons/fi'

const localizer = momentLocalizer(moment)

const Page = ({ leads }) => {
  const events = []
  const [showModal, setShowModal] = useState(false)
  const [eventInfo, setEventInfo] = useState(null)

  leads.map((lead, i) => {
    if(lead.status == 'booked') {

      let event = {}
      
      if(lead.date_booked && lead.date_booked_end) {
        event = {
          title: `${lead.customer.name} | ${lead.kvm} kvm`,
          allDay: false,
          start: moment(lead.date_booked).toDate(),
          end: moment(lead.date_booked_end).toDate(),
          lead: lead
        }
      } else {
        event = {
          title: `${lead.customer.name} | ${lead.kvm} kvm`,
          allDay: true,
          start: moment(lead.date_booked).toDate(),
          end: moment(lead.date_booked).toDate(),
          lead: lead
        }
      }

      events.push(event)
    }
  })

  const clickedEvent = async (event) => {
    setEventInfo(event.lead)
    setShowModal(true)
  }

  const closeModal = () => {
    setEventInfo(null)
    setShowModal(false)
  }
  
  return (
    <DashboardLayout title='Calendar'>
      {showModal && (
        <div onClick={() => closeModal()} className='absolute block bg-black bg-opacity-50 flex h-screen items-center justify-center left-0 top-0 w-full z-50'>
          <div className='bg-white p-4 relative rounded w-1/2'>
            <button onClick={() => closeModal()} className='absolute text-gray-400 hover:text-black top-12 right-12'>
              <FiXCircle />
            </button>
            <p className='font-bold text-xl'>{eventInfo.customer.name}</p>
          </div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={events}
        style={{ height: '75vh' }}
        onSelectEvent={event => clickedEvent(event)}
      />
    </DashboardLayout>
  )
}

export async function getServerSideProps(context) {
  const options = { headers: { cookie: context.req.headers.cookie } }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/leads`, options)
  const json = await res.json()

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
      leads: json.leads
    }
  }
}

export default Page