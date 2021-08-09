import { useState } from 'react'

import Badge from '@/components/badge'
import Widget from '@/components/widget'

import isToday from '@/helpers/isToday'

import moment from 'moment'

import { FiLink2, FiMail, FiPhoneCall, FiThumbsDown, FiThumbsUp } from 'react-icons/fi'

const CustomerWidget = ({ customer }) => {
  const [editMode, setEditMode] = useState(false)
  
  return (
    <Widget>
      {/* Complete soon */}
      {/* <button onClick={() => setEditMode(!editMode)}>Toggle Edit Mode</button> */}

      <div className='block bg-gray-300 h-24 mb-6 mx-auto rounded-full w-24'></div>

      {isToday(customer.creation_date) && <div className='mb-2 text-center w-full'><Badge className='mx-auto' size='xs' status='new' text='New Customer' /></div>}

      <h1 className='flex font-bold items-center justify-center mb-4 text-3xl text-center'>{customer.name}</h1>

      <p className='text-center text-gray-500 text-sm'>Added {moment(customer.creation_date).format('DD/MM/YYYY HH:mm')}</p>
      <p className='text-center text-gray-400 text-xs'>({moment(customer.creation_date).fromNow()})</p>

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
              <td>
                {!editMode ? (
                  <a href={`mailto:${customer.email}`}>
                    {customer.email}
                  </a>
                ) : (
                  <input type='email' name='email' placeholder={(customer.email ? customer.email : 'Enter Email')} className='w-full' />
                )}
              </td>
            </tr>
            <tr>
              <td className='text-gray-500'>Address</td>
              <td className='text-gray-400'>/</td>
            </tr>
            <tr>
              <td className='text-gray-500'>Company</td>
              <td className={customer.company ? '' : 'text-gray-400'}>{customer.company ? customer.company : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className='border mt-4 p-4 rounded'>
        <p className='meta-title mb-4'>Customer Source</p>
        <div className='border flex items-center justify-center py-2 px-4 rounded text-center'>
          <FiLink2 className='mr-2' /> Website
        </div>

        <p className='meta-title my-4'>Rate this Customer</p>
        <div className='gap-4 grid grid-cols-2'>
          <button className='bg-green-400 hover:bg-green-500 flex items-center justify-center p-2 rounded'>
            <FiThumbsUp className='mr-2' /> Good Lead
          </button>
          <button className='border border-gray-200 hover:bg-gray-200 flex items-center justify-center p-2 rounded text-gray-500'>
            <FiThumbsDown className='mr-2' /> Bad Lead
          </button>
        </div>
      </div>
    </Widget>
  )
}

export default CustomerWidget