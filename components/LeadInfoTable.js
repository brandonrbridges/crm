const LeadInfoTable = ({ lead }) => {
  return (
    <table className='w-full'>
      <tbody>
        <tr>
          <td className='text-gray-500'>Via</td>
          <td>{lead.source}</td>
        </tr>
        <tr>
          <td className='py-2'>
            <hr className='border-gray-200 w-full' />
          </td>
          <td>
            <hr className='border-gray-200 w-full' />
          </td>
        </tr>
        <tr>
          <td className='text-gray-500'>Type</td>
          <td className='capitalize'>{lead.type}</td>
        </tr>
        <tr>
          <td className='text-gray-500'>City</td>
          <td className='capitalize'>{lead.city}</td>
        </tr>
        <tr>
          <td className='text-gray-500'>KVM</td>
          <td>{lead.kvm} kvm</td>
        </tr>
      </tbody>
    </table>
  )
}

export default LeadInfoTable