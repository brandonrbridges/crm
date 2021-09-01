// Next
import Link from 'next/link'

// Next Auth
import { useSession } from 'next-auth/client'

// Layouts
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Leads from '@/components/LeadsTable'
import Widget from '@/components/Widget'

// Helpers
import calculateNetProfit from '@/helpers/calculateNetProfit'
import isThisMonth from '@/helpers/isThisMonth'
import isToday from '@/helpers/isToday'
import wasLastMonth from '@/helpers/wasLastMonth'
import wasYesterday from '@/helpers/wasYesterday'

// Modules
import { Bar } from 'react-chartjs-2'
import { FiArrowRightCircle, FiBarChart, FiCornerRightDown, FiShoppingBag, FiShoppingCart } from 'react-icons/fi'

const Page = ({ data }) => {
  const [session, loading] = useSession()

  return (
    <DashboardLayout>
      { session && <h1 className='font-bold mb-4 text-3xl'>Hello, {session.user.name}!</h1>}
      
      <div className='gap-4 grid grid-cols-2'>
        <div className='gap-4 grid md:grid-cols-1'>
          <NewLeadsWidget data={data} />
          <TodaysSalesWidget data={data} />
          <MonthlySalesWidget data={data} />
          <MonthlyGrossProfitWidget data={data} />
        </div>
        <NetProfitWidget data={data} />
      </div>

      <div className='my-4'>
        <h2 className='font-bold text-gray-400'>Leads</h2>
      </div>

      <Leads leads={data.leads} />
      
    </DashboardLayout>
  )
}

const NewLeadsWidget = ({ data }) => {
  let leadsToday = 0, leadsYesterday = 0 
  let leadsPending = 0, leadsQuoted = 0
  let leadsQuoteTotal = 0
  
  data.leads.map((lead) => {
    if(isToday(lead.creation_date)) {
      leadsToday++

      if(lead.status == 'new') leadsPending++
      if(lead.status == 'quoted' ) leadsQuoted++

      if(lead.status !== 'new') {
        leadsQuoteTotal += (lead.quote.service + lead.quote.extra)
      }
    }

    if(wasYesterday(lead.creation_date)) {
      leadsYesterday++
    }
  })
  
  return (
    <Widget title='New Leads Today'>
      <div className='flex'>
        <div className='absolute bg-green-100 inline-block ml-auto p-2 rounded top-10 right-10'>
          <FiCornerRightDown className='h-6 text-green-400 w-6' />
        </div>
      </div>
      <p className='font-semibold text-4xl'>
        {leadsToday}
      </p>
      <p className='mt-4 text-gray-400 text-sm'>
        Your quotes today are worth {leadsQuoteTotal} kr
      </p>
    </Widget>
  )
}

const TodaysSalesWidget = ({ data }) => {
  let soldToday = 0, soldYesterday = 0
  let leadsSaleTotal = 0

  data.leads.map((lead) => {
    if(isToday(lead.creation_date) && lead.status == 'accepted') {
      soldToday++

      leadsSaleTotal += (lead.sale.service + lead.sale.extra)
    }

    if(wasYesterday(lead.creation_date) && lead.status == 'accepted') soldYesterday++
  })

  return (
    <Widget title='Todays Sales'>
      <div className='flex'>
        <div className='absolute bg-yellow-100 inline-block ml-auto p-2 right-10 rounded top-10'>
          <FiShoppingBag className='h-6 text-yellow-400 w-6' />
        </div>
      </div>
      <p className='font-semibold text-4xl'>
        {leadsSaleTotal} kr
      </p>
      <p className='mt-4 text-gray-400 text-sm'>
        You have sold {soldToday - soldYesterday} lead{(soldToday == 1 ? '' : 's')} today compared to yesterday
      </p>
    </Widget>
  )
}

