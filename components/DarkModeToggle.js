// Helpers
import useDarkMode from '@/helpers/darkMode'

// Modules
import { FiMoon, FiSun } from 'react-icons/fi'

const DarkModeToggle = () => {
  const [colorTheme, setTheme] = useDarkMode()

  return (
    <>
      {colorTheme === 'light' ? (
        <button className='hover:bg-gray-100 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-black w-full' onClick={() => setTheme('light')}>
          <FiSun className='h-5 mx-auto w-5' />
        </button>
      ) : (
        <button className='hover:bg-gray-100 flex items-center mt-auto px-2 py-2 rounded text-gray-400 hover:text-black w-full' onClick={() => setTheme('dark')}>
          <FiMoon className='h-5 mx-auto w-5' />
        </button>
      )}
    </>
  )
}

export default DarkModeToggle