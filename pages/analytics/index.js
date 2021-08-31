// Layout
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Widget from '@/components/Widget'

// Modules
import { Doughnut, Pie } from 'react-chartjs-2'

const Page = ({ data }) => {
  return (
    <DashboardLayout title='Analytics'>
      <div className='gap-4 grid grid-cols-4'>
        <SourceWidget data={data} />
      </div>
    </DashboardLayout>
  )
}

const SourceWidget = ({ data }) => {
  let norrstad = 0, vaststad = 0, sveastad = 0 

  data.leads.map(lead => {
    if(lead.source == 'norrstäd.nu') {
      norrstad++
    } else if(lead.source == 'väststäd.se') {
      vaststad++
    } else if(lead.source == 'sveastäd.nu') {
      sveastad++
    } else {
      // do nothing
    }
  })

  const state = {
    labels: [
      'norrstäd.nu',
      'väststäd.se',
      'sveastäd.nu'
    ],
    datasets: [
      {
        label: 'Source',
        backgroundColor: [
          '#24A1E7',
          '#3AC775',
          '#3460B4'
        ],
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 4,
        data: [
          norrstad,
          vaststad,
          sveastad
        ]
      },
      
    ]
  }
  
  return (
    <Widget title='Source'>
      <Doughnut 
        data={state}
        options={{
          title: {
            display: true,
            text: 'Source',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'end'
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