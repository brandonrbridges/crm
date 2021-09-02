// Layouts
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Leads from '@/components/LeadsTable'
import Search from '@/components/Search'

const Page = ({ leads }) => {
  return (
    <DashboardLayout title={`Leads (${leads.length})`}>
      <Search items={leads} />
      <Leads leads={leads} />
    </DashboardLayout>
  )
}

export async function getServerSideProps(context) {
  const options = { headers: { cookie: context.req.headers.cookie } }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/leads`, options)
  const json = await res.json()

  const leads = []

  json.leads.map(lead => {
    if(lead.status !== 'accepted' && lead.status !== 'booked' && lead.status !== 'rejected' && lead.archived === false) {
      leads.push(lead)
    }
  })

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
      leads
    }
  }
}

export default Page