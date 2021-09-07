// Next Auth
import { getSession } from 'next-auth/client'

// Helpers
import dbConnect from '@/helpers/dbConnect'

// Models
import Lead from '@/models/Lead'

// Modules
import Geocode from 'react-geocode'

Geocode.setApiKey('AIzaSyAWPe6OTNnlXKOtWU65YtdKUkLAEEt0VnQ')

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

    const lead = await Lead.findOne({ _id }).lean()

    if(lead) {
      if(req.body.address && req.body.postcode) {

        console.log(`${req.body.address}, ${req.body.postcode} ${lead.city}, Sweden`)
        const geo = await Geocode.fromAddress(`${lead.address}, ${lead.postcode} ${lead.city}, Sweden`)
        const { lat, lng } = geo.results[0].geometry.location

        console.log(lat, lng)

        await Lead.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              address: req.body.address,
              latitude: lat,
              longitude: lng,
              postcode: req.body.postcode,
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: 'Address updated'
              }
            }
          },
          {
            new: true
          }
        )
      } 

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

      if(req.body.date_booked_end) {
        await Lead.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              date_booked_end: req.body.date_booked_end,
              status: 'booked'
            },
            $push: {
              activity_log: {
                date: Date.now(),
                update: `End Booking date updated`
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