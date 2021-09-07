// React
import { useEffect, useState } from 'react'

// Components
import SearchResult from '@/components/SearchResult'

// Modules
import Fuse from 'fuse.js'
import { FiSearch } from 'react-icons/fi'

const Search = ({ items }) => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])

  const options = {
    includeScore: true,
    keys: ['customer.name', 'customer.email', 'city', 'type', 'source'],
    threshold: 0.2
  }

  
  useEffect(() => {
    const fuse = new Fuse(items, options)
    const r = fuse.search(term)
    setResults(r)
  }, [term])

  return (
    <div className='mb-4 relative z-10'>
      <div className='relative'>
        <input 
          autoComplete='off'
          className={`bg-white border p-2 pl-8 rounded ${results.length > 0 ? 'rounded-b-none' : ''} w-full`}  
          name='crm_search'
          onChange={e => setTerm(e.target.value)} 
          placeholder='Search Leads [name, email, source, type, city]' 
          type='text' 
          value={term} 
        />
        <FiSearch className='absolute left-2 transform -translate-y-1/2 top-1/2 text-gray-400 z-10' />
      </div>
      {results.length > 0 && (
        <div className='absolute bg-white border border-t-0 p-2 rounded-b w-full'>
          <p className='mb-2 text-gray-400 text-sm'>Leads</p>
          <div className=''>
            {results.map((result, i) => <SearchResult key={i} item={result.item} className='bg-blue-50' />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search