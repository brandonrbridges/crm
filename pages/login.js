// Next
import { useRouter } from 'next/router'

// Next Auth
import { getProviders, getSession, signIn, signOut, useSession } from 'next-auth/client'

// Components
import Grid from '@/components/Grid'

const Login = ({ providers }) => {
  const router = useRouter()
  
  const [session, loading] = useSession()
  
  return (
    <div className='bg-gray-800 flex flex-col h-screen items-center justify-center w-full'>
      <p className='font-bold text-2xl text-white'>Welcome to the Madison Avenue CRM</p>
      <p className='mb-8 text-gray-400'>Please login</p>
      
      <Grid>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)} className='hover:bg-white border px-40 py-2 rounded text-white'>
              Log in with {provider.name}
            </button>
          </div>
        ))}
      </Grid>
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const session = await getSession(context)

  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  console.log(providers)

  return {
    props: {
      providers
    }
  }
}

export default Login