const Widget = ({ children, margin, title, tip }) => {
  return (
    <div className={`bg-white ${margin} p-12 relative rounded widget`}>
      {title && <p className='meta-title mb-4'>{title}</p>}
      {children}
      {tip && <p className='mt-4 text-gray-400 text-xs'><b>Tip:</b> {tip}</p>}
    </div>
  )
}

export default Widget