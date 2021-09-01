// Next
import Link from 'next/link'

// Components
import Badge from '@/components/Badge'

const SearchResult = ({ item }) => {
  return (
    <Link href={`/leads/${item._id}`}>
      <a className='hover:bg-gray-100 block flex items-center rounded p-1'>
        {item.customer.name}
      </a>
    </Link>
  )
}

export default SearchResult