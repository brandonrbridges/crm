const Grid = ({ children, columns }) => {
  return (
    <div className={`gap-4 grid grid-cols-${columns ? columns : '1'}`}>
      {children}
    </div>
  )
}

export default Grid