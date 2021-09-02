// Layouts
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Leads from '@/components/LeadsTable'

const Page = ({ leads }) => {
  return (
    <DashboardLayout title={`Accepted Leads (${leads.length})`}>
      <Leads leads={leads} hideFilters />
    </DashboardLayout>
  )
}

export async function getServerSideProps(context) {
  const options = { headers: { cookie: context.req.headers.cookie } }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/leads`, options)
  const json = await res.json()

  const leads = []

  if(json.error) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  json.leads.map(lead => {
    if(lead.status === 'accepted' || lead.status === 'booked') {
      leads.push(lead)
    }
  })

  return {
    props: {
      leads
    }
  }
}

export default Page