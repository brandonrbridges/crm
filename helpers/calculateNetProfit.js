const calculateNetProfit = (lead) => {
  return (lead.sale.service - ((lead.sale.service / 2) + lead.sale.extra)) * 0.8
}

export default calculateNetProfit