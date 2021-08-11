import { getSession } from 'next-auth/client'

import dbConnect from '@/helpers/dbConnect'

import Lead from '@/models/Lead'
import Customer from '@/models/Customer'

export default async (req, res) => {
  const user = await getSession({ req })

  await dbConnect()

  if(req.method == 'GET') {
    let leads = await Lead.find({}).sort({ creation_date: -1 }).lean()

    if(req.query) {
      if(req.query.customer_id) {
        leads = await Lead.find({ 'customer._id': req.query.customer_id }).sort({ creation_date: -1 }).lean()
      }
    }

    if(leads) {
      return res.status(200).json({ leads })
    } else {
      return res.status(200).json({ error: 'no records found' })
    }
  }

  if(req.method == 'POST') {
    // Prepare variables
    let name, email, phone, company, type, city, kvm, message, source

    if(req.query) {
      if(req.query.name) 
        name = req.query.name
      if(req.query.email) 
        email = req.query.email
      if(req.query.phone) 
        phone = req.query.phone
      if(req.query.company) 
        company = req.query.company
      if(req.query.type) 
        type = req.query.type
      if(req.query.city) 
        city = req.query.city
      if(req.query.kvm) 
        kvm = req.query.kvm
      if(req.query.message) 
        message = req.query.message
      if(req.query.source)
        source = req.query.source
    }

    if(req.body) {
      if(req.body.name) 
        name = req.body.name
      if(req.body.email) 
        email = req.body.email
      if(req.body.phone) 
        phone = req.body.phone
      if(req.body.company) 
        company = req.body.company
      if(req.body.type) 
        type = req.body.type
      if(req.body.city) 
        city = req.body.city
      if(req.body.kvm) 
        kvm = req.body.kvm
      if(req.body.message) 
        message = req.body.message
      if(req.body.source)
        source = req.body.source
    }

    // Find Customer
    let customer = await Customer.findOne({ email })

    // If no Customer, create one
    if(!customer)
      customer = await new Customer({ name, email, phone }).save()

    // Add Lead to Database
    const lead = await new Lead({ 'customer._id': customer._id, 'customer.name': customer.name, 'customer.phone': customer.phone, 'customer.email': customer.email, type, city, kvm, message, source }).save()

    // Push Lead ID to Customer's Records
    await Customer.findOneAndUpdate({ _id: customer._id }, { $push: { lead_ids: lead._id } }, { new: true })
  }

  if(req.method == 'DELETE') {
    const _id = req.query._id

    let lead = await Lead.findOne({ _id }).lean()

    if(lead) {
      await Customer.findOneAndUpdate({ _id: lead.customer._id }, { $pull: { lead_ids: lead._id } }, { new: true })

      await Lead.findOneAndDelete({ _id })

      return res.status(200).json({ success: 'record deleted' })
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }

  res.end()
}