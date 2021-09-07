import { getSession } from 'next-auth/client'

import dbConnect from '@/helpers/dbConnect'

import Customer from '@/models/Customer'

const api = async (req, res) => {
  const { _id } = req.query
  
  const user = await getSession({ req })
  
  await dbConnect()
  
  if(req.method === 'GET') {
    let customer = await Customer.find({ _id }).lean()
  
    if(customer) {
      return res.status(200).json({ customer })
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }
  
  res.end()
}

export default api