const isThisMonth = (d) => {
  const today = new Date()
  d = new Date(d)

  return d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()
}

export default isThisMonth