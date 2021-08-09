const Widget = ({ children, margin }) => {
  return (
    <div className={`bg-white ${margin} p-12 rounded widget`}>
      {children}
    </div>
  )
}

export default Widget