import DashboardLayout from '@/layouts/dashboard'

import AddLead from '@/components/addLead'
import Leads from '@/components/leads'

const Page = ({ data }) => {
  return (
    <DashboardLayout>
      <div className='flex items-center mb-4'>
        <h2 className='font-bold text-gray-400'>Leads <span className='font-normal'>({data.leads.length})</span></h2>
        <AddLead />
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