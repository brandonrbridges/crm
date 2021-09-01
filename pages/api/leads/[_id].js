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

    console.log(req.body)

    if(lead) {
      if(req.body.archived) {
        await Lead.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              archived: true,
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: 'Lead archived'
              }
            }
          },
          {
            new: true
          }
        )
      }

      if(req.body.quote) {
        await Lead.findOneAndUpdate(
          { 
            _id 
          },
          {
            $set: {
              'quote.service': req.body.quote.service,
              'quote.extra': req.body.quote.extra,
              status: 'quoted'
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: `Quote figures updated`
              }
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
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: `Sale figures updated`
              }
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
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: `Status changed to ${req.body.status}`
              }
            }
          },
          {
            new: true
          }
        )
      }

      if(req.body.date_booked) {
        await Lead.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              date_booked: req.body.date_booked,
              status: 'booked'
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: `Booking date updated`
              }
            }
          },
          {
            new: true
          }
        )
      }

      if(req.body.notes) {
        await Lead.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              notes: req.body.notes,
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