import { getSession } from 'next-auth/client'

import dbConnect from '@/helpers/dbConnect'

import Lead from '@/models/Lead'

export default async (req, res) => {
  const { _id } = req.query
  const user = await getSession({ req })

  await dbConnect()

  if(req.method === 'GET') {
    let lead = await Lead.find({ _id }).lean()

    if(lead) {
      return res.status(200).json({ lead })
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }

  if(req.method === 'PUT') {
    const _id = req.query._id

    let lead = await Lead.find({ _id }).lean()

    if(lead) {
      let update = {}

      if(req.body.quote_value) {
        update.quote_value = req.body.quote_value
        update.status = 'quoted'
        update.sale_value = null
      }

      if(req.body.sale_value) {
        update.sale_value = req.body.sale_value
        update.status = 'sold'
      }

      await Lead.findOneAndUpdate(
        { _id }, 
        update, 
        { new: true }
      )
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }

  res.end()
}