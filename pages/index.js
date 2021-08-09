import Link from 'next/Link'

import DashboardLayout from '@/layouts/dashboard'
import Leads from '@/components/leads'

import isToday from '@/helpers/isToday'
import wasYesterday from '@/helpers/wasYesterday'

import { FiArrowRightCircle, FiBarChart, FiCornerRightDown, FiShoppingBag, FiShoppingCart } from 'react-icons/fi'

const Page = ({ data }) => {
  let leadsToday = 0, leadsYesterday = 0

  data.leads.map((lead) => {
    if(isToday(lead.creation_date)) {
      leadsToday++
    }

    if(wasYesterday(lead.creation_date)) {
      leadsYesterday++
    }
  })
  
  return (
    <DashboardLayout>
      <div className='flex items-center mb-4'>
        <h2 className='font-bold text-gray-400'>Dashboard</h2>
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <div className='gap-4 grid grid-cols-2'>
          <div className='bg-white dark:bg-gray-700 p-8 rounded'>
            <div className='flex'>
              <h3 className='font-semibold text-gray-400 dark:text-gray-200'>New Leads <span className='text-xs'>(Today)</span></h3>
              <div className='bg-green-100 inline-block ml-auto p-2 rounded'>
                <FiCornerRightDown className='h-6 text-green-400 w-6' />
              </div>
            </div>
            <p>
              <span className='font-semibold text-4xl dark:text-white'>
                {leadsToday}
              </span>
                {leadsToday !== leadsYesterday ? (
                  <span className={`ml-2 text-${(leadsToday > leadsYesterday ? 'green' : 'red')}-400`}>
                    {(leadsYesterday - leadsToday).toString().replace('-', '+')} {(leadsToday > leadsYesterday ? 'more than' : 'less than')} yesterday
                  </span>
                ) : (
                  <span className='ml-2 text-gray-400'>
                    equal to yesterday              
                  </span>
                )}
            </p>
          </div>
          <div className='bg-white dark:bg-gray-700 p-8 rounded'>
            <div className='flex'>
              <h3 className='font-semibold text-gray-400 dark:text-gray-200'>Today's Sales</h3>
              <div className='bg-yellow-100 inline-block ml-auto p-2 rounded'>
                <FiShoppingBag className='h-6 text-yellow-400 w-6' />
              </div>
            </div>
            <p>
              <span className='font-semibold text-4xl dark:text-white'>
                0
              </span>
              <span className='ml-2 text-gray-400'>
                +0 from last yesterday
              </span>
            </p>
          </div>
          <div className='bg-white dark:bg-gray-700 p-8 rounded'>
            <div className='flex'>
              <h3 className='font-semibold text-gray-400 dark:text-gray-200'>Monthly Sales</h3>
              <div className='bg-blue-100 inline-block ml-auto p-2 rounded'>
                <FiShoppingCart className='h-6 text-blue-400 w-6' />
              </div>
            </div>
            <p>
              <span className='font-semibold text-4xl dark:text-white'>
                0
              </span>
              <span className='ml-2 text-gray-400'>
                +0 from last month
              </span>
            </p>
          </div>
          <div className='bg-white dark:bg-gray-700 p-8 rounded'>
            <div className='flex'>
              <h3 className='font-semibold text-gray-400 dark:text-gray-200'>Monthly Revenue</h3>
              <div className='bg-pink-100 inline-block ml-auto p-2 rounded'>
                <FiBarChart className='h-6 text-pink-400 w-6' />
              </div>
            </div>
            <p>
              <span className='font-semibold text-4xl dark:text-white'>
                0
              </span>
              <span className='ml-2 text-gray-400'>
                +0 from last month
              </span>
            </p>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-700 p-8 rounded'>
            <div className='flex'>
              <h3 className='font-semibold text-gray-400 dark:text-gray-200'>Monthly Profit</h3>
              <div className='bg-purple-100 inline-block ml-auto p-2 rounded'>
                <FiCornerRightDown className='h-6 text-purple-400 w-6' />
              </div>
            </div>
            <p className='text-gray-400 text-sm'>A chart will go here</p>
          </div>
      </div>

      <div className='flex items-center my-4'>
        <h2 className='font-bold text-gray-400'>Leads</h2>
        <Link href='/leads'>
          <a className='hover:bg-gray-600 border border-gray-600 dark:border-gray-400 dark:hover:bg-gray-400 flex items-center ml-auto px-4 py-1 rounded text-sm text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white'>
            View All Leads <FiArrowRightCircle className='h-4 ml-2 w-4' />
          </a>
        </Link>
      </div>

      <Leads data={data} />
      
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
      data: json
    }
  }
}

export default Page