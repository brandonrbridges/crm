// React
import { useState } from 'react'

// Components
import Badge from '@/components/Badge'
import Widget from '@/components/Widget'

// Helpers
import isToday from '@/helpers/isToday'

// Modules
import { FiMail, FiPhoneCall } from 'react-icons/fi'
import moment from 'moment'

const CustomerWidget = ({ customer }) => {
  const [editMode, setEditMode] = useState(false)
  
  return (
    <Widget>
      {/* Complete soon */}
      {/* <button onClick={() => setEditMode(!editMode)}>Toggle Edit Mode</button> */}

      {/* <div className='block bg-gray-300 h-24 mb-6 mx-auto rounded-full w-24'></div> */}

      {isToday(customer.creation_date) && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' status='new' text='New Customer' /></div>}

      <h1 className='flex font-bold items-center justify-center mb-4 text-3xl text-center'>
        {customer.name}
        </h1>

      <p className='text-center text-gray-500 text-sm'>
        Added {moment(customer.creation_date).format('DD/MM/YYYY HH:mm')}
      </p>
      <p className='text-center text-gray-400 text-xs'>
        ({moment(customer.creation_date).fromNow()})
      </p>

      <div className='justify-center gap-4 grid grid-cols-4 my-8'>
        <div className='col-span-2 text-center'>
          <a href={`mailto:${customer.email}`} className='inline-block bg-blue-400 hover:bg-blue-500 p-4 rounded-full'>
            <FiMail className='h-5 w-5 text-white' />
          </a>
        </div>
        <div className='col-span-2 text-center'>
          <a href={`tel:${customer.phone}`} className='inline-block bg-blue-400 hover:bg-blue-500 p-4 rounded-full'>
            <FiPhoneCall className='h-5 w-5 text-white' />
          </a>
        </div>
      </div>

      <div className='border my-4 p-4 rounded'>
        <table className='w-full'>
          <tbody>
            <tr>
              <td className='text-gray-500'>Phone</td>
              <td>
                {!editMode ? (
                  <a href={`tel:${customer.phone}`}>
                    {customer.phone}
                  </a>
                ) : (
                  <>
                    <input type='tel' name='phone' placeholder={(customer.phone ? customer.phone : 'Enter Phone Number')} className='w-full' />
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className='text-gray-500'>Email</td>
              <td className='whitespace-pre'>
                {!editMode ? (
                  <a href={`mailto:${customer.email}`}>
                    {(customer.email).substring(0, 24)}..
                  </a>
                ) : (
                  <input type='email' name='email' placeholder={(customer.email ? customer.email : 'Enter Email')} className='w-full' />
                )}
              </td>
            </tr>
            {/*  
            <tr>
              <td className='text-gray-500'>Address</td>
              <td className='text-gray-400'>/</td>
            </tr>
            <tr>
              <td className='text-gray-500'>Company</td>
              <td className={customer.company ? '' : 'text-gray-400'}>{customer.company ? customer.company : 'N/A'}</td>
            </tr>
            */}
          </tbody>
        </table>
      </div>
    </Widget>
  )
}

export default CustomerWidget