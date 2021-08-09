import Link from 'next/link'

import { 
  FiBell, 
  FiCalendar, 
  FiFolder, 
  FiLogOut, 
  FiMoon, 
  FiPieChart, 
  FiSearch, 
  FiSettings, 
  FiSpeaker, 
  FiSun, 
  FiUsers 
} from 'react-icons/fi'


const icons = {
  FiBell,
  FiCalendar,
  FiFolder,
  FiLogOut,
  FiMoon,
  FiPieChart,
  FiSearch,
  FiSettings,
  FiSpeaker,
  FiSun,
  FiUsers
}

const NavItem = ({ icon, path }) => {
  const SelectedIcon = icons[icon]
  return (
    <Link href={path}>
      <a className='hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center mt-auto px-2 py-2 rounded text-gray-800 dark:text-gray-400 dark:hover:text-white w-full'>
        <SelectedIcon className='h-5 mx-auto w-5' />
      </a>
    </Link>
  )
}

export default NavItem