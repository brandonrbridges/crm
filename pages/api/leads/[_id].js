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
      if(req.body.quote) {
        await Lead.findOneAndUpdate(
          { 
            _id 
          },
          {
            $set: {
              'quote.service': req.body.quote.service,
              'quote.extra': req.body.quote.extra,
              'sale.service': null,
              'sale.extra': null,
              status: 'quoted'

            }
          },
          { 
            new: true 
          }
        )
      }

      if(req.body.sale) {
        await Lead.findOneAndUpdate(
          { 
            _id 
          },
          {
            $set: {
              'sale.service': req.body.sale.service,
              'sale.extra': req.body.sale.extra,
              status: 'accepted'
            }
          },
          { 
            new: true 
          }
        )
      }

      if(req.body.status) {
        await Lead.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              status: req.body.status
            }
          },
          {
            new: true
          }
        )
      }
    } else {
      return res.status(200).json({ error: 'no record found' })
    }
  }

  res.end()
}