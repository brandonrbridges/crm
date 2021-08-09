import { useEffect } from 'react'

import DashboardLayout from '@/layouts/dashboard'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const events = [
  {
    id: 0,
    title: 'test',
    allDay: true,
    start: new Date(2021, 3, 8),
    end: new Date(2021, 3, 9)
  }
]

const Page = () => {
  useEffect(() => {
    const getLeads = async () => {
      let self = this 

      const res = await fetch('http://localhost:3000/api/leads')
      const json = await res.json()
    }

    getLeads()
  })
  
  return (
    <DashboardLayout>
      <div className='flex items-center mb-4'>
        <h2 className='font-bold text-gray-400'>Calendar</h2>

      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
      />
    </DashboardLayout>
  )
}

export default Page