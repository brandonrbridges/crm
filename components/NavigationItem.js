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

const NavItem = ({ icon, name, path }) => {
  // Get Icon
  const SelectedIcon = icons[icon]
  
  return (
    <Link href={path}>
      <a className='hover:bg-gray-700 flex items-center justify-start mt-auto px-2 py-2 rounded text-gray-400 hover:text-white transition-all w-full'>
        <SelectedIcon className='h-5 mr-3 w-5' />
        {name}
      </a>
    </Link>
  )
}

export default NavItem