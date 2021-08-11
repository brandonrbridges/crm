// Next
import Image from 'next/image'
import Link from 'next/link'

// Next Auth
import { signIn, signOut, useSession } from 'next-auth/client'

// Components
import DarkModeToggle from '@/components/DarkModeToggle'
import NavItem from '@/components/NavigationItem'

// Modules
import { FiBell, FiLogIn, FiLogOut } from 'react-icons/fi'
import { Toaster } from 'react-hot-toast'
import GoBack from '@/components/GoBack'

const Dashboard = ({ children, title }) => {
  const [session, loading] = useSession()
  
  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 5000 }} />
      <div className='flex h-screen w-full'>
        <div className='bg-white dark:bg-gray-900 border-r border-gray-200 h-screen fixed flex flex-col p-4 top-0 w-20'>
          <div className='gap-y-4 grid grid-cols-1'>
            <NavItem icon='FiSpeaker' path='/' />
            <NavItem icon='FiFolder' path='/leads' />
            <NavItem icon='FiUsers' path='/customers' />
            <NavItem icon='FiCalendar' path='/calendar' />
            <NavItem icon='FiPieChart' path='/analytics' />
          </div>

          <div className='gap-y-4 border-t dark:border-gray-700 grid grid-cols-1 mt-auto mt-4 pt-4'>
            <NavItem icon='FiSettings' path='/' />

            <DarkModeToggle />

            {session && (
              <>
                <Link href='/'>
                  <a className='hover:bg-gray-100 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-black w-full'>
                    {session && (
                      <Image 
                        src={session.user.image} 
                        alt={session.user.name + ' Profile Picture'} 
                        className='rounded-full' 
                        height={30} 
                        width={30} 
                      />
                    )}
                  </a>
                </Link>

                <button className='hover:bg-gray-100 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-black w-full' onClick={() => signOut()}>
                  <FiLogOut className='h-5 mx-auto w-5' />
                </button>
              </>
            )}

            {!session && (
              <>
                <button className='hover:bg-gray-100 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-black w-full' onClick={() => signIn()}>
                  <FiLogIn className='h-5 mx-auto w-5' />
                </button>
              </>
            )}
          </div>
        </div>
        <div className='bg-gray-50 dark:bg-gray-800 pl-24 w-full'>
          <div className='flex items-center px-4 py-2 w-full'>
            <div className='flex items-center w-1/5'>
              <GoBack />
              <p className='font-bold'>Madison Avenue CRM</p>
            </div>

            {session && (
              <div className='block flex items-center ml-auto'>
                <Link href='/profile/notifications'>
                  <a className='mx-4'>
                    <FiBell className='h-5 w-5 text-gray-800 hover:text-purple-400' />
                  </a>
                </Link>

                <Link href='/profile'>
                  <a className='flex items-center ml-4'>
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name + ' Profile Picture'} 
                      className='rounded-full' 
                      height={40} 
                      width={40} 
                    />

                    <div className='ml-3'>
                      <p className='font-bold dark:text-white'>
                        {session.user.name}
                      </p>
                      {session.user.email == 'brandon@visually.digital' ? <p className='text-gray-400 text-xs'>Administrator</p> : ''}
                    </div>
                  </a>
                </Link>
              </div>
            )}
          </div>

          <div className='p-4'>
            {title && (
              <div className='flex items-center mb-4'>
                <h2 className='font-bold text-gray-400'>{title}</h2>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard