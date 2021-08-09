import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  activity_log: {
    default: [{ date: Date.now, message: 'Created' }],
    type: Array
  },
  company: String,
  creation_date: {
    default: Date.now,
    type: Date
  },
  email: String,
  lead_ids: Array,
  name: String,
  phone: String,
  rating: String,
  source: String,
  status: String,
  tags: Array,
})

mongoose.models = {}

export default mongoose.models.Customer || mongoose.model('Customer', schema)