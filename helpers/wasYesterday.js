const wasYesterday = (d) => {
  const today = new Date()

  let yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  d = new Date(d)

  return d.getDate() == yesterday.getDate() && d.getMonth() == yesterday.getMonth() && d.getFullYear() == yesterday.getFullYear()
}

export default wasYesterday