const MonthlySalesWidget = ({ data }) => {
  let soldThisMonth = 0, soldLastMonth = 0
  let leadsSaleTotal = 0

  data.leads.map((lead) => {
    if(isThisMonth(lead.creation_date) && lead.status == 'accepted') {
      soldThisMonth++

      leadsSaleTotal += (lead.sale.service + lead.sale.extra)
    }

    if(wasLastMonth(lead.creation_date) && lead.status == 'accepted') soldLastMonth++
  })
  
  return (
    <Widget title='Monthly Sales'>
      <div className='flex'>
        <div className='absolute bg-blue-100 inline-block ml-auto p-2 right-10 rounded top-10'>
          <FiShoppingCart className='h-6 text-blue-400 w-6' />
        </div>
      </div>
      <p className='font-semibold text-4xl'>
        {leadsSaleTotal} kr
      </p>
      <p className='mt-4 text-gray-400 text-sm'>
        You have sold {soldThisMonth - soldLastMonth} lead{(soldThisMonth == 1 ? '' : 's')} this month compared to last month
      </p>
    </Widget>
  )
}

const MonthlyGrossProfitWidget = ({ data }) => {
  let revenueThisMonth = 0, revenueLastMonth = 0

  data.leads.map((lead) => {
    if(lead.status !== 'new' && lead.status !== 'quoted') {
      if(isThisMonth(lead.creation_date)) revenueThisMonth += lead.sale.service - ((lead.sale.service / 2) + lead.sale.extra)
      if(wasLastMonth(lead.creation_date)) revenueLastMonth += lead.sale.service - ((lead.sale.service / 2) + lead.sale.extra)
    }
  })

  return (
    <Widget title='Gross Profit This Month'>
      <div className='flex'>
        <div className='absolute bg-pink-100 inline-block ml-auto p-2 right-10 rounded top-10'>
          <FiBarChart className='h-6 text-pink-400 w-6' />
        </div>
      </div>
      <p className='font-semibold text-4xl'>
        {revenueThisMonth} kr
      </p>
      <p className='mt-4 text-gray-400 text-sm'>
        You made {revenueLastMonth} kr last month
      </p>
    </Widget>
  )
}

const NetProfitWidget = ({ data }) => {
  let january = 0, february = 0, march = 0, april = 0, may = 0, june = 0, july = 0, august = 0, september = 0, october = 0, november = 0, december = 0
  
  data.leads.map((lead) => {
    const date = new Date(lead.creation_date)

    if(lead.sale.service && lead.sale.extra) {
      if(date.getMonth() == 0) january += calculateNetProfit(lead)
      if(date.getMonth() == 1) february += calculateNetProfit(lead)
      if(date.getMonth() == 2) march += calculateNetProfit(lead)
      if(date.getMonth() == 3) april += calculateNetProfit(lead)
      if(date.getMonth() == 4) may += calculateNetProfit(lead)
      if(date.getMonth() == 5) june += calculateNetProfit(lead)
      if(date.getMonth() == 6) july += calculateNetProfit(lead)
      if(date.getMonth() == 7) august += calculateNetProfit(lead)
      if(date.getMonth() == 8) september += calculateNetProfit(lead)
      if(date.getMonth() == 9) october += calculateNetProfit(lead)
      if(date.getMonth() == 10) november += calculateNetProfit(lead)
      if(date.getMonth() == 11) december += calculateNetProfit(lead)
    }
  })
  
  const state = {
    labels: [
      'January', 
      'February', 
      'March',
      'April', 
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Net Profit',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 2,
        data: [
          january,
          february,
          march,
          april,
          may,
          june,
          july,
          august,
          september,
          october,
          november,
          december
        ]
      },
    ]
  }

  return (
    <Widget title='Net Profit'>
      <div className='flex'>
        <div className='absolute bg-purple-100 inline-block ml-auto p-2 right-10 rounded top-10'>
          <FiCornerRightDown className='h-6 text-purple-400 w-6' />
        </div>
      </div>
      <Bar 
        data={state}
        options={{
          title: {
            display: true,
            text: 'Net Profit',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </Widget>
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
      data: json,
    }
  }
}

export default Page