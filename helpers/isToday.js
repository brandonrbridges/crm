const isToday = (d) => {
  const today = new Date()
  d = new Date(d)

  return d.getDate() == today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()
}

export default isToday