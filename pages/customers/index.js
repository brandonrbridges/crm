import DashboardLayout from '@/layouts/dashboard'

import Customers from '@/components/customers'

const Page = ({ data }) => {
  return (
    <DashboardLayout>
      <div className='flex items-center mb-4'>
        <h2 className='font-bold text-gray-400'>Customers <span className='font-normal'>({data.customers.length})</span></h2>
      </div>
      <Customers data={data} />
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
      data: json
    }
  }
}


export default Page