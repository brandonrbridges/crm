// Next
import Link from 'next/link'

// Modules
import { 
  FiArchive,
  FiBell, 
  FiCalendar, 
  FiCheckCircle,
  FiFolder, 
  FiLogOut, 
  FiMoon, 
  FiPieChart, 
  FiSearch, 
  FiSettings, 
  FiSpeaker, 
  FiSun, 
  FiUsers,
  FiXCircle 
} from 'react-icons/fi'

// Variables
const icons = {
  FiArchive,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiFolder,
  FiLogOut,
  FiMoon,
  FiPieChart,
  FiSearch,
  FiSettings,
  FiSpeaker,
  FiSun,
  FiUsers,
  FiXCircle
}

const NavItem = ({ icon, path }) => {
  // Get Icon
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