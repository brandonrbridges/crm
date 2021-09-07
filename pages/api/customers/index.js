import { getSession } from 'next-auth/client'
import Customer from '@/models/Customer'
import dbConnect from '@/helpers/dbConnect'
import Lead from '@/models/Lead'

const api = async (req, res) => {

  const user = await getSession({ req })
  
  await dbConnect()
  
  if(req.method === 'GET') {
    let customers = await Customer.find().sort({ name: 1 }).lean()
  
    if(customers) {
      return res.status(200).json({ customers })
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }
  
  if(req.method === 'POST') {
       
  }
  
  if(req.method == 'DELETE') {
    const _id = req.query._id
  
    let customer = await Customer.findOne({ _id }).lean()
  
    if(customer) {
      // customer.lead_ids.map(_id => {
      //   await Lead.findOneAndUpdate({ _id }, { 'customer.name': 'Deleted', 'customer._id': '' }, { new: true })
      // })
      
      customer.lead_ids.forEach(async _id => {
        await Lead.findOneAndUpdate({ _id }, { customer: { name: 'Deleted', _id: null } }, { new: true })
      })
  
      await Customer.findOneAndDelete({ _id })
  
      return res.status(200).json({ success: 'record deleted' })
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }
}

export default api