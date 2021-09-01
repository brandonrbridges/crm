// Layout
import DashboardLayout from '@/layouts/Dashboard'
import moment from 'moment'

// Modules
import { Calendar, momentLocalizer } from 'react-big-calendar'

// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const Page = ({ leads }) => {
  const events = []

  leads.map((lead, i) => {
    if(lead.status == 'booked') {
      const event = {
        title: `${lead.customer.name}`,
        allDay: true,
        start: moment(lead.date_booked).toDate(),
        end: moment(lead.date_booked).toDate(),
      }

      events.push(event)
    }
  })
  
  return (
    <DashboardLayout title='Calendar'>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={events}
        style={{ height: '75vh' }}
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