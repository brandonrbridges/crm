// Next
import Image from 'next/image'
import Link from 'next/link'

// Next Auth
import { getSession, signIn, signOut, useSession } from 'next-auth/client'

// Components
import NavItem from '@/components/NavigationItem'

// Modules
import { initNotifications } from 'browser-notification'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { Toaster } from 'react-hot-toast'
import GoBack from '@/components/GoBack'

const Dashboard = ({ children, title }) => {
  const [session] = useSession()

  if(typeof window !== 'undefined') {
    initNotifications()
  }

  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 5000 }} />
      <div className='flex h-screen w-full'>
        <div className='bg-gray-900 border-r border-gray-200 fixed flex flex-col h-screen p-4 top-0 transition-all z-20'>
          <div className='gap-y-4 grid grid-cols-1'>
            <NavItem icon='FiSpeaker' name='Dashboard' path='/' />
            <NavItem icon='FiFolder' name='Leads' path='/leads' />
            <NavItem icon='FiCheckCircle' name='Accepted' path='/leads/accepted' />
            <NavItem icon='FiXCircle' name='Rejected' path='/leads/rejected' />
            <NavItem icon='FiArchive' name='Archive' path='/leads/archive' />
            <NavItem icon='FiUsers' name='Customers' path='/customers' />
            <NavItem icon='FiCalendar' name='Calendar' path='/calendar' />
            <NavItem icon='FiPieChart' name='Analytics' path='/analytics' />
          </div>

          <div className='gap-y-4 border-t border-gray-700 grid grid-cols-1 mt-auto pt-4'>
            {session && (
              <>
                <button className='hover:bg-red-400 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-white transition-all w-full' onClick={() => signOut()}>
                  <FiLogOut className='h-5 mr-3 w-5' /> Log Out
                </button>
              </>
            )}

            {!session && (
              <>
                <button className='hover:bg-gray-100 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-black w-full' onClick={() => signIn()}>
                  <FiLogIn className='h-5 mr-3 w-5' /> Log In
                </button>
              </>
            )}
          </div>
        </div>
        <div className='bg-gray-100 pl-40 w-full'>
          <div className='border-b flex items-center px-4 py-3 w-full'>
            <div className='flex items-center'>
              <GoBack />
              <p className='font-bold text-xl'>Madison Avenue CRM <span className='ml-2 font-normal text-gray-600 text-xs'>Developed by Visually Digital</span></p>
            </div>

            {session && (
              <div className='flex items-center ml-auto'>
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
                      <p className='font-bold'>
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