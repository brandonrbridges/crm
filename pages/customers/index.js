// Layout
import DashboardLayout from '@/layouts/Dashboard'

// Components
import CustomersTable from '@/components/CustomersTable'

const Page = ({ customers }) => {
  return (
    <DashboardLayout title={`Customers (${customers.length})`}>
      <CustomersTable customers={customers} />
    </DashboardLayout>
  )
}

export async function getServerSideProps(context) {
  const options = { headers: { cookie: context.req.headers.cookie } }
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customers`, options)
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
      customers: json.customers
    }
  }
}

export default Page