// Layouts
import DashboardLayout from '@/layouts/Dashboard'

// Components
import Leads from '@/components/LeadsTable'

const Page = ({ leads }) => {
  return (
    <DashboardLayout title={`Leads (${leads.length})`}>
      <Leads leads={leads} />
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
      leads: json.leads
    }
  }
}

export default Page