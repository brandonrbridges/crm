// Modules
import { FiCircle } from 'react-icons/fi'
import moment from 'moment'

const LeadActivityLog = ({ lead }) => {
  return (
    <ul className='text-sm'>
      <li className='flex items-center'>
        <FiCircle className='h-4 mr-2 text-green-500 w-4' /> 
        Lead created 
        <span className='ml-auto text-gray-400 text-xs'>
          {moment(lead.creation_date).fromNow()}
        </span>
      </li>
      {lead.activity_log && lead.activity_log.map((activity, i) => (
        <li className='flex items-center' key={i}>
          <FiCircle className='h-4 mr-2 text-gray-500 w-4' /> 
          {activity.update}
          <span className='ml-auto text-gray-400 text-xs'>
            {moment(activity.date).fromNow()}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default LeadActivityLog