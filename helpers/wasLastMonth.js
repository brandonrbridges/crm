const wasLastMonth = (d) => {
  const today = new Date()

  let lastMonth = new Date()
  lastMonth.setMonth(today.getMonth() - 1)

  d = new Date(d)

  return d.getMonth() == lastMonth.getMonth() && d.getFullYear() == lastMonth.getFullYear()
}

export default wasLastMonth